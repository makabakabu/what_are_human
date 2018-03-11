import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Piece from './piece';
import generateColor from '../../../Action/generateColor';
import CreateSpeechFooter from '../Footer.js/createSpeechFooter';

const { height, width } = Dimensions.get('window');
const Main = ({ content, light }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <FlatList
          data={content.map((value, key) => ({ key, value })).valueSeq().toArray()}
          renderItem={({ item }) => <Piece key={item.key} speechId={item.key} content={item.value} />}
        />
        <CreateSpeechFooter />
    </View>
);

Main.propTypes = {
    content: ImmutablePropTypes.map.isRequired,
    light: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    main: {
        height: height * 0.925,
        width,
        backgroundColor: '#6a6a6a',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        zIndex: -10,
    },
});

const mapStateToProps = state => ({
    plazaName: state.getIn(['plaza', 'plazaName']),
    content: state.getIn(['plaza', state.getIn(['plaza', 'plazaName']), 'content']),
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Main);
