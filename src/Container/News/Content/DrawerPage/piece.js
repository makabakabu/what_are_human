import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Swipeout from 'react-native-swipeout';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { width } = Dimensions.get('window');
const { alert } = Modal;
const Piece = ({ content, text, light, fontSize, deletePiece }) => (
    <Swipeout
      right={[{
        text: '删除',
        backgroundColor: '#aaa',
        color: '#6a6a6a',
        onPress: deletePiece,
        }]}
      backgroundColor="transparent"
      autoClose
    >
        <TouchableOpacity >
            <View style={styles.main}>
                <View style={styles.text}>
                    { !content.get('read') &&
                        <Text style={styles.kind}>未读</Text>
                    }
                    <Text style={[styles.title, { width: content.get('read') ? (width * 0.8) : (width * 0.7), color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ text }</Text>
                    <Text style={styles.order}>〉</Text>
                </View>
                <View style={styles.seperator} />
            </View>
        </TouchableOpacity>
    </Swipeout>
);

Piece.propTypes = {
    content: ImmutablePropTypes.map.isRequired,
    text: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    deletePiece: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: 80,
        alignItems: 'center',
    },
    text: {
        height: 79,
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    kind: {
        fontSize: 14,
        color: '#aaa',
        width: width * 0.1,
        textAlign: 'left',
    },
    order: {
        fontSize: 25,
        color: '#ededed',
        width: width * 0.2,
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        color: '#ededed',
    },
    seperator: {
        opacity: 0.5,
        width: width * 0.9,
        height: 1,
        backgroundColor: '#aaa',
    },
});

const mapStateToProps = (state, ownProps) => {
    let text;
    switch (ownProps.viewMode) {
        case '收藏':
            text = `您的演讲被  ${ownProps.content.get('userName')}  收藏了`;
            break;

        case '评论':
            text = `${ownProps.content.get('userName')}  评论了您`;
            break;

        case '转发':
            text = `${ownProps.content.get('userName')}  转发了你的文章`;
            break;

        case '点赞':
            text = `${ownProps.content.get('userName')}  点赞了您的  ${ownProps.content.get('text')} 评论`;
            break;

        case '回复':
            text = `${ownProps.content.get('userName')}  给您回复了`;
            break;

        case '系统消息':
            text = ownProps.content.get('text');
            break;

        default:
            break;
    }
    return {
        text,
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    deletePiece: () => {
        alert('删除这条消息', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                dispatch({
                    type: 'NEWS_DELETE',
                    viewMode: ownProps.viewMode,
                    newsId: ownProps.newsId,
                });
            } },
        ]);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
