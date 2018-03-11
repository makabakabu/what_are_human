import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { width } = Dimensions.get('window');
const Piece = ({ light, fontSize, order, title, press }) => (
    <TouchableOpacity onPress={press({ order })}>
        <View style={styles.main}>
            <View style={styles.text}>
                <Text style={[styles.title, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ `${order}  ${title}` }</Text>
                <Text style={styles.order}>〉</Text>
            </View>
            <View style={styles.seperator} />
        </View>
    </TouchableOpacity>
);

Piece.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    press: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: 80,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        height: 79,
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    order: {
        fontSize: 25,
        color: '#ededed',
        width: width * 0.2,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        width: width * 0.8,
        color: '#ededed',
    },
    seperator: {
        opacity: 0.5,
        width: width * 0.9,
        height: 1,
        backgroundColor: '#aaa',
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = dispatch => ({
    press: ({ order }) => () => {
        dispatch({
            type: 'ACADEMY_PIECE_2_SECTION',
            order,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Piece);
