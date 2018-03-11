import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';
import CreateSpeechComfirmFooter from '../../Footer.js/createSpeechComfirmFooter';

const { height, width } = Dimensions.get('window');
const Main = ({ title, text, light, fontSize, changeText, changeTitle, protocol }) => (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput onChangeText={value => changeTitle({ value })} style={[styles.title, { color: `#${generateColor(50, 109, light)}`, backgroundColor: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]} value={title} placeholder="标题" />
                    <TextInput onChangeText={value => changeText({ value })} style={[styles.content, { color: `#${generateColor(50, 109, light)}`, backgroundColor: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]} value={text} placeholder="内容" multiline />
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#ccc' }}>演讲字数须在500以上，且需遵守</Text>
                        <Text onPress={protocol} style={{ fontSize: 12, color: '#ededed' }}>发言公约</Text>
                    </View>
                </ScrollView>
                <CreateSpeechComfirmFooter />
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

Main.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
    protocol: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.925,
        alignItems: 'center',
        paddingTop: 20,
        zIndex: -10,
    },
    title: {
        width: width * 0.9,
        height: 40,
        fontSize: 20,
        backgroundColor: '#ededed',
        color: '#a6a6a6',
    },
    content: {
        width: width * 0.9,
        height: height * 0.5,
        marginTop: 20,
        fontSize: 20,
        backgroundColor: '#ededed',
        color: '#a6a6a6',
    },
});

const mapStateToProps = (state) => {
    const plazaName = state.getIn(['plaza', 'plazaName']);
    return {
        title: state.getIn(['plaza', plazaName, 'createSpeech', 'title']),
        text: state.getIn(['plaza', plazaName, 'createSpeech', 'text']),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    changeText: ({ value }) =>
        dispatch({
            type: 'PLAZA_CREATESPEECH_CHANGE_TEXT',
            value,
        }),
    changeTitle: ({ value }) =>
        dispatch({
            type: 'PLAZA_CREATESPEECH_CHANGE_TITLE',
            value,
        }),
    protocol: () =>
        dispatch({
            type: 'PLAZA_CREATESPEECH_PROTOCOL',
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
