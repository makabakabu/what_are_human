const share = (state, action) => {
    switch (action.type) {
        case 'OPERATION_2_SHARE':
            state = state.set('source', action.source);
            return state.set(action.source, action.sourceDetail);

        case 'SHARE_CHANGE_TEXT':
            return state.setIn([state.get('source'), 'text'], action.value);

        default:
            return state;
    }
};

export default share;
