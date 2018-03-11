import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Share from '../../../../Component/Content/OperationPanel/Operation/share';// share
import Main from './main';
import Edit from './edit';
import NoteDetail from '../noteDetail';

const WinkThought = ({ viewMode }) => {
    const contentNameMap = {
        main: Main,
        share: Share,
        edit: Edit,
        noteDetail: NoteDetail,
    };
    const ContentName = contentNameMap[viewMode];
    return <ContentName />;
};

WinkThought.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['notes', 'winkThought', 'viewMode']),
});

export default connect(mapStateToProps)(WinkThought);
