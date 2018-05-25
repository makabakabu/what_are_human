import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
  } from 'react-native';
import { connect } from 'react-redux';
import DrawerLayout from 'react-native-drawer-layout';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import MenuPanel from '../../Component/Header/Menu/menuPanel';
import Header from '../../Component/Header/header';
import Content from './Content/content';
import Footer from '../../Component/footer';
import Menu from './Drawer/menu';

const { width, height } = Dimensions.get('window');
const Academy = ({ title, visibility }) => (
    <DrawerLayout
      ref={(ref) => { this.drawer = ref; }}
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

Academy.propTypes = {
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
    title: state.getIn(['academy', 'title']),
    visibility: state.getIn(['menu', 'visibility']),
});

export default connect(mapStateToProps)(Academy);
