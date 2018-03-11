import { Map, List, OrderedMap } from 'immutable';
import moment from 'moment';
import uuidv4 from 'uuid';

const plaza = (state = {}, action) => {
    const plazaName = state.get('plazaName');
    const speechId = state.getIn([plazaName, 'speechId']);
    switch (action.type) {
        case 'PLAZA_CHOOSE_PLACE': {
            state = state.set('plazaName', action.plazaName);
            const title = {
                tiananmen: '天安门',
                freedom: '时代广场',
                france: '协和广场',
                russia: '红场',
                flyArea: '飞地微斯人',
            };
            state = state.set('title', title[action.plazaName]);
            return state.setIn([action.plazaName, 'viewMode'], 'main');
        }

        case 'SPEECH_DISCUSS':
            state = state.setIn([plazaName, 'viewMode'], 'discuss');
            state = state.set('title', state.getIn([plazaName, 'content', action.speechId, 'title']));
            return state.setIn([plazaName, 'speechId'], action.speechId);

        case 'CREATE_SPEECH':
            state = state.set('title', '创建演讲');
            return state.setIn([plazaName, 'viewMode'], 'createSpeech');

        case 'PLAZA_CHANGE_DISCUSS_VISIBILITY':
            return state.setIn([plazaName, 'content', speechId, 'discuss', 'visibility'], action.visibility);

        case 'PLAZA_DISCUSS_CHANGE_TEXT':
            return state.setIn([plazaName, 'content', speechId, 'discuss', 'location', 'text'], action.text);

        case 'PLAZA_DICUSS_COMFIRM': {
            const location = state.getIn([plazaName, 'content', speechId, 'discuss', 'location']);
            const to = location.get('discussId') === '' ? state.getIn([plazaName, 'content', speechId, 'userName']) : state.getIn([plazaName, 'content', speechId, 'discuss', 'content', location.get('time'), location.get('discussId'), 'userName']);
            const lastTime = List(state.getIn([plazaName, 'content', speechId, 'discuss', 'content']).keySeq()).last();
            const lastTimeArray = lastTime.split('-');
            if (Number(moment().format('YYYYMMDD')) > (Number(lastTimeArray[0]) * 10000) + (Number(lastTimeArray[1]) * 100) + Number(lastTimeArray[2])) {
                state = state.updateIn([plazaName, 'content', speechId, 'discuss', 'content'], content => content.concat(OrderedMap({
                    [moment().format('YYYY-MM-DD')]: OrderedMap({
                        [uuidv4()]: Map({
                            userName: action.userInfo.get('userName'),
                            gender: action.userInfo.get('gender'),
                            to,
                            text: location.get('text'),
                            time: moment().format('YYYY-MM-DD hh:mm'),
                        }),
                    }),
                })));
            } else {
                state = state.updateIn([plazaName, 'content', speechId, 'discuss', 'content', lastTime], content => content.concat(OrderedMap({
                    [uuidv4()]: Map({
                        userName: action.userInfo.get('userName'),
                        gender: action.userInfo.get('gender'),
                        to,
                        text: location.get('text'),
                        time: moment().format('YYYY-MM-DD hh:mm'),
                    }),
                })));
            }
            return state.setIn([plazaName, 'content', speechId, 'discuss', 'location'], Map({
                text: '',
                time: '',
                discussId: '',
            }));
        }

        case 'PLAZA_DISCUSS_PRESS_DIALOG':
            if (state.getIn([plazaName, 'content', speechId, 'discuss', 'location', 'discussId']) === action.discussId) {
                state = state.setIn([plazaName, 'content', speechId, 'discuss', 'location', 'discussId'], '');
            } else {
                state = state.setIn([plazaName, 'content', speechId, 'discuss', 'location', 'discussId'], action.discussId);
            }
            return state.setIn([plazaName, 'content', speechId, 'discuss', 'location', 'time'], action.time);

        case 'PLAZA_CREATESPEECH_PROTOCOL':
            state = state.set('title', '广场演讲发言公约');
            return state.setIn([plazaName, 'createSpeech', 'viewMode'], 'protocol');

        case 'PLAZA_CREATESPEECH_CHANGE_TEXT':
            return state.setIn([plazaName, 'createSpeech', 'text'], action.value);

        case 'PLAZA_CREATESPEECH_CHANGE_TITLE':
            return state.setIn([plazaName, 'createSpeech', 'title'], action.value);

        case 'PLAZA_CREATESPEECH_COMFIRM': {
            const createSpeechId = uuidv4();
            state = state.setIn([plazaName, 'content', createSpeechId], Map({
                userName: '我就是扯淡',
                gender: 'female',
                title: state.getIn([plazaName, 'createSpeech', 'title']),
                text: state.getIn([plazaName, 'createSpeech', 'text']),
                share: Map({
                    number: 0,
                }),
                collect: Map({
                    number: 0,
                }),
                discuss: Map({
                    visibility: false,
                    location: ({
                        time: '',
                        discussId: '',
                    }),
                    content: OrderedMap({}),
                }),
            }));
            state = state.setIn([plazaName, 'createSpeech', 'speechId'], createSpeechId);
            return state.setIn([plazaName, 'viewMode'], 'main');
        }

        case 'PLAZA_CREATESPEECH_CANCEL':
            state = state.setIn([plazaName, 'viewMode'], 'main');
            state = state.setIn([plazaName, 'createSpeech', 'title'], '');
            return state.setIn([plazaName, 'createSpeech', 'text'], '');

        case 'PLAZA_SPEECH_DELETE':
            return state.deleteIn([plazaName, 'content', action.speechId]);

        case 'PLAZA_SHARE_PRESS':
            return state.setIn([plazaName, 'viewMode'], 'share');

        case 'PLAZA_MOST': {
            const content = state.getIn([plazaName, 'content']);
            let mostSpeechId;
            switch (action.viewMode) {
                case '回复最多':
                    mostSpeechId = List(content.keySeq()).maxBy(speechContentId => content.getIn([speechContentId, 'discuss', 'content']).reduce((sum, review) => (sum + review.size), 0));
                    break;

                case '转发最多':
                    mostSpeechId = List(content.keySeq()).maxBy(speechContentId => content.getIn([speechContentId, 'share', 'number']));
                    break;

                case '收藏最多':
                    mostSpeechId = List(content.keySeq()).maxBy(speechContentId => content.getIn([speechContentId, 'collect', 'number']));
                    break;

                default:
                    break;
            }
            state = state.setIn([plazaName, 'viewMode'], 'discuss');
            return state.setIn([plazaName, 'speechId'], mostSpeechId);
        }

        default:
            return state;
    }
};

export default plaza;
