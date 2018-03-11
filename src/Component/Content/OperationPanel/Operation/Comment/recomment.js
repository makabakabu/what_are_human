import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import generateSize from '../../../../../Action/generateSize';
import generateColor from '../../../../../Action/generateColor';

const { width } = Dimensions.get('window');
const Recomment = ({ content, writeName, commentId, recommentId, light, fontSize, commentPress }) => (
    <TouchableHighlight onPress={commentPress({
        location: Map({
          viewMode: 'recomment',
          text: '',
          commentId,
          recommentId,
        }),
      })}
    >
        <View style={{ width: 0.6 * width, justifyContent: 'center', marginTop: 2, marginBottom: 4 }}>
            <Text style={{ color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 16) }}> {writeName} : {content.get('text')} </Text>
        </View>
    </TouchableHighlight>
);

Recomment.propTypes = {
    content: ImmutablePropTypes.map.isRequired,
    writeName: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
    recommentId: PropTypes.string.isRequired,
    commentPress: PropTypes.func.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const toName = ownProps.content.get('to');
    return {
        toName,
        writeName: ownProps.content.get('userName') + (ownProps.contentUserName === toName ? '' : `对${toName}的评论`),
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    commentPress: ({ location }) => () =>
        dispatch({
            type: 'OPERATION_COMMENT_PRESS',
            location,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recomment);
