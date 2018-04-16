import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DrawerMainPage from './DrawerPage/drawerMainPage';
import PersonalInformation from './PersonalInformation/personalInformation';
import ChangePassword from './PersonalInformation/changePassword';
import generateColor from '../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const Content = ({ light, viewMode, Component }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        { (viewMode !== '我的信息' && viewMode !== '修改密码') ?
            <DrawerMainPage /> :
            <Component />}
    </View>
);

Content.propTypes = {
    light: PropTypes.number.isRequired,
    viewMode: PropTypes.string.isRequired,
    Component: PropTypes.func,
};

Content.defaultProps = {
    Component: () => <View />,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    const componentMap = {
        我的信息: PersonalInformation,
        修改密码: ChangePassword,
    };
    const viewMode = state.getIn(['me', 'viewMode']);
    return {
        viewMode,
        Component: componentMap[viewMode],
        light: state.getIn(['pageSet', 'light']),
    };
};

export default connect(mapStateToProps)(Content);
