import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from 'react-native';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import moment from 'moment';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { height } = Dimensions.get('window');
const Edit = ({ notes, notesId, light, fontSize, changeTitle, changeText, comfirm, share }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} >
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
            <TextInput value={notes.get('title')} onChangeText={value => changeTitle({ value, notesId })} placeholder="标题" style={[styles.title, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} />
            <TextInput value={notes.get('text')} onChangeText={value => changeText({ value, notesId })} placeholder="内容" style={[styles.text, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20), backgroundColor: `#${generateColor(166, 216, light)}` }]} multiline />
            <View style={{ height: 30, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity onPress={comfirm({ title: notes.get('title') })}>
                    <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ededed', fontSize: 14 }}>
                            完成
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={share({ sourceDetail: Map({
                        text: '',
                        time: moment().format('YYYY-MM-DD hh:mm'),
                        location: Map({
                            viewMode: 'winkThought',
                            notesId,
                        }),
                    }) })}
                >
                    <View style={{ height: 30, width: 50, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ededed', fontSize: 14 }}>
                            转发
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />
        </ScrollView>
        </KeyboardAvoidingView>
    </View>
);

Edit.propTypes = {
    notes: ImmutablePropTypes.map.isRequired,
    notesId: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    changeTitle: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
    comfirm: PropTypes.func.isRequired,
    share: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width: '100%',
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    title: {
        width: Dimensions.get('window').width * 0.9,
        height: 30,
        backgroundColor: '#ededed',
        borderRadius: 3,
        fontSize: 20,
        color: '#707070',
        marginTop: 10,
        paddingLeft: 10,
    },
    text: {
        width: Dimensions.get('window').width * 0.9,
        height: 250,
        backgroundColor: '#ededed',
        borderRadius: 3,
        fontSize: 20,
        color: '#707070',
        paddingLeft: 10,
        marginTop: 10,
        lineHeight: 30,
    },
    content: {
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 10,
        fontSize: 20,
        color: '#ededed',
        paddingLeft: 10,
        marginTop: 30,
        lineHeight: 30,
    },
    operation: {
        width: Dimensions.get('window').width * 0.9,
        height: 40,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    const notesId = state.getIn(['notes', 'winkThought', 'notesId']);
    return {
        notes: state.getIn(['notes', 'winkThought', 'notes', notesId]),
        notesId,
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    changeText: ({ value, notesId }) =>
        dispatch({
            type: 'NOTES_CHANGE_TEXT',
            notesId,
            value,
        }),
    changeTitle: ({ value, notesId }) =>
        dispatch({
            type: 'NOTES_CHANGE_TITLE',
            notesId,
            value,
        }),
    share: ({ sourceDetail }) => () => {
        dispatch({
            type: 'OPERATION_2_SHARE',
            source: 'notes',
            sourceDetail,
        });
        dispatch({
            type: 'NOTES_SHARE_PRESS',
            viewMode: 'share',
        });
    },
    comfirm: ({ title }) => () =>
        dispatch({
            type: 'WINKTHOUGHT_EDIT_COMFIRM',
            title,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
