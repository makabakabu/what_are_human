import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignIn from './signIn';
import Register from './register';
import Protocol from './protocol';
import Purchase from './purchase';
import PageSet from './pageSet';
import Donate from './donate';
import AboutUs from './aboutUs';

const Content = ({ viewMode }) => {
    const componentMap = {
        signIn: SignIn,
        register: Register,
        protocol: Protocol,
        purchase: Purchase,
        pageSet: PageSet,
        donate: Donate,
        aboutUs: AboutUs,
    };
    const Component = componentMap[viewMode];
    return <Component />;
};

Content.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['menu', 'viewMode']),
});

export default connect(mapStateToProps)(Content);
