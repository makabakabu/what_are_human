import { Map, OrderedMap } from 'immutable';
import uuidv4 from 'uuid';
import moment from 'moment';

const notes = (state = {}, action) => {
    const notesViewMode = state.getIn(['notes', 'viewMode']);
    switch (action.type) {
        case 'NOTES_VIEWMODE':
            switch (action.viewMode) {
                case '学院笔记':
                    state = state.setIn(['notes', 'viewMode'], 'academyNotes');
                    return state.setIn(['notes', 'academyNotes', 'viewMode'], 'main');

                case '思维碎片':
                    state = state.setIn(['notes', 'viewMode'], 'winkThought');
                    return state.setIn(['notes', 'winkThought', 'viewMode'], 'main');

                case '闪念捕捉': {
                    const notesId = uuidv4();
                    state = state.setIn(['notes', 'title'], '闪念捕捉');
                    state = state.setIn(['notes', 'viewMode'], 'winkThought');
                    state = state.updateIn(['notes', 'winkThought', 'notes'], value => value.concat(OrderedMap({ [notesId]: Map({
                        title: '',
                        text: '',
                        time: moment().format('YYYY-MM-DD hh:mm'),
                    }) })));
                    state = state.setIn(['notes', 'winkThought', 'notesId'], notesId);
                    return state.setIn(['notes', 'winkThought', 'viewMode'], 'edit');
                }

                default:
                    return state;
            }

        case 'NOTES_DELETE':
            return state.deleteIn(['notes', state.getIn(['notes', 'viewMode']), 'notes', action.notesId]);

        case 'NOTES_CREATE_ACADEMYNOTES': {
            // get the academyNotes
            // concat to the academyNotes
            const academyNotes = state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'operation', 'notes']);
            if (!state.getIn(['notes', 'academyNotes', 'notes']).find(value => value.get('order') === state.getIn(['academy', 'order']))) {
                return state.updateIn(['notes', 'academyNotes', 'notes'], value =>
                value.concat(OrderedMap({ [uuidv4()]: Map({
                        title: academyNotes.get('title'),
                        text: academyNotes.get('text'),
                        order: state.getIn(['academy', 'order']),
                        time: moment().format('YYYY-MM-DD hh:mm'),
                    }) })));
            }
            const orderId = state.getIn(['notes', 'academyNotes', 'notes']).findKey(value => value.get('order') === state.getIn(['academy', 'order']));
            return state.setIn(['notes', 'academyNotes', 'notes', orderId], Map({
                    title: academyNotes.get('title'),
                    text: academyNotes.get('text'),
                    order: state.getIn(['academy', 'order']),
                    time: moment().format('YYYY-MM-DD hh:mm'),
                    }));
        }

        case 'WINKTHOUGHT_EDIT_COMFIRM':
            state = state.setIn(['notes', 'title'], action.title);
            return state.setIn(['notes', 'winkThought', 'viewMode'], 'noteDetail');

        case 'NOTES_SHARE_PRESS':
            return state.setIn(['notes', notesViewMode, 'viewMode'], 'share');

        case 'NOTES_CHANGE_TITLE':
            state = state.setIn(['notes', 'winkThought', 'notes', action.notesId, 'time'], moment().format('YYYY-MM-DD hh:mm'));
            return state.setIn(['notes', 'winkThought', 'notes', action.notesId, 'title'], action.value);

        case 'NOTES_CHANGE_TEXT':
            state = state.setIn(['notes', 'winkThought', 'notes', action.notesId, 'time'], moment().format('YYYY-MM-DD hh:mm'));
            return state.setIn(['notes', 'winkThought', 'notes', action.notesId, 'text'], action.value);

        case 'NOTES_ACADEMYNOTES_EDIT':// 分两种可能性，如果是notes则跳转到academy,否则在notesli mian
            state = state.set('viewMode', 'academy');
            state = state.setIn(['academy', 'viewMode'], 'section');
            state = state.setIn(['academy', 'order'], action.order);
            state = state.setIn(['academy', 'content', action.order, 'viewMode'], 'operation');
            state = state.setIn(['academy', 'content', action.order, 'operation', 'viewMode'], 'notes');
            return state.setIn(['academy', 'content', action.order, 'operation', 'notes'], Map({ title: action.title, text: action.text }));

        case 'NOTES_WINKTHOUGHT_EDIT':
            state = state.setIn(['notes', 'title'], action.title);
            state = state.setIn(['notes', 'winkThought', 'viewMode'], 'edit');
            return state.setIn(['notes', 'winkThought', 'notesId'], action.notesId);

        case 'NOTES_CHECK': {
        // get the order of the artical
            const order = state.getIn(['notes', 'academyNotes', 'notes', action.contentName, 'order']);
            state = state.set('viewMode', 'academy');
            state = state.setIn(['academy', 'viewMode'], 'main');
            return state.setIn(['academy', 'order'], order);
        }

        case 'NOTES_PIECE_2_DETAIL':
            // 改变对应的 title， viewMode， contentName
            state = state.setIn(['notes', 'title'], action.title);
            state = state.setIn(['notes', action.viewMode, 'viewMode'], 'noteDetail');
            return state.setIn(['notes', action.viewMode, 'notesId'], action.notesId);

        default:
            return state;
    }
};

export default notes;
