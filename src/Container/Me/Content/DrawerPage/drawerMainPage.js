import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Piece from './piece';

const DrawerMainPage = ({ viewMode, meItem }) => (
    <FlatList
      data={meItem.map((value, key) => ({ key, value })).valueSeq().toArray()}
      renderItem={({ item }) => <Piece key={item.key} content={item.value} meId={item.key} viewMode={viewMode} />}
    />
);

DrawerMainPage.propTypes = {
    viewMode: PropTypes.string.isRequired,
    meItem: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => ({
    viewMode: state.getIn(['me', 'viewMode']),
    meItem: state.getIn(['me', state.getIn(['me', 'viewMode'])]),
});

export default connect(mapStateToProps)(DrawerMainPage);
