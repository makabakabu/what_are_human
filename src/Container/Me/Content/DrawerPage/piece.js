import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { width } = Dimensions.get('window');
const Piece = ({ text, light, fontSize, press }) => (
    <TouchableOpacity onPress={press}>
        <View style={styles.main}>
            <View style={styles.text}>
                <Text style={[styles.title, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ text }</Text>
                <Text style={styles.order}>〉</Text>
            </View>
            <View style={styles.seperator} />
        </View>
    </TouchableOpacity>
);

Piece.propTypes = {
    text: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    press: PropTypes.func.isRequired,
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
    order: {
        fontSize: 25,
        color: '#ededed',
        width: width * 0.2,
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
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

const mapStateToProps = (state, ownProps) => {
    let text;
    switch (ownProps.viewMode) {
        case '我的收藏':
            text = ownProps.content.get('speechTitle');
            break;

        case '我的评论':
            text = ownProps.content.get('text').substr(0, 12);
            break;

        case '我的转发':
            text = `您转发了${ownProps.content.get('text')}`;
            break;

        case '我的点赞': {
            const location = ownProps.content.get('location');
            if (location.get('viewMode') === 'main') {
                text = `您点赞了第${location.get('order')}条文章`;
            } else {
                text = `您点赞了${ownProps.content.get('text').substr(0, 12)}`;
            }
            break;
        }

        case '我的演讲':
            text = ownProps.content.get('speechTitle');
            break;

        case '我的回复':
            text = ownProps.content.get('text');
            break;

        default:
            break;
    }
    return {
        text,
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    press: () => {
        const { meId, content, viewMode } = ownProps;
        switch (viewMode) {
            case '我的评论': case '我的点赞':
                dispatch({
                    type: 'ME_RETURN',
                    kind: 'academy',
                    viewMode,
                    meId,
                });
                break;

            case '我的转发':
                Alert.alert('我的转发');
                break;

            case '我的回复': case '我的演讲': case '我的收藏':
                dispatch({
                    type: 'ME_RETURN',
                    kind: 'plaza',
                    plazaName: content.getIn(['location', 'plazaName']),
                    speechId: content.getIn(['location', 'speechId']),
                });
                break;

            default:
                break;
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
