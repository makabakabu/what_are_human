import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from './Menu/menu';
import generateColor from '../../Action/generateColor';
import generateSize from '../../Action/generateSize';
// 给每一个页面编号
// 1.所有页面分一个大类，包括， menu, home, academy, notes, plaza, news, me
// menu -> viewMode (signIn, regsiter, protocol, purchase, pageSet, donate, aboutUs)
// home
// academy -> viewMode (main, )

const { height, width } = Dimensions.get('window');
const Header = ({ light, fontSize, title, canBack, onPressTitle, pressBack }) => (
    <View style={[styles.capital, { backgroundColor: `#${generateColor(166, 216, light)}` }]} >
        <StatusBar hidden />
        <TouchableOpacity onPress={pressBack} >
            <View style={{ width: width * 0.12, height: height * 0.075, justifyContent: 'center', alignItems: 'flex-end' }}>
                { canBack && <Image style={{ width: 22, height: 18 }} source={require('../../Image/Menu/back.png')} /> }
            </View>
        </TouchableOpacity>
        <Text onPress={onPressTitle} style={[styles.capitalTitle, { color: `#${generateColor(50, 109, light)}`, fontSize: generateSize(fontSize, 20) }]}>{ title }</Text>
        <Menu />
    </View>
);

Header.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    canBack: PropTypes.bool.isRequired,
    onPressTitle: PropTypes.func.isRequired,
    pressBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    capital: {
        width,
        height: height * 0.075,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        shadowColor: '#333',
        shadowOffset: { width: 2,
                        height: 2 },
        shadowOpacity: 0.7,
        zIndex: 10,
    },
    capitalTitle: {
        width: width * 0.76,
        color: '#8f8f8f',
        fontSize: 20,
        textAlign: 'center',
    },
  });

const mapStateToProps = (state) => {
    let canBack = true;
    switch (state.get('viewMode')) {
        case 'academy':
            if (state.getIn(['academy', 'viewMode']) === 'main') {
                canBack = false;
            }
            break;

        case 'plaza':
            if (state.getIn(['plaza', 'plazaName']) === 'main') {
                canBack = false;
            }
            break;

        case 'notes': {
            const notesViewMode = state.getIn(['notes', 'viewMode']);
            if (state.getIn(['notes', notesViewMode, 'viewMode']) === 'main') {
                canBack = false;
            }
            break;
        }

        case 'news':
            if (state.getIn(['news', 'viewMode']) === '未读消息') {
                canBack = false;
            }
            break;

        case 'me':
            if (state.getIn(['me', 'viewMode']) === '我的信息') {
                canBack = false;
            }
            break;

        default:
            break;
    }
    return {
        canBack,
        light: state.getIn(['pageSet', 'light']),
        fontSize: state.getIn(['pageSet', 'fontSize']),
    };
};

const mapDispatchToProps = dispatch => ({
    onPressTitle: () =>
        dispatch({
            type: 'CHANGE_VIEWMODE',
            viewMode: 'home',
        }),
    pressBack: () =>
        dispatch({
            type: 'BACK',
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
