import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
  } from 'react-native';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import moment from 'moment';
import { Modal, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Swipeout from 'react-native-swipeout';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { width } = Dimensions.get('window');
const { alert } = Modal;
const Piece = ({ speechTitle, userName, plazaName, speechId, imageSource, content, light, fontSize, share, collect, deleteContent, onPress }) => {
    const swipeBtns = [
        {
            text: '转发',
            backgroundColor: '#aaa',
            color: '#6a6a6a',
            onPress: share({
                sourceDetail: Map({
                    text: '',
                    time: moment().format('YYYY-MM-DD hh:mm'),
                    location: Map({
                        plazaName,
                        speechId,
                    }),
                }),
            }),
        },
        {
            text: '收藏',
            backgroundColor: '#aaa',
            color: '#6a6a6a',
            onPress: collect({
                sourceDetail: Map({
                    userName,
                    speechTitle,
                    time: moment().format('YYYY-MM-DD'),
                    location: Map({
                        plazaName,
                        speechId,
                    }),
                }),
            }),
        },
        {
            text: '删除',
            backgroundColor: '#aaa',
            color: '#6a6a6a',
            onPress: deleteContent,
        },
    ];
    return (
        <Swipeout right={swipeBtns} backgroundColor="transparent" style={{ marginTop: 20 }} autoClose>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.main}>
                    <View style={[styles.img, { backgroundColor: `#${generateColor(120, 170, light)}` }]}>
                        <Image style={{ width: 30, height: 40 }} source={imageSource} />
                    </View>
                    <View style={[styles.content, { backgroundColor: `#${generateColor(166, 216, light)}` }]}>
                        <View style={styles.textTop}>
                            <Text style={{ fontSize: 12, color: '#6a6a6a' }}>{ content.get('userName') }</Text>
                        </View>
                        <View style={styles.contentName}>
                            <Text style={{ fontWeight: 'bold', color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 16) }}>
                                { content.get('title') }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Swipeout>
    );
};

Piece.propTypes = {
    speechTitle: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    plazaName: PropTypes.string.isRequired,
    speechId: PropTypes.string.isRequired,
    imageSource: PropTypes.number.isRequired,
    content: ImmutablePropTypes.map.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    share: PropTypes.func.isRequired,
    collect: PropTypes.func.isRequired,
    deleteContent: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width: width * 0.9,
        height: 70,
        flexDirection: 'row',
    },
    img: {
        width: 90,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: (width * 0.9) - 90,
        height: 70,
    },
    contentName: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTop: {
        height: 15,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const mapStateToProps = (state, ownProps) => ({
    plazaName: state.getIn(['plaza', 'plazaName']),
    imageSource: ownProps.content.get('gender') === 'male' ? require('../../../Image/Menu/maleGrey.png') :
    require('../../../Image/Menu/femaleGrey.png'),
    userName: state.getIn(['plaza', state.getIn(['plaza', 'plazaName']), 'content', ownProps.speechId, 'userName']),
    speechTitle: state.getIn(['plaza', state.getIn(['plaza', 'plazaName']), 'content', ownProps.speechId, 'title']),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPress: () => {
        dispatch({
            type: 'SPEECH_DISCUSS',
            speechId: ownProps.speechId,
        });
    },
    deleteContent: () => {
        alert('删除这条消息', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                dispatch({
                    type: 'PLAZA_SPEECH_DELETE',
                    speechId: ownProps.speechId,
                });
            } },
        ]);
    },
    collect: ({ sourceDetail }) => () => {
        Toast.success('收藏成功!', 1);
        dispatch({
            type: 'ME_ADD',
            viewMode: '我的收藏',
            sourceDetail,
        });
    },
    share: ({ sourceDetail }) => () => {
        dispatch({
            type: 'OPERATION_2_SHARE',
            source: 'plaza',
            sourceDetail,
        });
        dispatch({
            type: 'PLAZA_SHARE_PRESS',
            viewMode: 'share',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
