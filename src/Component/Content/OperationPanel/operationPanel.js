import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Map } from 'immutable';
import moment from 'moment';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import OperationTrigger from './operationTrigger';

const { width } = Dimensions.get('window');
const OperationPanel = ({ likeId, imageSource, order, operation, text, sharePress, commentPress, likePress, operationPress }) => {
    const commentNumber = operation.getIn(['comment', 'content']).reduce((sum, value) => (sum + 1 + value.get('recomment').size), 0);
    return (
        <View style={styles.operation}>
            <OperationTrigger
              imageSource={require('../../../Image/Operation/share.png')}
              number={operation.getIn(['share', 'number']).toString()}
              press={sharePress({
                  sourceDetail: Map({
                    text: '',
                    time: moment().format('YYYY-MM-DD hh:mm'),
                    location: Map({
                        order,
                    }),
                  }),
              })}
            />
            <OperationTrigger
              imageSource={require('../../../Image/Operation/comment.png')}
              number={commentNumber.toString()}
              press={commentPress({
                  location: Map({
                    viewMode: 'main',
                    text: '',
                    commentId: uuidv4(),
                    recommentId: '',
                  }),
                })}
            />
            <OperationTrigger
              imageSource={imageSource}
              number={operation.getIn(['like', 'number']).toString()}
              likeId={likeId}
              press={likePress({
                likeId,
                location: Map({
                    viewMode: 'like',
                }),
              })}
            />
            <OperationTrigger
              imageSource={require('../../../Image/Operation/revise.png')}
              have={operation.get('revise') !== text}
              press={operationPress({ viewMode: 'revise' })}
            />
            <OperationTrigger
              imageSource={require('../../../Image/Operation/notes.png')}
              have={operation.getIn(['notes', 'text']).length !== 0}
              press={operationPress({ viewMode: 'notes' })}
            />
        </View>
    );
};

OperationPanel.propTypes = {
    likeId: PropTypes.string.isRequired,
    imageSource: PropTypes.number.isRequired,
    operation: ImmutablePropTypes.map.isRequired,
    order: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    sharePress: PropTypes.func.isRequired,
    commentPress: PropTypes.func.isRequired,
    likePress: PropTypes.func.isRequired,
    operationPress: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    operation: {
        marginLeft: width * 0.025,
        width: width * 0.85,
        height: 40,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const mapStateToProps = (state, ownProps) => ({
    likeId: uuidv4(),
    operation: state.getIn(['academy', 'content', ownProps.order, 'operation']),
    imageSource: state.getIn(['academy', 'content', ownProps.order, 'operation', 'like', 'clicked']) ? require('../../../Image/Operation/likeAfter.png') : require('../../../Image/Operation/like.png'),
    text: state.getIn(['academy', 'content', ownProps.order, 'text']),
});

const mapDispatchToProps = dispatch => ({
    sharePress: ({ sourceDetail }) => () => {
        dispatch({
            type: 'OPERATION_2_SHARE',
            source: 'academy',
            sourceDetail,
        });
        dispatch({
            type: 'OPERATION_PRESS',
            viewMode: 'share',
        });
    },
    operationPress: ({ viewMode }) => () =>
        dispatch({
            type: 'OPERATION_PRESS',
            viewMode,
        }),
    commentPress: ({ location }) => () =>
        dispatch({
            type: 'OPERATION_COMMENT_PRESS',
            location,
        }),
    likePress: ({ location, likeId }) => () => {
        this[likeId].swing(800);
        dispatch({
            type: 'OPERATION_LIKE_PRESS',
            location,
        });
        dispatch({
            type: 'ME_ADD',
            viewMode: '我的点赞',
            location,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OperationPanel);
