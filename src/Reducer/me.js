import { Map, List, OrderedMap } from 'immutable';
import moment from 'moment';
import uuidv4 from 'uuid';

const me = (state = {}, action) => {
    switch (action.type) {
        case 'ME_CHANGE_SECTION_VISIBILITY': {
            state = state.updateIn(['me', action.sectionName, 'visibility'], value => !value);
            return state;
        }

        case 'ME_RETURN':
            if (action.kind === 'academy') {
                state = state.set('viewMode', 'academy');
                state = state.setIn(['academy', 'viewMode'], 'section');
                return state.setIn(['academy', 'order'], state.getIn(['me', action.viewMode, action.meId, 'location', 'order']));
            }
            state = state.set('viewMode', 'plaza');
            state = state.setIn(['plaza', 'plazaName'], action.plazaName);
            state = state.setIn(['plaza', action.plazaName, 'viewMode'], 'discuss');
            return state.setIn(['plaza', action.plazaName, 'speechId'], action.speechId);

        case 'ME_ADD':
            switch (action.viewMode) {
                case '我的评论': {
                    const order = state.getIn(['academy', 'order']);
                    let comment = state.getIn(['academy', 'content', order, 'operation', 'comment', 'content']);
                    let location = Map({});
                    if (comment.last().get('recomment').size > 0) {
                        location = Map({
                            viewMode: 'recomment',
                            order,
                            commentId: List(comment.keySeq()).last(),
                            recommentId: List(comment.last().get('recomment').keySeq()).last(),
                        });
                        comment = Map({
                            userName: comment.last().get('recomment').last().get('userName'),
                            text: comment.last().get('recomment').last().get('text'),
                            time: moment().format('YYYY-MM-DD'),
                            location,
                        });
                    } else {
                        location = Map({
                            viewMode: 'comment',
                            order,
                            commentId: List(comment.keySeq()).last(),
                            recommentId: '',
                        });
                        comment = Map({
                            userName: comment.last().get('userName'),
                            text: comment.last().get('text'),
                            time: moment().format('YYYY-MM-DD'),
                            location,
                        });
                    }
                    return state.updateIn(['me', '我的评论'], myComment =>
                        myComment.concat(OrderedMap({ [uuidv4()]: comment })));
                    // 如果最后一条comment里面, recomment的长度为0，则为本体， 否则为最后一个recomment，
                }

                case '我的点赞': {
                    const order = state.getIn(['academy', 'order']);
                    let like = Map({});
                    if (action.location.get('viewMode') === 'like') {
                        like = Map({
                            userName: '微斯人',
                            text: '',
                            time: moment().format('YYYY-MM-DD'),
                            location: Map({
                                viewMode: 'main',
                                order,
                                commentId: '',
                            }),
                        });
                    } else {
                        const comment = state.getIn(['academy', 'content', order, 'operation', 'comment', 'content', action.location.get('commentId')]);
                        like = Map({
                            userName: comment.get('userName'),
                            text: comment.get('text'),
                            time: moment().format('YYYY-MM-DD'),
                            location: Map({
                                viewMode: 'comment',
                                order,
                                commentId: action.location.get('commentId'),
                            }),
                        });
                    }
                    const commentId = state.getIn(['me', '我的点赞']).findKey(value =>
                        value.get('location').equals(like.get('location')));
                    if (commentId) {
                        return state.deleteIn(['me', '我的点赞', commentId]);
                    }
                    return state.updateIn(['me', '我的点赞'], myLike =>
                        myLike.concat(OrderedMap({ [uuidv4()]: like })));
                }

                case '我的收藏': case '我的回复':
                    return state.updateIn(['me', action.viewMode], collect => collect.concat(OrderedMap({
                        [uuidv4()]: action.sourceDetail,
                    })));

                case '我的演讲': {
                    // 删除演讲中的东西，一到这里来
                    const plazaName = state.getIn(['plaza', 'plazaName']);
                    const speechId = state.getIn(['plaza', plazaName, 'speechId']);
                    const speechTitle = state.getIn(['plaza', plazaName, 'createSpeech', 'title']);
                    return state.updateIn(['me', '我的演讲'], speech => speech.concat(OrderedMap({
                        [uuidv4()]: Map({
                            speechTitle,
                            time: moment().format('YYYY-MM-DD hh:mm'),
                            location: Map({
                                plazaName,
                                speechId,
                            }),
                        }),
                    })));
                }

                default:
                    return state;
            }

        case 'ME_CHANGE_VIEWMODE':
            return state.setIn(['me', 'viewMode'], action.viewMode);

        case 'ME_DELETE':
            return state.deleteIn(['me', action.viewMode, action.id]);

        case 'ME_CHANGE_INFO':
            return state.setIn(['me', 'viewMode'], '修改密码');

        case 'ME_LOG_OFF':
            state = state.setIn(['me', '我的信息', 'gender'], '');
            state = state.setIn(['me', '我的信息', 'userName'], '');
            state = state.setIn(['me', '我的信息', 'passward'], '');
            state = state.set('viewMode', 'menu');
            state = state.setIn(['menu', 'backTo'], 'me');
            state = state.setIn(['menu', 'title'], '登陆');
            return state.setIn(['menu', 'viewMode'], 'signIn');

        case 'PASSWARD':
            return state.setIn(['me', '修改密码', action.kind], action.text);

        case 'CHANGE_PASSWARD_SUCCESS':
            if (action.kind === 'success') {
                state = state.setIn(['me', '我的信息', 'passward'], state.getIn(['me', '修改密码', 'passward']));
            }
            state = state.setIn(['me', '修改密码', 'oriPassward'], '');
            state = state.setIn(['me', '修改密码', 'passward'], '');
            state = state.setIn(['me', '修改密码', 'passwardRepeat'], '');
            return state;

        case 'ME_REGISTER': {
            const { register } = action;
            state = state.set('viewMode', 'me');
            state = state.setIn(['me', 'viewMode'], '我的信息');
            state = state.setIn(['me', '我的信息', 'gender'], register.get('gender'));
            state = state.setIn(['me', '我的信息', 'name'], register.get('name'));
            state = state.setIn(['me', '我的信息', 'passward'], register.get('passward'));
            console.log(register);
            return state;
        }

        default:
            return state;
    }
};

export default me;
