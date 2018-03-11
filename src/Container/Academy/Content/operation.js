import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Share from '../../../Component/Content/OperationPanel/Operation/share';
import Comment from '../../../Component/Content/OperationPanel/Operation/Comment/comment';
import Revise from '../../../Component/Content/OperationPanel/Operation/revise';
import Notes from '../../../Component/Content/OperationPanel/Operation/notes';

const Operation = ({ viewMode }) => {
    const componentMap = {
        share: Share,
        comment: Comment,
        revise: Revise,
        notes: Notes,
    };
    const Component = componentMap[viewMode];
    return <Component />;
};

Operation.propTypes = {
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'operation', 'viewMode']),
});

export default connect(mapStateToProps)(Operation);
