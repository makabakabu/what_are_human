import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { width } = Dimensions.get('window');
const { alert } = Modal;
const Piece = ({ viewMode, title, light, fontSize, press, deleteNotes }) => (
    <Swipeout
      right={[{
        text: '删除',
        backgroundColor: '#aaa',
        color: '#6a6a6a',
        onPress: deleteNotes,
        }]}
      backgroundColor="transparent"
      autoClose
    >
        <TouchableOpacity onPress={press({ viewMode })}>
            <View style={styles.main}>
                <View style={styles.text}>
                    <Text style={[styles.title, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ title }</Text>
                    <Text style={styles.order}>〉</Text>
                </View>
                <View style={styles.seperator} />
            </View>
        </TouchableOpacity>
    </Swipeout>
);

Piece.propTypes = {
    title: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    viewMode: PropTypes.string.isRequired,
    press: PropTypes.func.isRequired,
    deleteNotes: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: 80,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        height: 79,
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    order: {
        fontSize: 25,
        color: '#ededed',
        width: width * 0.2,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        color: '#ededed',
        width: width * 0.8,
    },
    seperator: {
        opacity: 0.5,
        width: width * 0.9,
        height: 1,
        backgroundColor: '#aaa',
    },
});

const mapStateToProps = state => ({
    viewMode: state.getIn(['notes', 'viewMode']),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    press: ({ viewMode }) => () =>
        dispatch({
            type: 'NOTES_PIECE_2_DETAIL',
            notesId: ownProps.notesId,
            title: ownProps.title,
            viewMode,
        }),

    deleteNotes: () => {
        alert('删除这条笔记', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                dispatch({
                    type: 'NOTES_DELETE',
                    notesId: ownProps.notesId,
                });
            } },
        ]);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
