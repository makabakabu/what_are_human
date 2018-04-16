import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Switch,
    AsyncStorage,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CheckBox from 'react-native-check-box';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const query = gql`
    query {
        allUser {
            userName
            phoneNumber
        }
    }
`;

const register2server = gql`
    mutation register2server($userName: String!, $password: String!, $phoneNumber: String!, $gender: String!,  $vertificationCode: String!) {
        register2server (userName: $userName, password: $password, phoneNumber: $phoneNumber, vertificationCode: $vertificationCode, gender: $gender) {
            token
        }
    }
`;

const { height, width } = Dimensions.get('window');
const Register = ({ data, light, fontSize, register, register2server,
 pressProtocolCode, change, RegisterIt, sendVertificationCode }) => {
    styles.text = [styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20), borderBottomColor: `#${generateColor(166, 216, light)}`, borderBottomWidth: 1 }];
    if (data.loading) {
        return (<View><Text>loading... </Text></View>);
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
                    <ScrollView>
                        <View style={{ width, alignItems: 'center' }}>
                            <Image style={[styles.logo, { marginTop: height * 0.05 }]} source={require('../../../Image/Logo.png')} />
                            <TextInput placeholder="昵称" value={register.get('userName')} onChangeText={value => change({ value, viewMode: 'userName' })} maxLength={10} placeholderTextColor="#888" style={[styles.text, { marginTop: height * 0.01 }]} />
                            <TextInput placeholder="手机号" value={register.get('phoneNumber')} onChangeText={value => change({ value, viewMode: 'phoneNumber' })} placeholderTextColor="#888" keyboardType="numeric" maxLength={11} style={styles.text} />
                            <TextInput placeholder="密码" value={register.get('password')} onChangeText={value => change({ value, viewMode: 'password' })} style={styles.text} placeholderTextColor="#888" />
                            <TextInput placeholder="重复密码" value={register.get('rePassword')} onChangeText={value => change({ value, viewMode: 'rePassword' })} style={styles.text} placeholderTextColor="#888" />
                            <View style={{ width: width * 0.75, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput placeholder="验证码" value={register.get('vertificationCode')} maxLength={4} onChangeText={value => change({ value, viewMode: 'vertificationCode' })} placeholderTextColor="#888" style={[styles.text, { width: 0.3 * width }]} />
                                <View style={{ marginTop: 15, height: 45, width: 0.45 * width, backgroundColor: 'transparent', borderBottomColor: `#${generateColor(166, 216, light)}`, borderBottomWidth: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <Text onPress={sendVertificationCode} style={{ fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }}>
                                        发送验证码
                                    </Text>
                                </View>
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
                            <TouchableOpacity onPress={RegisterIt({ register, userNameList: data.allUser.map(value => value.userName), phoneNumberList: data.allUser.map(value => value.phoneNumber), register2server })}>
                                <View style={styles.button}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>
                                        注册账号
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

Register.propTypes = {
    data: PropTypes.object.isRequired,
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
        width: 95,
        height: 68,
    },
    text: {
        height: 45,
        width: 0.75 * width,
        marginTop: 15,
        paddingLeft: 20,
    },
    sex: {
        width,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    RegisterIt: ({ register, userNameList, phoneNumberList, register2server }) => async () => {
        console.log(userNameList, register.get('userName'), phoneNumberList, register.get('password'), register.get('phoneNumber').toString());
        if (!userNameList.includes(register.get('userName')) && (register.get('userName').trim() !== '') && (!phoneNumberList.includes(register.get('phoneNumber'))) && (register.get('phoneNumber').length === 11) && (register.get('password') !== '') && (register.get('password') === register.get('rePassword')) && (register.get('checkbox')) && (register.get('vertificationCode').length === 4)) {
            const response = await register2server({ variables: { userName: register.get('userName'), password: register.get('password'), phoneNumber: register.get('phoneNumber').toString(), gender: register.get('gender'), vertificationCode: register.get('vertificationCode') } });
            if (response) {
                Toast.success('注册成功！');
                await AsyncStorage.setItem('token', response.data.register2server.token);
                dispatch({// 此处需要与服务器连接，接受数据
                    type: 'ME_REGISTER',
                    register,
                });
            } else {
                Toast.fail('服务器访问错误，请检查您的网络是否畅通！');
            }
        } else {
            Toast.fail('注册失败！');
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(compose(graphql(query), graphql(register2server, { name: 'register2server' }))(Register));
