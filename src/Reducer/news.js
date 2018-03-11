const news = (state = {}, action) => {
    switch (action.type) {
        case 'NEWS_VIEWMODE':
            return state.set('viewMode', action.viewMode);

        case 'NEWS_DELETE':
            return state.deleteIn([action.viewMode, action.newsId]);

        default:
            return state;
    }
};

export default news;
