import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const Donate = ({ light }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={64}>
            <View style={{ width, alignItems: 'center' }}>
                <Image style={[styles.logo, { marginTop: height * 0.07 }]} source={require('../../../Image/earthPlaza.gif')} />
                <Text style={styles.logoText}>微斯人，吾谁与归？</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.pay} source={require('../../../Image/Menu/donate/pay.png')} />
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>
);

Donate.propTypes = {
    light: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    logo: {
        width: width * 0.12,
        height: height * 0.05,
        marginTop: '5%',
    },
    logoText: {
        color: 'white',
        fontSize: 12,
        marginTop: 8,
    },
    pay: {
        width: 166,
        height: 200,
        marginTop: 0.1 * height,
        marginRight: 0.05 * width,
        marginLeft: 0.05 * width,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Donate);
