import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
import moment from 'moment';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Animatable from 'react-native-animatable';
import DialogFrame from './DialogFrame/dialogFrame';
import generateSize from '../../../../Action/generateSize';
import generateColor from '../../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const Discuss = ({ userInfo, plazaName, speechId, replyToUserName, articalUserName, placeholder, text, visibility, discuss, light, fontSize, discussVisibility, textChange, comfirm }) => (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -500}>
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.content_text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ text }</Text>
            </ScrollView>
        </View>
        <View>
            <DialogFrame discuss={discuss} articalUserName={articalUserName} />
            <View style={styles.review}>
                <TouchableOpacity onPress={discussVisibility({ visibility: !visibility })} >
                    <View style={styles.comfirmContainer}>
                        <Animatable.Text transition="rotateX" style={[styles.comfirm, { transform: [{ rotateX: visibility ? '180deg' : '0deg' }] }]}>﹀</Animatable.Text>
                    </View>
                </TouchableOpacity>
                <TextInput onFocus={discussVisibility({ visibility: true })} placeholder={placeholder} value={discuss.getIn(['location', 'text'])} style={styles.textInput} onChangeText={value => textChange({ value })} />
                <TouchableHighlight onPress={comfirm({ userInfo, text: discuss.getIn(['location', 'text']), sourceDetail: Map({
                        userName: replyToUserName,
                        text: discuss.getIn(['location', 'text']),
                        time: moment().format('YYYY-MM-DD hh:mm'),
                        location: Map({
                            plazaName,
                            speechId,
                        }),
                    }) })}
                >
                    <View style={styles.comfirmContainer}>
                        <Text style={styles.comfirm} > 发送 </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    </KeyboardAvoidingView>
);

Discuss.propTypes = {
    plazaName: PropTypes.string.isRequired,
    speechId: PropTypes.string.isRequired,
    replyToUserName: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    userInfo: ImmutablePropTypes.map.isRequired,
    text: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
    discuss: ImmutablePropTypes.map.isRequired,
    articalUserName: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    discussVisibility: PropTypes.func.isRequired,
    textChange: PropTypes.func.isRequired,
    comfirm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        alignItems: 'center',
        paddingTop: 20,
        zIndex: -10,
    },
    content_text: {
        width: width * 0.9,
        color: 'white',
        fontSize: 20,
        lineHeight: 30,
    },
    discuss: {
        borderTopWidth: 1,
        borderStyle: 'solid',
        width,
        backgroundColor: '#ededed',
        flexDirection: 'row',
    },
    review: {
        width,
        height: height * 0.09,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#333',
        backgroundColor: '#f9f9f9',
        shadowOffset: { width: 2,
                        height: -2 },
        shadowOpacity: 0.7,
    },
    textInput: {
        width: width * 0.7,
        height: height * 0.06,
        backgroundColor: '#ededed',
        color: '#6a6a6a',
    },
    comfirmContainer: {
        width: width * 0.1,
        height: height * 0.06,
        backgroundColor: '#ededed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    comfirm: {
        fontSize: 15,
        color: '#6a6a6a',
    },
});

const mapStateToProps = (state) => {
    const plazaName = state.getIn(['plaza', 'plazaName']);
    const speechId = state.getIn(['plaza', plazaName, 'speechId']);
    const content = state.getIn(['plaza', plazaName, 'content', speechId]);
    const location = content.getIn(['discuss', 'location']);
    const userInfo = state.getIn(['me', '我的信息']);
    const replyToUserName = location.get('discussId') === '' ? content.get('userName') : content.getIn(['discuss', 'content', location.get('time'), location.get('discussId'), 'userName']);
    return {
        userInfo,
        plazaName,
        speechId,
        replyToUserName,
        text: content.get('text'),
        articalUserName: content.get('userName'),
        visibility: content.getIn(['discuss', 'visibility']),
        placeholder: location.get('discussId') ===
        '' || userInfo.get('userName') === replyToUserName ? '' : `对${replyToUserName}的回复`,
        discuss: content.get('discuss'),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    comfirm: ({ userInfo, text, sourceDetail }) => () => {
        if (text.trim().length > 0) {
            dispatch({
                type: 'PLAZA_DICUSS_COMFIRM',
                userInfo,
            });
            dispatch({
                type: 'ME_ADD',
                viewMode: '我的回复',
                sourceDetail,
            });
        }
    },

    textChange: ({ value }) =>
        dispatch({
            type: 'PLAZA_DISCUSS_CHANGE_TEXT',
            text: value,
        }),

    discussVisibility: ({ visibility }) => () =>
        dispatch({
            type: 'PLAZA_CHANGE_DISCUSS_VISIBILITY',
            visibility,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discuss);
