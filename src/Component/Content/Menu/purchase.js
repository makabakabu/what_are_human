import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const Purchase = ({ light }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <View style={styles.imageContainer}>
            <Image style={{ height: 0.08 * height, width: 0.12 * width }} source={require('../../../Image/Menu/Purchase/tmall.png')} />
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../../Image/Menu/Purchase/jd.png')} />
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../../Image/Menu/Purchase/dangdang.png')} />
        </View>
        <View style={styles.imageContainer}>
            <Image style={{ width: 0.2 * width, height: 0.05 * height }} source={require('../../../Image/Menu/Purchase/amazon.png')} />
        </View>
    </View>
);

Purchase.propTypes = {
    light: PropTypes.number.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        paddingTop: height * 0.1,
        backgroundColor: '#6d6d6d',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: -10,
        alignItems: 'center',

    },
    imageContainer: {
        width: 0.5 * width,
        height: 0.3 * height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 0.1 * height,
        width: 0.15 * width,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Purchase);
