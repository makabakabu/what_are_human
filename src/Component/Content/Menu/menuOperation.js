import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import MenuPanel from '../../Header/Menu/menuPanel';
import Header from '../../Header/header';
import Content from './content';
import Footer from '../../footer';

const { height } = Dimensions.get('window');
const MenuOperation = ({ title, visibility }) => (
    <View style={{ flex: 1 }}>
        <Header title={title} />
        <View style={{ flex: 1 }}>
            <Content />
            <Animatable.View transition="height" style={[styles.outline, { height: visibility ? 160 : 0, zIndex: 100 }]}>
                <MenuPanel />
            </Animatable.View>
            <Footer />
        </View>
    </View>
);

MenuOperation.propTypes = {
    title: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    outline: {
        position: 'absolute',
        right: 7,
        top: height * 0.01,
        width: 130,
        height: height * 0.075,
        overflow: 'hidden',
    },
});

const mapStateToProps = state => ({
    title: state.getIn(['menu', 'title']),
    visibility: state.getIn(['menu', 'visibility']),
});

export default connect(mapStateToProps)(MenuOperation);
