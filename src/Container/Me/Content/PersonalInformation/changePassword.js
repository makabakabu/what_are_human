import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const { height, width } = Dimensions.get('window');
const ChangePassword = ({ password, changePassword, comfirm }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={64}>
                <View style={{ width, alignItems: 'center', marginTop: height * 0.05 }}>
                    <TextInput value={password.get('oriPassword')} placeholder="原密码" onChangeText={text => changePassword({ text, kind: 'oriPassword' })} style={[styles.text, { marginTop: height * 0.05 }]} />
                    <TextInput value={password.get('password')} placeholder="新密码" onChangeText={text => changePassword({ text, kind: 'password' })} secureTextEntry style={styles.text} />
                    <TextInput value={password.get('passwordRepeat')} placeholder="重复密码" onChangeText={text => changePassword({ text, kind: 'passwordRepeat' })} secureTextEntry style={styles.text} />
                    <TouchableOpacity onPress={comfirm({ password })}>
                        <View style={styles.button}>
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                确定
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    </TouchableWithoutFeedback>
);

ChangePassword.propTypes = {
    password: ImmutablePropTypes.map.isRequired,
    changePassword: PropTypes.func.isRequired,
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
        marginTop: 50,
        backgroundColor: '#a6a6a6',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    password: state.getIn(['me', '修改密码']),
});

const mapDispatchToProps = dispatch => ({
    changePassword: ({ text, kind }) => {
        dispatch({
            type: 'PASSWORD',
            kind,
            text,
        });
    },
    comfirm: ({ password }) => () => {
        if (password.get('password') === password.get('passwordRepeat')) {
            Alert.alert('修改成功');
            dispatch({
                type: 'CHANGE_PASSWORD_COMFIRM',
                kind: 'success',
            });
        } else {
            Alert.alert('修改失败');
            dispatch({
                type: 'CHANGE_PASSWORD_COMFIRM',
                kind: 'fail',
            });
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
