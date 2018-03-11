import React from 'react';
import {
        StyleSheet,
        View,
        TouchableWithoutFeedback,
        Dimensions,
    } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');
const Menu = ({ visibility, showMenu }) => (
    <View style={styles.menu}>
        <TouchableWithoutFeedback onPress={showMenu}>
            <Animatable.Image transition="rotate" style={{ transform: [{ rotate: visibility ? '90deg' : '0deg' }], width: 30, height: 20, marginLeft: -10 }} source={require('../../../Image/Menu/menu.png')} />
        </TouchableWithoutFeedback>
    </View>
);

Menu.propTypes = {
    visibility: PropTypes.bool.isRequired,
    showMenu: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    menu: {
        width: width * 0.12,
        height: height * 0.075,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    visibility: state.getIn(['menu', 'visibility']),
});

const mapDispatchToProps = dispatch => ({
    showMenu: () =>
        dispatch({
            type: 'MENU_VISIBILITY',
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
