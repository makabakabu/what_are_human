import { OrderedMap, Map, List } from 'immutable';
import moment from 'moment';
import uuidv4 from 'uuid';

const academy = (state = {}, action) => {
    const order = state.get('order');
    switch (action.type) {
        // operation handler start
        case 'OPERATION_PRESS':
            state = state.setIn(['content', order, 'viewMode'], 'operation');
            return state.setIn(['content', order, 'operation', 'viewMode'], action.viewMode);

        case 'OPERATION_COMMENT_PRESS':
            state = state.setIn(['content', order, 'viewMode'], 'operation');
            state = state.setIn(['content', order, 'operation', 'viewMode'], 'comment');
            if (action.location.get('viewMode') === 'comment') {
                state = state.updateIn(['content', order, 'operation', 'comment', 'content', action.location.get('commentId'), 'visibility'], visibility => !visibility);
            }
            return state.setIn(['content', order, 'operation', 'comment', 'location'], action.location);

        case 'OPERATION_LIKE_PRESS':
            if (action.location.get('viewMode') === 'like') { // location: viewMode commentId
                state = state.updateIn(['content', order, 'operation', 'like'], (like) => {
                    like = like.update('clicked', clicked => !clicked);
                    like = like.update('number', value => (like.get('clicked') ? value + 1 : value - 1));
                    return like;
                });
            } else {
                state = state.updateIn(['content', order, 'operation', 'comment', 'content', action.location.get('commentId'), 'like'], (like) => {
                    like = like.update('clicked', clicked => !clicked);
                    like = like.update('number', value => (like.get('clicked') ? value + 1 : value - 1));
                    return like;
                });
                const clicked = state.getIn(['content', order, 'operation', 'comment', 'content', action.location.get('commentId'), 'like', 'clicked']);
                state = state.updateIn(['content', order, 'operation', 'like', 'number'], value => (clicked ? value + 1 : value - 1));
            }
            return state;
        // end of operation handler

        // start of revise
        case 'ACADEMY_REVISE_COMFIRM':
            return state.setIn(['content', order, 'viewMode'], 'main');

        case 'ACADEMY_CHANGE_REVISE_TEXT':
            return state.setIn(['content', order, 'operation', 'revise'], action.value);
        // end of revise

        // start of notes
        case 'ACADEMY_NOTES_CHANGE_TEXT':
            return state.setIn(['content', order, 'operation', 'notes', 'text'], action.notes);

        case 'ACADEMY_NOTES_CHANGE_TITLE':
            return state.setIn(['content', order, 'operation', 'notes', 'title'], action.title);

        case 'ACADEMY_NOTES_COMFIRM':
            return state.setIn(['content', order, 'viewMode'], 'main');
        // end of notes

        // academy share start
        case 'ACADEMY_SHARE_COMFIRM':
            return state.set('viewMode', 'main');
        // academy share end

        case 'ACADEMY_COMMENT_TEXTCHANGE':
            return state.setIn(['content', order, 'operation', 'comment', 'location', 'text'], action.value);

        case 'ACADEMY_PIECE_2_SECTION':
            state = state.set('viewMode', 'section');
            state = state.set('order', action.order);
            return state.setIn(['content', action.order, 'viewMode'], 'main');

        case 'ACADEMY_COMMENT_COMFIRM': {
            const location = state.getIn(['content', order, 'operation', 'comment', 'location']);
            switch (location.get('viewMode')) {
                case 'main':
                    state = state.updateIn(['content', order, 'operation', 'comment', 'content'], value => value.concat(OrderedMap({
                            [uuidv4()]: Map({
                                userName: '我就是扯淡',
                                gender: 'female',
                                text: location.get('text'),
                                time: moment().format('YYYY-MM-DD hh:mm'),
                                like: Map({
                                    number: 0,
                                    clicked: false,
                                }),
                                recomment: OrderedMap({}),
                            }),
                        })));
                    break;

                case 'comment': {
                    const to = state.getIn(['content', order, 'operation', 'comment', 'content', location.get('commentId'), 'userName']);
                    state = state.updateIn(['content', order, 'operation', 'comment', 'content', location.get('commentId'), 'recomment'], value => value.concat(OrderedMap({
                        [uuidv4()]: Map({
                            userName: '我就是扯淡',
                            gender: 'female',
                            to,
                            text: location.get('text'),
                            time: moment().format('YYYY-MM-DD hh:mm'),
                        }) })));
                    break;
                }

                case 'recomment': {
                    const to = state.getIn(['content', order, 'operation', 'comment', 'content', location.get('commentId'), 'recomment', location.get('recommentId'), 'userName']);
                    state = state.updateIn(['content', order, 'operation', 'comment', 'content', location.get('commentId'), 'recomment'], value => value.concat(OrderedMap({
                        [uuidv4()]: Map({
                            userName: '我就是扯淡',
                            gender: 'female',
                            to,
                            text: location.get('text'),
                            time: moment().format('YYYY-MM-DD hh:mm'),
                        }) })));
                    break;
                }

                default:
                    break;
            }
            return state.setIn(['content', order, 'operation', 'comment', 'location', 'text'], '');
        }

        case 'ACADEMY_SELECT_MOST': {
            const content = state.get('content');
            let mostOrder;
            switch (action.viewMode) {
                case '评论最多':
                    mostOrder = List(content.keySeq()).maxBy(contentOrder => content.getIn([contentOrder, 'operation', 'comment', 'content']).reduce((sum, comment) => (sum + 1 + comment.get('recomment').size), 0));
                    break;

                case '转发最多':
                    mostOrder = List(content.keySeq()).maxBy(contentOrder => content.getIn([contentOrder, 'operation', 'share', 'number']));
                    break;

                case '点赞最多':
                    mostOrder = List(content.keySeq()).maxBy(contentOrder => content.getIn([contentOrder, 'operation', 'like', 'number']));
                    break;

                default:
                    break;
            }
            state = state.set('viewMode', 'section');
            state = state.set('order', mostOrder);
            return state.setIn(['content', mostOrder, 'viewMode'], 'main');
        }

        default:
            return state;
    }
};

export default academy;
