import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './main';
import Protocol from './protocol';

const CreateSpeech = ({ viewMode }) => {
    if (viewMode === 'main') {
        return <Main />;
    }
    return <Protocol />;
};

CreateSpeech.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['plaza', state.getIn(['plaza', 'plazaName']), 'createSpeech', 'viewMode']),
});

export default connect(mapStateToProps)(CreateSpeech);
