import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Piece from './piece';
import generateColor from '../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const Main = ({ content, light }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <FlatList
          data={content.map((value, key) => ({ key, title: value.get('text').substring(0, 12) })).valueSeq().toArray()}
          renderItem={({ item }) => <Piece key={item.key} order={item.key} title={item.title} />}
        />
    </View>
);

Main.propTypes = {
    content: ImmutablePropTypes.map.isRequired,
    light: PropTypes.number.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
});

const mapStateToProps = state => ({
    content: state.getIn(['academy', 'content']),
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Main);
