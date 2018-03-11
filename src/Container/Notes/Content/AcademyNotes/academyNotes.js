import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Share from '../../../../Component/Content/OperationPanel/Operation/share';// share
import Main from './main';
import NoteDetail from '../noteDetail';

const AcademyNotes = ({ viewMode }) => {
    const contentNameMap = {
        main: Main,
        share: Share,
        noteDetail: NoteDetail,
    };
    const ContentName = contentNameMap[viewMode];
    return <ContentName />;
};

AcademyNotes.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['notes', 'academyNotes', 'viewMode']),
});

export default connect(mapStateToProps)(AcademyNotes);
