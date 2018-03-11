const pageSet = (state, action) => {
    switch (action.type) {
        case 'PAGE_SET_FONT_SIZE':
            return state.set('fontSize', action.size);

        case 'PAGE_SET_LIGHTNESS':
            return state.set('light', action.lightness);

        default:
            return state;
    }
};

export default pageSet;
