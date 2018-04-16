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
} from 'react-native';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const query = gql`
    query {
        allUser {
            phoneNumber
        }
    }
`;

const signIn2server = gql`
    mutation signIn2server ($phoneNumber: String!, $password: String!) {
        signIn2server (phoneNumber: $phoneNumber, password: $password) {
            token
            phoneNumber
            userName
            quantum
            gender
            start
        }
    }
`;

const { height, width } = Dimensions.get('window');
const SignIn = ({ data, light, fontSize, signInInfo, signIn, signIn2server, change, registerPress }) => {
    styles.text = [styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20), borderBottomColor: `#${generateColor(166, 216, light)}`, borderBottomWidth: 1 }];
    if (data.loading) {
        return (<View><Text>loading...</Text></View>)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={64}>
                    <View style={{ width, alignItems: 'center' }}>
                        <Image style={[styles.logo, { marginTop: height * 0.05 }]} source={require('../../../Image/Logo.png')} />
                        <TextInput placeholder="注册手机号" placeholderTextColor="#888" value={signInInfo.get('phoneNumber')} onChangeText={value => change({ value, viewMode: 'phoneNumber' })} keyboardType="numeric" maxLength={11} style={[styles.text, { marginTop: height * 0.05 }]} />
                        <TextInput placeholder="密码" placeholderTextColor="#888" value={signInInfo.get('password')} onChangeText={value => change({ value, viewMode: 'password' })} secureTextEntry style={styles.text} />
                        <TouchableOpacity onPress={signIn({ phoneNumber: signInInfo.get('phoneNumber'), password: signInInfo.get('password'), signIn2server })}>
                            <View style={styles.button}>
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    登陆
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 0.75 * width, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text onPress={registerPress} style={{ textDecorationLine: 'underline', fontSize: 18, marginTop: 10, color: 'white' }}>注册微斯人账号</Text>
                            <Text onPress={registerPress} style={{ textDecorationLine: 'underline', fontSize: 18, marginTop: 10, color: 'white' }}>忘记密码</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

SignIn.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    signInInfo: ImmutablePropTypes.map.isRequired,
    change: PropTypes.func.isRequired,
    registerPress: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signIn2server: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
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
        borderRadius: 7,
        backgroundColor: 'transparent',
    },
    button: {
        height: 45,
        width: 0.75 * width,
        marginTop: 15,
        backgroundColor: '#a6a6a6',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    signInInfo: state.getIn(['menu', 'signIn']),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = dispatch => ({
    change: ({ value, viewMode }) => {
        dispatch({
            type: 'SIGNIN_CHANGE',
            viewMode,
            value,
        });
    },
    signIn: ({ phoneNumber, password, signIn2server }) => async () => {
        const response = await signIn2server({ variables: { phoneNumber, password } });
        if (response) {
            Toast.success('登陆成功！');
            console.log(response);
            dispatch({// 此处需要与服务器连接，接受数据
                type: 'ME_SIGNIN',
                userName: response.data.signIn2server.userName,
                phoneNumber: response.data.signIn2server.phoneNumber,
                token: response.data.signIn2server.token,
                quantum: response.data.signIn2server.quantum,
                gender: response.data.signIn2server.gender,
                start: response.data.signIn2server.start,
            });
        } else {
            Toast.fail('登陆失败!');
        }
    },
    registerPress: () => {
        dispatch({
            type: 'CHANGE_MENU_VIEWMODE',
            viewMode: 'register',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(compose(graphql(query), graphql(signIn2server, { name: 'signIn2server' }))(SignIn));
