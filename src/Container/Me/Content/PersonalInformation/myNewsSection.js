import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    Platform,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const myNewsSection = ({ imageSource, num, name, light, press }) => (
    <TouchableOpacity onPress={press}>
        <View style={styles.main}>
            <ImageBackground style={{ width: width * 0.12, height: height * 0.08, justifyContent: 'flex-start', alignItems: 'flex-end' }} source={imageSource}>
                <View style={{ backgroundColor: '#ccc', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.num, { color: `#${generateColor(50, 109, light)}` }]}>{ num }</Text>
                </View>
            </ImageBackground>
            <Text style={[styles.name, { color: `#${generateColor(166, 216, light)}` }]}>{ name } </Text>
        </View>
    </TouchableOpacity>
);

myNewsSection.propTypes = {
    imageSource: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    press: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width: Platform.Os === 'ios' ? width * 0.3 : width * 0.3,
        height: Platform.Os === 'ios' ? height * 0.1 : height * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ((height * 0.465) - (width * 0.5)) / 3,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    name: {
        fontSize: 16,
        color: '#ededed',
        width: width * 0.25,
        textAlign: 'center',
    },
    num: {
        fontSize: 15,
        width: width * 0.25,
        textAlign: 'center',
    },
});

const mapStateToProps = (state, ownProps) => {
    const componentMap = {
        我的演讲: require('../../../../Image/SideMenu/speech.png'),
        我的转发: require('../../../../Image/SideMenu/share.png'),
        我的收藏: require('../../../../Image/SideMenu/collect.png'),
        我的点赞: require('../../../../Image/SideMenu/like.png'),
        我的评论: require('../../../../Image/SideMenu/comment.png'),
        我的回复: require('../../../../Image/SideMenu/review.png'),
    };
    return {
        imageSource: componentMap[ownProps.name],
        light: state.getIn(['pageSet', 'light']),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    press: () =>
        dispatch({
            type: 'ME_CHANGE_VIEWMODE',
            viewMode: ownProps.name,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(myNewsSection);
