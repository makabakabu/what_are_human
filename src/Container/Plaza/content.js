import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './main';
import PlazaSquare from './PlazaSquare/plazaSquare';

const Content = ({ plazaName }) => {
    if (plazaName === 'main') {
        return <Main />;
    }
    return <PlazaSquare />;
};

Content.propTypes = {
    plazaName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    plazaName: state.getIn(['plaza', 'plazaName']),
});

export default connect(mapStateToProps)(Content);
