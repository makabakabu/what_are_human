import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    Switch,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CheckBox from 'react-native-check-box';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const Register = ({ light, fontSize, register,
 pressProtocolCode, change, RegisterIt, sendVertificationCode }) => {
    styles.text = [styles.text, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }];
    styles.vertificationCode = [styles.vertificationCode, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }];
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
                    <View style={{ width, alignItems: 'center' }}>
                        <Image style={[styles.logo, { marginTop: height * 0.07 }]} source={require('../../../Image/Logo.png')} />
                        <TextInput placeholder="昵称" value={register.get('userName')} onChangeText={value => change({ value, viewMode: 'userName' })} maxLength={6} style={[styles.text, { marginTop: height * 0.07 }]} />
                        <TextInput placeholder="手机号" value={register.get('phoneNumber')} onChangeText={value => change({ value, viewMode: 'phoneNumber' })} keyboardType="numeric" maxLength={11} style={styles.text} />
                        <TextInput placeholder="密码" value={register.get('passward')} onChangeText={value => change({ value, viewMode: 'passward' })} style={styles.text} />
                        <View style={{ width: width * 0.75, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextInput placeholder="验证码" value={register.get('vertificationCode')} maxLength={4} onChangeText={value => change({ value, viewMode: 'vertificationCode' })} style={styles.vertificationCode} />
                            <TouchableOpacity onPress={sendVertificationCode}>
                                <View style={styles.vertificationButton}>
                                    <Text style={{ color: 'white', fontSize: 8 }}>
                                        发送验证码
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sex}>
                            <Text style={{ width: width * 0.25, fontSize: 18, color: '#ededed', paddingLeft: 15 }}>
                                性别:
                            </Text>
                            <View style={{ width: width * 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
                                <Text style={{ marginRight: 10, fontSize: 18, color: '#ededed' }}>男</Text>
                                <Switch value={register.get('gender') === 'female'} onValueChange={value => change({ value: value ? 'female' : 'male', viewMode: 'gender' })} onTintColor="#aaa" />
                                <Text style={{ marginLeft: 10, fontSize: 18, color: '#ededed' }}>女</Text>
                            </View>
                        </View>
                        <View style={{ width: width * 0.75, flexDirection: 'row', alignItems: 'center', marginTop: 5, paddingLeft: 15 }}>
                            <CheckBox onClick={() => change({ value: !register.get('checkbox'), viewMode: 'checkbox' })} isChecked={register.get('checkbox')} checkBoxColor="#ededed" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 10, color: '#ccc' }}>我已阅读并同意</Text>
                            <Text onPress={pressProtocolCode} style={{ fontSize: 10, color: 'white' }}>《微斯人APP用户协议与法律协议》</Text>
                        </View>
                        <TouchableOpacity onPress={RegisterIt({ register })}>
                            <View style={styles.button}>
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    注册账号
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

Register.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    register: ImmutablePropTypes.map.isRequired,
    pressProtocolCode: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    RegisterIt: PropTypes.func.isRequired,
    sendVertificationCode: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    logo: {
        width: width * 0.12,
        height: height * 0.05,
        marginTop: '5%',
    },
    vertificationCode: {
        height: 55,
        width: 0.6 * width,
        marginTop: 2,
        paddingLeft: 15,
        color: '#666',
    },
    text: {
        height: 55,
        width: 0.75 * width,
        marginTop: 2,
        paddingLeft: 15,
    },
    sex: {
        width,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vertificationButton: {
        height: 50,
        width: 0.13 * width,
        marginTop: 2,
        backgroundColor: '#a6a6a6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        width: 0.75 * width,
        marginTop: 20,
        backgroundColor: '#a6a6a6',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
    gender: state.getIn(['menu', 'register', 'gender']),
    register: state.getIn(['menu', 'register']),
});

const mapDispatchToProps = dispatch => ({
    pressProtocolCode: () => {
        dispatch({
            type: 'CHANGE_MENU_VIEWMODE',
            viewMode: 'protocol',
        });
    },
    change: ({ value, viewMode }) => {
        dispatch({
            type: 'REGISTER_CHANGE',
            viewMode,
            value,
        });
    },
    RegisterIt: ({ register }) => () => {
        if ((register.get('userName') !== '') && (register.get('phoneNumber').length === 11) && (register.get('passward') !== '') && (register.get('checkbox'))) {
            Alert.alert('注册成功！');
            dispatch({// 此处需要与服务器连接，接受数据
                type: 'ME_REGISTER',
                register,
            });
        } else {
            Alert.alert('注册失败！');
        }
    },
    sendVertificationCode: () => {

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
