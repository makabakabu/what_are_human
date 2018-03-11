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
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import randomString from 'random-string';
import PropTypes from 'prop-types';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const SignIn = ({ light, fontSize, signIn, change, registerPress }) => {
    styles.text = [styles.text, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }];
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={64}>
                    <View style={{ width, alignItems: 'center' }}>
                        <Image style={[styles.logo, { marginTop: height * 0.05 }]} source={require('../../../Image/Logo.png')} />
                        <TextInput placeholder="注册手机号" value={signIn.get('phoneNumber')} onChangeText={value => change({ value, viewMode: 'phoneNumber' })} keyboardType="numeric" maxLength={11} style={[styles.text, { marginTop: height * 0.05 }]} />
                        <TextInput placeholder="密码" value={signIn.get('passward')} onChangeText={value => change({ value, viewMode: 'passward' })} secureTextEntry style={styles.text} />
                        <TextInput placeholder="验证码" value={signIn.get('typedVertificationCode')} maxLength={4} onChangeText={value => change({ value, viewMode: 'typedVertificationCode' })} style={styles.text} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 45, width: 0.34 * width, marginTop: 15, paddingLeft: 20, borderRadius: 7, justifyContent: 'center', backgroundColor: `#${generateColor(166, 216, light)}` }}>
                                <Text style={{ fontSize: 32, color: `#${generateColor(50, 109, light)}` }}> { signIn.get('vertificationCode') } </Text>
                            </View>
                            <View style={{ width: 0.41 * width, height: 45, marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                                <Text onPress={() => change({ value: randomString({ length: 4 }), viewMode: 'vertificationCode' })} style={{ fontSize: 15, textAlign: 'right', color: 'white' }}>
                                 看不清楚？ 换一张
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity >
                            <View style={styles.button}>
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    登陆
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text onPress={registerPress} style={{ textDecorationLine: 'underline', fontSize: 18, marginTop: 10, color: 'white' }}>注册微斯人账号</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

SignIn.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    signIn: ImmutablePropTypes.map.isRequired,
    change: PropTypes.func.isRequired,
    registerPress: PropTypes.func.isRequired,
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
    text: {
        height: 45,
        width: 0.75 * width,
        marginTop: 15,
        paddingLeft: 20,
        borderRadius: 7,
        color: '#666',
        backgroundColor: '#ededed',
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
    signIn: state.getIn(['menu', 'signIn']),
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
    // SignIn: ({ vertificationCode }) => {
    //     if(store.getState().getIn(["menu", "signIn", "vertificationCode"]) === this.state.vertificationCode){
    //         Alert.alert("登陆成功！")
    //     }else{
    //         Alert.alert("验证码错误！")
    //     }
    // }
    registerPress: () => {
        dispatch({
            type: 'CHANGE_MENU_VIEWMODE',
            viewMode: 'register',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
