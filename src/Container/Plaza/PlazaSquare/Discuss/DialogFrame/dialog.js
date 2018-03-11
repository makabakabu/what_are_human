import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import generateColor from '../../../../../Action/generateColor';
import generateSize from '../../../../../Action/generateSize';

const { width } = Dimensions.get('window');

const Dialog = ({ articalUserName, content, time, discussId, imageSource, isMe, light, fontSize, onPress }) => (
    <TouchableOpacity onPress={onPress({ time, discussId })}>
        <View style={{ width, marginTop: 5, flexDirection: 'row', justifyContent: !isMe ? 'flex-start' : 'flex-end', alignItems: 'center' }}>
            { !isMe && <Image style={{ width: 20, height: 24 }} source={imageSource} />
            }
            <View style={{ alignItems: isMe ? 'flex-start' : 'flex-end', justifyContent: isMe ? 'flex-start' : 'center' }}>
                { !isMe && <Text style={{ color: '#6a6a6a', fontSize: 12 }}>{ content.get('userName') }</Text> }
                { content.get('to') !== articalUserName && content.get('to') !== content.get('userName') && <Text style={{ color: '#aaa', fontSize: 10 }}>{ `@${content.get('to')}` }</Text> }
                <Text style={{ color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 16), marginBottom: 10, marginTop: 5 }}>{ content.get('text') }</Text>
            </View>
            { isMe && <Image style={{ width: 20, height: 24 }} source={imageSource} />
            }
        </View>
    </TouchableOpacity>
);

Dialog.propTypes = {
    articalUserName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    discussId: PropTypes.string.isRequired,
    content: ImmutablePropTypes.map.isRequired,
    imageSource: PropTypes.number.isRequired,
    isMe: PropTypes.bool.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const plazaName = state.getIn(['plaza', 'plazaName']);
    const speechId = state.getIn(['plaza', plazaName, 'speechId']);
    return {
        articalUserName: state.getIn(['plaza', plazaName, 'content', speechId, 'userName']),
        isMe: ownProps.content.get('userName') === state.getIn(['me', '我的信息', 'userName']),
        imageSource: ownProps.content.get('gender') === 'male' ? require('../../../../../Image/Menu/maleGrey.png') : require('../../../../../Image/Menu/femaleGrey.png'),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    onPress: ({ time, discussId }) => () =>
        dispatch({
            type: 'PLAZA_DISCUSS_PRESS_DIALOG',
            time,
            discussId,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
