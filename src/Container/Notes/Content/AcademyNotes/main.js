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
import Piece from '../piece';
import generateColor from '../../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const Main = ({ notes, light }) => (
    // 主页面或者section页面
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <FlatList
          data={notes.map((value, key) => ({ key, title: value.get('title') })).valueSeq().toArray()}
          renderItem={({ item }) => <Piece key={item.key} notesId={item.key} title={item.title} />}
        />
    </View>
);

Main.propTypes = {
    notes: ImmutablePropTypes.map.isRequired,
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
    notes: state.getIn(['notes', 'academyNotes', 'notes']),
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Main);
