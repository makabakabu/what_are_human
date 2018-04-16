import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
  } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const academyNotes = gql`
    mutation academyNotes ($token: String!, $order: Int!, $text: String!, $title: String!) {
        academyNotes (token: $token, order: $order, text: $text, title: $title) {
            finish
        }
    }
`;
const { width, height } = Dimensions.get('window');
const Notes = ({ order, token, light, fontSize, text, notes, changeText, changeTitle, comfirm, academyNotes }) => (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -500} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
                    <Text style={[styles.content, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}> {text} </Text>
                    <TextInput value={notes.get('title')} onChangeText={value => changeTitle({ value })} placeholder="标题" style={[styles.title, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} />
                    <TextInput value={notes.get('text')} onChangeText={value => changeText({ value })} placeholder="内容" multiline style={[styles.text, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} />
                    <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity onPress={comfirm({ kind: 'cancel' })}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    取消
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={comfirm({ kind: 'complete', order, token, title: notes.get('title'), text: notes.get('text'), academyNotes })}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    完成
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 30 }} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

Notes.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    notes: ImmutablePropTypes.map.isRequired,
    changeText: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
    comfirm: PropTypes.func.isRequired,
    order: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    title: {
        width: width * 0.9,
        height: 50,
        backgroundColor: '#ededed',
        borderRadius: 3,
        color: '#707070',
        marginTop: 10,
        paddingLeft: 10,
    },
    text: {
        width: width * 0.9,
        height: 250,
        backgroundColor: '#ededed',
        borderRadius: 3,
        color: '#707070',
        paddingLeft: 10,
        marginTop: 10,
        lineHeight: 30,
    },
    content: {
        width: width * 0.9,
        borderRadius: 10,
        fontSize: 20,
        color: '#ededed',
        paddingLeft: 10,
        marginTop: 30,
        lineHeight: 30,
    },
});

const mapStateToProps = state => ({
    order: Number.parseInt(state.getIn(['academy', 'order']), 10),
    token: state.getIn(['me', '我的信息', 'token']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
    light: state.getIn(['pageSet', 'light']),
    text: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'text']),
    notes: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'operation', 'notes']),
});

const mapDispatchToProps = dispatch => ({
    changeText: ({ value }) =>
        dispatch({
            type: 'ACADEMY_NOTES_CHANGE_TEXT',
            notes: value,
        }),
    changeTitle: ({ value }) =>
        dispatch({
            type: 'ACADEMY_NOTES_CHANGE_TITLE',
            title: value,
        }),
    comfirm: ({ kind, order, title, text, token, academyNotes }) => async () => {
        if (kind === 'complete') {
            console.log(kind, order, title, text, token);
            const response = await academyNotes({ variables: { token, order, title, text } });
            if (response.data.academyNotes.finish) {
                Toast.success('添加笔记成功！');
            } else {
                Toast.fail('添加笔记失败！');
            }
        }
        dispatch({
            type: 'BACK',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(graphql(academyNotes, { name: 'academyNotes' })(Notes));
