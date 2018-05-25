import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import OperationPanel from '../../../Component/Content/OperationPanel/operationPanel';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const academyPieceDetailInfo = gql`
    query academyPieceDetailInfo ($order: Int!, $token: String!) {
        academyPieceDetailInfo (order: $order, token: $token) {
            text
            share
            like
            likeClick
            comment
            revise
            notes
        }
    }
`;

const { height, width } = Dimensions.get('window');
const Main = ({ data, order, light, fontSize }) => {
    if (data.loading) {
        return (<View><Text>loading...</Text></View>);
    }
    return (
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled >
                <Text style={[styles.text, { fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }]}>
                    { data.academyPieceDetailInfo.text }
                </Text>
                <OperationPanel order={order} />
            </ScrollView>
        </View>
    );
};

Main.propTypes = {
    data: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    text: {
        width: width * 0.9,
        color: 'white',
        marginTop: 30,
        lineHeight: 30,
    },
});

const mapStateToProps = state => ({
    order: Number.parseInt(state.getIn(['academy', 'order']), 10),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const queryOptions = {
    options: ({ order }) => ({
        variables: {
            order,
            token: '',
        },
    }),
};

export default connect(mapStateToProps)(graphql(academyPieceDetailInfo, queryOptions)(Main));
