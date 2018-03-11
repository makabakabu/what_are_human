import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DrawerLayout from 'react-native-drawer-layout';
import * as Animatable from 'react-native-animatable';
import MenuPanel from '../../Component/Header/Menu/menuPanel';
import Header from '../../Component/Header/header';
import Content from './Content/content';
import Footer from '../../Component/footer';
import Menu from './Drawer/menu';

const { width, height } = Dimensions.get('window');
const Me = ({ title, visibility }) => (
    <DrawerLayout
      ref={(c) => { this.drawer = c; }}
      renderNavigationView={() => <Menu drawer={this.drawer} />}
      drawerWidth={width * 0.2}
      keyboardDismissMode="no-drag"
    >
        <View style={{ flex: 1 }}>
            <Header title={title} />
            <View style={{ flex: 1 }}>
                <Animatable.View transition="height" style={[styles.outline, { height: visibility ? 160 : 0, zIndex: 100 }]}>
                    <MenuPanel />
                </Animatable.View>
                <Content />
                <Footer />
            </View>
        </View>
    </DrawerLayout>
);

Me.propTypes = {
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
    isSignIn: state.getIn(['me', '我的信息', 'name']) !== '',
    title: state.getIn(['me', 'viewMode']),
    visibility: state.getIn(['menu', 'visibility']),
});

export default connect(mapStateToProps)(Me);
