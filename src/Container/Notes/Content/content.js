import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AcademyNotes from './AcademyNotes/academyNotes';
import WinkThought from './WinkThought/winkThought';

const Content = ({ viewMode }) => {
    // viewMode有两种Academy, winkThought
    if (viewMode === 'academyNotes') {
        return <AcademyNotes />;
    }
    return <WinkThought />;
};

Content.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['notes', 'viewMode']),
});

export default connect(mapStateToProps)(Content);
