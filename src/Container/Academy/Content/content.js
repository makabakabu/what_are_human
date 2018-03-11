import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Main from './main';
import Section from './section';
import Operation from './operation';

const Content = ({ viewMode, sectionViewMode }) => {
    if (viewMode === 'main') {
        return <Main />;
    }
    if (sectionViewMode === 'main') {
        return <Section />;
    }
    return <Operation />;
};

Content.propTypes = {
    viewMode: PropTypes.string.isRequired,
    sectionViewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['academy', 'viewMode']),
    sectionViewMode: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'viewMode']),
});

export default connect(mapStateToProps)(Content);
