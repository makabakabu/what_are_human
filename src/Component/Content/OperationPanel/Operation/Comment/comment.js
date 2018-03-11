import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    TouchableHighlight,
    FlatList,
    Platform,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommentContainer from './commentContainer';
import generateSize from '../../../../../Action/generateSize';
import generateColor from '../../../../../Action/generateColor';
import OperationPanel from '../../operationPanel';

const { height, width } = Dimensions.get('window');
const Comment = ({ light, fontSize, text, commentText, order, reply, content, textChange, comfirm }) => (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -500}>
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.text, { fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }]}>
                    { text }
                </Text>
                <OperationPanel order={order} />
                <FlatList
                  data={content.map((value, key) => ({ key, value })).valueSeq().toArray()}
                  renderItem={({ item }) => <CommentContainer key={item.key} content={item.value} commentId={item.key} />}
                />
                <View style={{ height: 10 }} />
            </ScrollView>
        </View>
        <View style={styles.comment}>
            <TextInput style={styles.textInput} placeholder={reply} value={commentText} onChangeText={value => textChange({ value })} />
            <TouchableHighlight onPress={comfirm({ commentText })}>
                <View style={styles.comfirmContainer}>
                    <Text style={styles.comfirm} > 发送 </Text>
                </View>
            </TouchableHighlight>
        </View>
    </KeyboardAvoidingView>
);

Comment.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    commentText: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    content: ImmutablePropTypes.map.isRequired,
    reply: PropTypes.string.isRequired,
    textChange: PropTypes.func.isRequired,
    comfirm: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    text: {
        width: width * 0.9,
        fontSize: 20,
        color: 'white',
        marginTop: 30,
        lineHeight: 30,
    },
    comment: {
        width,
        height: height * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        backgroundColor: '#f9f9f9',
        shadowOffset: { width: 2,
                        height: -2 },
        shadowOpacity: 0.7,
    },
    textInput: {
        width: width * 0.8,
        height: height * 0.06,
        backgroundColor: '#ededed',
    },
    comfirmContainer: {
        width: width * 0.15,
        height: height * 0.06,
        backgroundColor: '#ededed',
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    comfirm: {
        fontSize: 15,
        color: '#6a6a6a',
    },
});
const mapStateToProps = (state) => {
    const comment = state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'operation', 'comment']);
    const location = comment.get('location');
    const order = state.getIn(['academy', 'order']);
    let reply = '';
    if (location.get('viewMode') === 'comment') {
        reply = `对${comment.getIn(['content', location.get('commentId'), 'userName'])}的评论`;
    } else if (comment.getIn(['location', 'viewMode']) === 'recomment' && comment.getIn(['content', location.get('commentId'), 'recomment', location.get('recommentId'), 'userName']) !== comment.getIn(['content', location.get('commentId'), 'userName'])) {
    reply = `对${comment.getIn(['content', location.get('commentId'), 'recomment', location.get('recommentId'), 'userName'])}的评论`;
    }
    return {
        content: comment.get('content'),
        order,
        text: state.getIn(['academy', 'content', order, 'text']),
        reply,
        commentText: location.get('text'),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    comfirm: ({ commentText }) => async () => {
        if (commentText.trim().length > 0) {
            await new Promise((resolve) => {
                dispatch({
                    type: 'ACADEMY_COMMENT_COMFIRM',
                });
                setTimeout(() => resolve(true), 1000);
            });
            dispatch({
                type: 'ME_ADD',
                viewMode: '我的评论',
            });
        }
    },
    textChange: ({ value }) =>
        dispatch({
            type: 'ACADEMY_COMMENT_TEXTCHANGE',
            value,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
