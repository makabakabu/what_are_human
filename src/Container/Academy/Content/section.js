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
import OperationPanel from '../../../Component/Content/OperationPanel/operationPanel';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const Main = ({ text, order, light, fontSize }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled >
            <Text style={[styles.text, { fontSize: generateSize(fontSize, 20), color: `#${generateColor(166, 216, light)}` }]}>
                { text }
            </Text>
            <OperationPanel order={order} />
        </ScrollView>
    </View>
);

Main.propTypes = {
    text: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
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
    text: state.getIn(['academy', 'content', state.getIn(['academy', 'order']), 'text']),
    order: state.getIn(['academy', 'order']),
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

export default connect(mapStateToProps)(Main);
