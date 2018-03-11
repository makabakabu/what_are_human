const menu = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_MENU_VIEWMODE': {
            const title = {
                signIn: '登陆',
                register: '注册',
                purchase: '购买',
                donate: '我要捐赠',
                pageSet: '页面设置',
                aboutUs: '关于我们',
                protocol: '微斯人APP用户协议与法律协议',
            };
            state = state.set('title', title[action.viewMode]);
            return state.set('viewMode', action.viewMode);
        }

        case 'MENU_VISIBILITY':
            return state.update('visibility', visibility => !visibility);

        case 'SIGNIN_CHANGE':
            return state.setIn(['signIn', action.viewMode], action.value);

        case 'REGISTER_CHANGE':
            return state.setIn(['register', action.viewMode], action.value);

        default:
            return state;
    }
};

export default menu;
