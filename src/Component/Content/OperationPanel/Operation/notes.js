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
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { width, height } = Dimensions.get('window');
const Notes = ({ light, fontSize, text, notes, changeText, changeTitle, comfirm, share }) => (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -500} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
                    <Text style={[styles.content, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}> {text} </Text>
                    <TextInput value={notes.get('title')} onChangeText={value => changeTitle({ value })} placeholder="标题" style={[styles.title, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} />
                    <TextInput value={notes.get('text')} onChangeText={value => changeText({ value })} placeholder="内容" multiline style={[styles.text, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} />
                    <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity onPress={comfirm}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    完成
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={share}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    转发
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
    share: PropTypes.func.isRequired,
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
    share: () =>
        dispatch({
            type: 'ACADEMY_OPERATION_HANDLER',
            viewMode: 'share',
        }),
    comfirm: () => {
        dispatch({
            type: 'ACADEMY_NOTES_COMFIRM',
        });
        dispatch({
            type: 'NOTES_CREATE_ACADEMYNOTES',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
