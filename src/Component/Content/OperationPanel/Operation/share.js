import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const Share = ({ content, text, light, fontSize, changeText, changeTextComfirm }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
            <View style={{ width: width * 0.9, height: 30, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity onPress={changeTextComfirm}>
                    <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ededed', fontSize: 14 }}>
                            取消
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeTextComfirm}>
                    <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ededed', fontSize: 14 }}>
                            完成
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TextInput style={[styles.editor, { fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }]} value={text} onChangeText={value => changeText({ value })} placeholderTextColor="#a6a6a6" placeholder="在此输入你的转发评论" editable multiline />
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View style={{ width: 0.3 * width, height: 0.16 * height, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a6a6a6' }}>
                    <Image style={{ height: 60, width: 80 }} source={require('../../../../Image/Logo.png')} />
                </View>
                <View style={{ width: 0.6 * width, height: 0.16 * height, alignItems: 'center', justifyContent: 'center', backgroundColor: '#d8d8d8' }}>
                    <Text style={{ color: '#606060', fontSize: 16 }}>
                        { `${content.substr(0, 20)}...` }
                    </Text>
                </View>
            </View>

        </View>
    </TouchableWithoutFeedback>
);

Share.propTypes = {
    content: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeTextComfirm: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width: '100%',
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    editor: {
        width: width * 0.9,
        height: 120,
        color: 'white',
        marginTop: 30,
        lineHeight: 30,
    },
});

const mapStateToProps = (state) => {
    let text = '';
    let content = '';
    switch (state.getIn(['share', 'source'])) {
        case 'academy': {
            const academy = state.getIn(['share', 'academy']);
            text = academy.get('text');
            content = state.getIn(['academy', 'content', academy.getIn(['location', 'order']), 'text']);
            break;
        }

        case 'notes': {
            const notes = state.getIn(['share', 'notes']);
            text = notes.get('text');
            content = state.getIn(['notes', notes.getIn(['location', 'viewMode']), 'notes', notes.getIn(['location', 'notesId']), 'text']);
            break;
        }
        case 'plaza': {
            const plaza = state.getIn(['share', 'plaza']);
            text = plaza.get('text');
            content = state.getIn(['plaza', plaza.getIn(['location', 'plazaName']), 'content', plaza.getIn(['location', 'speechId']), 'text']);
            break;
        }

        default:
            break;
    }
    return {
        text,
        content,
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    changeText: ({ value }) =>
        dispatch({
            type: 'SHARE_CHANGE_TEXT',
            value,
        }),
    changeTextComfirm: () =>
        dispatch({
            type: 'SHARE_COMFIRM',
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
