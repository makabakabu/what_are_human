import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
  } from 'react-native';
import { Map } from 'immutable';
import uuidv4 from 'uuid';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';
import OperationTrigger from '../../operationTrigger';
import Recomment from './recomment';
import generateSize from '../../../../../Action/generateSize';
import generateColor from '../../../../../Action/generateColor';

const { width } = Dimensions.get('window');
const commentContainer = ({ likeId, light, fontSize, content, commentId, likePress, commentPress, likeImageSource, portraitImageSource }) => (
    <View style={styles.main} >
        <View style={styles.logo}>
            <Image style={{ width: 30, height: 40 }} source={portraitImageSource} />
        </View>
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#aaa' }}>{ content.get('userName') }</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width * 0.2, height: 20 }}>
                    <OperationTrigger
                      imageSource={likeImageSource}
                      number={content.getIn(['like', 'number']).toString()}
                      likeId={likeId}
                      press={likePress({
                          likeId,
                          location: Map({
                            viewMode: 'commentLike',
                            commentId,
                            }),
                        })}
                    />
                    <OperationTrigger
                      imageSource={require('../../../../../Image/Operation/comment.png')}
                      number={content.get('recomment').size.toString()}
                      press={commentPress({
                          location: Map({
                            viewMode: 'comment',
                            text: '',
                            commentId,
                            recommentId: '',
                          }),
                        })}
                    />
                </View>
            </View>
            <Text style={{ color: '#aaa' }}>{ content.get('time') } </Text>
            <Text style={{ fontSize: generateSize(fontSize, 18), color: `#${generateColor(166, 216, light)}`, marginBottom: 10, marginTop: 5 }}>{ content.get('text') }</Text>
            <Collapsible collapsed={!content.get('visibility')}>
                <FlatList
                  data={content.get('recomment').map((value, key) =>
                        ({ key, value })).valueSeq().toArray()}
                  renderItem={({ item }) => <Recomment key={uuidv4()} content={item.value} commentId={commentId} recommentId={item.key} contentUserName={content.get('userName')} />}
                />
            </Collapsible>
            <View style={{ height: 1, width: 0.6 * width, backgroundColor: '#aaa' }} />
        </View>
    </View>
);

commentContainer.propTypes = {
    likeId: PropTypes.string.isRequired,
    portraitImageSource: PropTypes.number.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    content: ImmutablePropTypes.map.isRequired,
    commentId: PropTypes.string.isRequired,
    likeImageSource: PropTypes.number.isRequired,
    likePress: PropTypes.func.isRequired,
    commentPress: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width: 0.8 * width,
        flexDirection: 'row',
        marginTop: 10,
    },
    logo: {
        width: 0.25 * width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state, ownProps) => ({
    likeId: uuidv4(),
    portraitImageSource: ownProps.content.get('gender') === 'male' ? require('../../../../../Image/Menu/male.png') : require('../../../../../Image/Menu/female.png'),
    likeImageSource: ownProps.content.getIn(['like', 'clicked']) ? require('../../../../../Image/Operation/likeAfter.png') : require('../../../../../Image/Operation/like.png'),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(commentContainer);
