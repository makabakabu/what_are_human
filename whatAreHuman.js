import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Academy from './src/Container/Academy/academy';
import Notes from './src/Container/Notes/notes';
import Plaza from './src/Container/Plaza/plaza';
import News from './src/Container/News/news';
import Me from './src/Container/Me/me';
import MenuOperation from './src/Component/Content/Menu/menuOperation';
// import Holder from './src/Container/Home/holder';
const WhatAreHuman = ({ Component }) => <Component />;

WhatAreHuman.propTypes = {
    Component: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const viewMode = state.get('viewMode');
    const componentMap = {
        academy: Academy,
        notes: Notes,
        plaza: Plaza,
        news: News,
        me: Me,
        menu: MenuOperation,
        isLoad: state.getIn(['academy', 'content']).size > 0,
    };
    return {
        Component: componentMap[viewMode],
    };
};
// 判断是否为第一次,是否为第一次load

export default connect(mapStateToProps)(WhatAreHuman);
