import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import OperationTrigger from '../../../Component/Content/OperationPanel/operationTrigger';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const Section = ({ viewMode, notesId, content, light, fontSize, backToCheck, edit, sharePress }) => (
    <View style={{ backgroundColor: `#${generateColor(50, 109, light)}`, width, height: height * 0.835, alignItems: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]} >
                { content.get('text') }
            </Text>
            {(viewMode === 'academyNotes') &&
                (<TouchableOpacity onPress={backToCheck({ order: content.get('order') })}>
                    <Text style={{ color: '#ededed', marginTop: 5 }}>{ `➟ 微斯人1.0版第${content.get('order')}条` } </Text>
                 </TouchableOpacity>)
            }
            <View style={styles.operation}>
                <Text style={{ color: '#ededed' }}>{ content.get('time') } </Text>
                <TouchableOpacity onPress={edit({ viewMode, order: content.get('order'), notesId, title: content.get('title'), text: content.get('text') })}>
                    <View style={styles.img}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../../Image/notes/edit.png')} />
                        <Text style={{ color: '#ededed', fontSize: 12 }}> 编辑 </Text>
                    </View>
                </TouchableOpacity>
                <OperationTrigger
                  imageSource={require('../../../Image/Operation/share.png')}
                  number="转发"
                  press={sharePress({
                        sourceDetail: Map({
                            text: '',
                            time: moment().format('YYYY-MM-DD hh:mm'),
                            location: Map({
                                viewMode,
                                notesId,
                            }),
                        }),
                    })}
                />
            </View>
        </ScrollView>
    </View>
);

Section.propTypes = {
    viewMode: PropTypes.string.isRequired,
    notesId: PropTypes.string.isRequired,
    content: ImmutablePropTypes.map.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    backToCheck: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    sharePress: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    text: {
        width: Dimensions.get('window').width * 0.9,
        fontSize: 20,
        color: 'white',
        marginTop: 5,
        lineHeight: 30,
    },
    img: {
        flexDirection: 'row',
        width: 50,
        height: 20,
        alignItems: 'center',
    },
    operation: {
        width: Dimensions.get('window').width * 0.9,
        height: 40,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    const viewMode = state.getIn(['notes', 'viewMode']);
    const notesId = state.getIn(['notes', viewMode, 'notesId']);
    return {
        viewMode,
        notesId,
        content: state.getIn(['notes', viewMode, 'notes', notesId]),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    edit: ({ viewMode, order, notesId, title, text }) => () => {
        if (viewMode === 'academyNotes') {
            dispatch({
                type: 'NOTES_ACADEMYNOTES_EDIT',
                order,
                title,
                text,
            }); // 如果是academic,则需要返回文章，设置为notes
        } else {
            dispatch({
                type: 'NOTES_WINKTHOUGHT_EDIT',
                title,
                text,
                notesId,
            }); // 如果是academic,则需要返回文章，设置为notes
        }
    },
    backToCheck: ({ order }) => () => {
        dispatch({
            type: 'CHANGE_VIEWMODE',
            viewMode: 'academy',
        });
        dispatch({
            type: 'ACADEMY_PIECE_2_SECTION',
            order,
        }); // 如果是academic，返回文章首页
    },
    sharePress: ({ sourceDetail }) => () => {
        dispatch({
            type: 'OPERATION_2_SHARE',
            source: 'notes',
            sourceDetail,
        });
        dispatch({
            type: 'NOTES_SHARE_PRESS',
            viewMode: 'share',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
