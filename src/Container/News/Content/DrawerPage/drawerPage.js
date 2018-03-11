import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Piece from './piece';

const DrawerPage = ({ newsItem, viewMode }) => (
    <FlatList
      data={[...newsItem.filter(value => !value.get('read'))
                                    .map((value, key) => ({ key, value }))
                                        .valueSeq()
                                            .toArray(),
                            ...newsItem.filter(value => value.get('read'))
                                    .map((value, key) => ({ key, value }))
                                        .valueSeq()
                                            .toArray()]}
      renderItem={({ item }) => <Piece key={item.key} content={item.value} newsId={item.key} viewMode={viewMode} />}
    />
);

DrawerPage.propTypes = {
    newsItem: ImmutablePropTypes.map.isRequired,
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    newsItem: state.getIn(['news', ownProps.viewMode]),
});

export default connect(mapStateToProps)(DrawerPage);
