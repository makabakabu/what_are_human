import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './main';
import Discuss from './Discuss/discuss';
import Share from '../../../Component/Content/OperationPanel/Operation/share';
import CreateSpeech from './CreateSpeech/createSpeech';

const PlazaSquare = ({ viewMode }) => {
    const componentMap = {
        main: Main,
        discuss: Discuss,
        share: Share,
        createSpeech: CreateSpeech,
    };
    const Component = componentMap[viewMode];
    return <Component />;
};

PlazaSquare.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['plaza', state.getIn(['plaza', 'plazaName']), 'viewMode']),
});

export default connect(mapStateToProps)(PlazaSquare);
