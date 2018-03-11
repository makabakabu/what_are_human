import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { width } = Dimensions.get('window');
const { alert } = Modal;
const Section = ({ text, viewMode, light, fontSize, deletePiece }) => (
    <Swipeout
      right={[{
        text: '删除',
        backgroundColor: '#aaa',
        color: '#6a6a6a',
        onPress: deletePiece,
      }]}
      backgroundColor="transparent"
      autoClose
    >
        <TouchableOpacity>
            <View style={styles.main}>
                <View style={styles.text}>
                    <Text style={styles.kind}>{ viewMode }</Text>
                    <Text style={[styles.title, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ text }</Text>
                    <Text style={styles.order}>〉</Text>
                </View>
                <View style={styles.seperator} />
            </View>
        </TouchableOpacity>
    </Swipeout>
);

Section.propTypes = {
    text: PropTypes.string.isRequired,
    viewMode: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    deletePiece: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: 80,
        alignItems: 'center',
    },
    text: {
        height: 79,
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    kind: {
        fontSize: 14,
        color: '#aaa',
        width: width * 0.18,
        textAlign: 'left',
    },
    order: {
        fontSize: 25,
        color: '#ededed',
        width: width * 0.2,
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
        color: '#ededed',
        width: width * 0.62,
    },
    seperator: {
        opacity: 0.5,
        width: width * 0.9,
        height: 1,
        backgroundColor: '#aaa',
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    deletePiece: () => {
        alert('删除这条消息', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                dispatch({
                    type: 'NEWS_DELETE',
                    viewMode: ownProps.viewMode,
                    newsId: ownProps.newsId,
                });
            } },
        ]);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);
