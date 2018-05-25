import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    Text,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Piece from './piece';
import generateColor from '../../../Action/generateColor';

const academyPieceBriefInfo = gql`
    query academyPieceBriefInfo {
        academyPieceBriefInfo {
            order,
            title,
        }
    }
`;

const { width, height } = Dimensions.get('window');
const Main = ({ data, light }) => {
    if (data.loading) {
        return (<View><Text>loading...</Text></View>);
    }
    return (
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
            <FlatList
              data={data.academyPieceBriefInfo.map(value => ({ key: value.order, title: value.title }))}
              renderItem={({ item }) => <Piece key={item.key} order={item.key} title={item.title} />}
            />
        </View>
    );
};

Main.propTypes = {
    data: PropTypes.object.isRequired,
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
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(graphql(academyPieceBriefInfo)(Main));
