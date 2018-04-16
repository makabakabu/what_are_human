import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Toast } from 'antd-mobile';
import { Map } from 'immutable';
import moment from 'moment';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import OperationTrigger from './operationTrigger';

const academyPieceDetailInfo = gql`
    query academyPieceDetailInfo($order: Int!, $token: String!) {
        academyPieceDetailInfo(order: $order, token: $token) {
            text
            share
            like
            likeClick
            comment
            revise
            notes
        }
    }
`;

const academyLike = gql`
    mutation academyLike($token: String!, $order: Int!, $commentId: String!) {
        academyLike(token: $token, order: $order, commentId: $commentId) {
            finish
        }
    }
`;

const { width } = Dimensions.get('window');
const OperationPanel = ({ token, data, academyLike, likeId, imageSource, order, sharePress, commentPress, likePress, operationPress }) => {
    if (data.loading) {
        return (<View><Text>loading...</Text></View>);
    }
    return (
        <View style={styles.operation}>
            <OperationTrigger
              imageSource={require('../../../Image/Operation/share.png')}
              number={data.academyPieceDetailInfo.share.toString()}
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
              number={data.academyPieceDetailInfo.comment.toString()}
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
              number={data.academyPieceDetailInfo.like.toString()}
              likeId={likeId}
              press={likePress({
                academyLike,
                order,
                token,
                likeId,
              })}
            />
            <OperationTrigger
              imageSource={require('../../../Image/Operation/revise.png')}
              have={data.academyPieceDetailInfo.revise}
              press={operationPress({ viewMode: 'revise' })}
            />
            <OperationTrigger
              imageSource={require('../../../Image/Operation/notes.png')}
              have={data.academyPieceDetailInfo.notes}
              press={operationPress({ viewMode: 'notes' })}
            />
        </View>
    );
};

OperationPanel.propTypes = {
    likeId: PropTypes.string.isRequired,
    imageSource: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    sharePress: PropTypes.func.isRequired,
    commentPress: PropTypes.func.isRequired,
    likePress: PropTypes.func.isRequired,
    operationPress: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
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
    operation: state.getIn(['academy', 'content', ownProps.order.toString(), 'operation']),
    imageSource: state.getIn(['academy', 'content', ownProps.order.toString(), 'operation', 'like', 'clicked']) ? require('../../../Image/Operation/likeAfter.png') : require('../../../Image/Operation/like.png'),
    text: state.getIn(['academy', 'content', ownProps.order.toString(), 'text']),
    token: state.getIn(['me', '我的信息', 'token']),
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
    likePress: ({ academyLike, token, likeId, order }) => async () => {
        this[likeId].swing(800);
        const response = await academyLike({ variables: { token, order, commentId: '' } });
        if (response.data.academyLike.finish) {
            Toast.success('点赞成功!');
        } else {
            Toast.fail('点赞失败，请检查网络！');
        }
    },
});

const queryOptions = {
    options: props => ({
        variables: {
            order: Number.parseInt(props.order, 10),
            token: '',
        },
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(compose(graphql(academyPieceDetailInfo, queryOptions), graphql(academyLike, { name: 'academyLike' }))(OperationPanel));
