import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
  } from 'react-native';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const academyRevise = gql`
    mutation academyRevise($token: String!, $order: Int!, $text: String!) {
        academyRevise(token: $token, order: $order, text: $text) {
            finish
        }
    }
`;
const { height, width } = Dimensions.get('window');
const Revise = ({ token, order, text, light, fontSize, changeText, comfirm, academyRevise }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -500}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <TextInput value={text} onChangeText={value => changeText({ value })} style={[styles.text, { fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }]} multiline />
                    </View>
                    <View style={{ width: width * 0.835, height: height * 0.12, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        <TouchableOpacity onPress={comfirm({ kind: 'cancel' })}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    取消
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={comfirm({ kind: 'complete', order, text, token, academyRevise })}>
                            <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#ededed', fontSize: 14 }}>
                                    完成
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    </TouchableWithoutFeedback>
);

Revise.propTypes = {
    text: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    comfirm: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    academyRevise: PropTypes.func.isRequired,
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
        width: width * 0.9,
        marginTop: 10,
        lineHeight: 30,
    },
});

const mapDispatchToProps = dispatch => ({
    comfirm: ({ kind, order, text, token, academyRevise }) => async () => {
        if (kind === 'complete') {
            console.log(kind, order, text, token);
            const response = await academyRevise({ variables: { token, order, text } });
            if (response.data.academyRevise.finish) {
                Toast.success('修订成功！');
            } else {
                Toast.fail('修改失败！');
            }
        }
        dispatch({
            type: 'BACK',
        });
    },

    changeText: ({ value }) => {
        dispatch({
            type: 'ACADEMY_CHANGE_REVISE_TEXT',
            value,
        });
    },
});

const mapStateToProps = state => ({
    text: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'operation', 'revise']),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
    order: Number.parseInt(state.getIn(['academy', 'order']), 10),
    token: state.getIn(['me', '我的信息', 'token']),
});

export default connect(mapStateToProps, mapDispatchToProps)(graphql(academyRevise, { name: 'academyRevise' })(Revise));
