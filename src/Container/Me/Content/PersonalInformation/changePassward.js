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
const ChangePassward = ({ passward, changePassward, comfirm }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={64}>
                <View style={{ width, alignItems: 'center', marginTop: height * 0.05 }}>
                    <TextInput value={passward.get('oriPassward')} placeholder="原密码" onChangeText={text => changePassward({ text, kind: 'oriPassward' })} style={[styles.text, { marginTop: height * 0.05 }]} />
                    <TextInput value={passward.get('passward')} placeholder="新密码" onChangeText={text => changePassward({ text, kind: 'passward' })} secureTextEntry style={styles.text} />
                    <TextInput value={passward.get('passwardRepeat')} placeholder="重复密码" onChangeText={text => changePassward({ text, kind: 'passwardRepeat' })} secureTextEntry style={styles.text} />
                    <TouchableOpacity onPress={comfirm({ passward })}>
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

ChangePassward.propTypes = {
    passward: ImmutablePropTypes.map.isRequired,
    changePassward: PropTypes.func.isRequired,
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
    passward: state.getIn(['me', '修改密码']),
});

const mapDispatchToProps = dispatch => ({
    changePassward: ({ text, kind }) => {
        dispatch({
            type: 'PASSWARD',
            kind,
            text,
        });
    },
    comfirm: ({ passward }) => () => {
        if (passward.get('passward') === passward.get('passwardRepeat')) {
            Alert.alert('修改成功');
            dispatch({
                type: 'CHANGE_PASSWARD_COMFIRM',
                kind: 'success',
            });
        } else {
            Alert.alert('修改失败');
            dispatch({
                type: 'CHANGE_PASSWARD_COMFIRM',
                kind: 'fail',
            });
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassward);
