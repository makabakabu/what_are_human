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
import Content from './content';
import Footer from '../../Component/footer';
import Menu from './Drawer/menu';

const { height, width } = Dimensions.get('window');
const Plaza = ({ lock, title, visibility }) => (
    <DrawerLayout
      ref={(c) => { this.drawer = c; }}
      renderNavigationView={() => <Menu drawer={this.drawer} />}
      drawerWidth={width * 0.2}
      keyboardDismissMode="no-drag"
      drawerLockMode={lock}
    >
        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, backgroundColor: '#6a6a6a' }}>
            <Header title={title} />
            <View style={{ height: height * 0.925 }}>
                <View style={{ flex: 1 }}>
                    <Animatable.View transition="height" style={[styles.outline, { height: visibility ? 160 : 0, zIndex: 100 }]}>
                        <MenuPanel />
                    </Animatable.View>
                    <Content />
                    <Footer />
                </View>
            </View>
        </View>
    </DrawerLayout>
);

Plaza.propTypes = {
    lock: PropTypes.string.isRequired,
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
    title: state.getIn(['plaza', 'title']),
    lock: (state.getIn(['plaza', 'plazaName']) === 'main') ? 'locked-closed' : 'unlocked',
    visibility: state.getIn(['menu', 'visibility']),
});

export default connect(mapStateToProps)(Plaza);
