import { List } from 'immutable';
import menu from './menu';
import academy from './academy';
import plaza from './plaza';
import news from './news';
import me from './me';
import notes from './notes';
import share from './share';
import pageSet from './pageSet';

const app = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_VIEWMODE': {
            const title = {
                academy: '学院',
                plaza: '广场',
                notes: '学院笔记',
            };
            if (['academy', 'plaza', 'notes'].includes(action.viewMode)) {
                state = state.setIn([action.viewMode, 'title'], title[action.viewMode]);
            }
            const isSignIn = state.getIn(['me', '我的信息', 'userName']) !== '';
            if (!isSignIn && ['notes', 'news', 'me'].includes(action.viewMode)) {
                state = state.set('viewMode', 'menu');
                state = state.setIn(['menu', 'backTo'], action.viewMode);
                return state.setIn(['menu', 'viewMode'], 'signIn');
            }
            switch (action.viewMode) {
                case 'home': {
                    state = state.set('viewMode', 'academy');
                    state = state.setIn(['academy', 'viewMode'], 'section');
                    const order = List(state.getIn(['academy', 'content']).keySeq()).last();
                    state = state.setIn(['academy', 'order'], order);
                    return state.setIn(['academy', 'content', order, 'viewMode'], 'main');
                }

                case 'academy':
                    state = state.set('viewMode', 'academy');
                    return state.setIn(['academy', 'viewMode'], 'main');

                case 'plaza':
                    state = state.set('viewMode', 'plaza');
                    return state.setIn(['plaza', 'plazaName'], 'main');

                case 'notes':
                    state = state.set('viewMode', 'notes');
                    state = state.setIn(['notes', 'academyNotes', 'viewMode'], 'main');
                    return state.setIn(['notes', 'viewMode'], 'academyNotes');

                case 'news':
                    state = state.set('viewMode', 'news');
                    return state.setIn(['news', 'viewMode'], '未读消息');

                case 'me':
                    state = state.set('viewMode', 'me');
                    return state.setIn(['me', 'viewMode'], '我的信息');

                case 'menu':
                    if (state.get('viewMode') !== 'menu') {
                        state = state.setIn(['menu', 'backTo'], state.get('viewMode'));
                    }
                    if (isSignIn && state.getIn(['menu', 'viewMode']) === 'signIn') {
                        state = state.setIn(['me', 'viewMode'], '我的信息');
                        return state.set('viewMode', 'me');
                    }
                    return state.set('viewMode', 'menu');

                default:
                    return state;
            }
        }

        case 'BACK':
            switch (state.get('viewMode')) {
                case 'academy': {
                // section, main -> main, share, revise, notes -> 第二层 main
                    const artical = state.getIn(['academy', 'content', state.getIn(['academy', 'order'])]);
                    state = state.setIn(['academy', 'title'], '学院');
                    if (artical.get('viewMode') === 'main' || artical.getIn(['operation', 'viewMode']) === 'comment') {
                        return state.setIn(['academy', 'viewMode'], 'main');
                    }
                    return state.setIn(['academy', 'content', state.getIn(['academy', 'order']), 'viewMode'], 'main');
                }

                case 'notes': {
                    // academyNotes: notesDetail -> main, share -> notesDetail,
                    // winkThought: notesDetail, eidt -> main, share -> notesDetail, edit -> main
                    const notesMap = {
                        academyNotes: '学院笔记',
                        winkThought: '思维碎片',
                    };
                    const notesViewMode = state.getIn(['notes', 'viewMode']);
                    if (state.getIn(['notes', notesViewMode, 'viewMode']) === 'noteDetail') {
                        state = state.setIn(['notes', 'title'], notesMap[notesViewMode]);
                        return state.setIn(['notes', notesViewMode, 'viewMode'], 'main');
                    }
                    const notesId = state.getIn(['notes', notesViewMode, 'notesId']);
                    state = state.setIn(['notes', 'title'], state.getIn(['notes', notesViewMode, 'notes', notesId, 'title']));
                    return state.setIn(['notes', notesViewMode, 'viewMode'], 'noteDetail');
                }

                case 'plaza': {
                    const title = {
                        tiananmen: '天安门',
                        freedom: '时代广场',
                        france: '协和广场',
                        russia: '红场',
                        flyArea: '飞地微斯人',
                    };
                    const plazaName = state.getIn(['plaza', 'plazaName']);
                    // main -> plazaName: main, createSpeech, createSpeech: main || share || discuss -> main,
                    // createSpeech, createSpeech: protocal -> main,
                    const viewMode = state.getIn(['plaza', plazaName, 'viewMode']);
                    if (viewMode === 'main') {
                        state = state.setIn(['plaza', 'title'], '广场');
                        return state.setIn(['plaza', 'plazaName'], 'main');
                    }
                    if (viewMode === 'createSpeech' && state.getIn(['plaza', plazaName, 'createSpeech', 'viewMode']) === 'protocol') {
                        state = state.setIn(['plaza', 'title'], '创建演讲');
                        return state.setIn(['plaza', plazaName, 'createSpeech', 'viewMode'], 'main');
                    }
                    state = state.setIn(['plaza', 'title'], title[plazaName]);
                    return state.setIn(['plaza', plazaName, 'viewMode'], 'main');
                }

                case 'news':
                    return state.setIn(['news', 'viewMode'], '未读消息');

                case 'me':
                    return state.setIn(['me', 'viewMode'], '我的信息');

                case 'menu': {
                    const isSignIn = state.getIn(['me', '我的信息', 'userName']) !== '';
                    if (!isSignIn && ['notes', 'news', 'me'].includes(state.getIn(['menu', 'backTo']))) {
                        state = state.set('viewMode', 'menu');
                        state = state.setIn(['menu', 'title'], '登陆');
                        return state.setIn(['menu', 'viewMode'], 'signIn');
                    }
                    if (state.getIn(['menu', 'viewMode']) === 'register') {
                        state = state.setIn(['menu', 'viewMode'], 'signIn');
                        state = state.setIn(['menu', 'title'], '登陆');
                    } else if (state.getIn(['menu', 'viewMode']) === 'protocol') {
                        state = state.setIn(['menu', 'viewMode'], 'register');
                        state = state.setIn(['menu', 'title'], '注册');
                    }
                    return state.set('viewMode', state.getIn(['menu', 'backTo']));
                }

                default:
                    return state;
            }

        default:
            state = state.update('academy', value => academy(value, action));
            state = state.update('menu', value => menu(value, action));
            state = state.update('plaza', value => plaza(value, action));
            state = state.update('share', value => share(value, action));
            state = state.update('pageSet', value => pageSet(value, action));
            state = state.update('news', value => news(value, action));
            state = me(state, action);
            state = notes(state, action);
            return state;
    }
};

export default app;
