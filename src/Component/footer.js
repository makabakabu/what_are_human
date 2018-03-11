import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import generateColor from '../Action/generateColor';

const { height, width } = Dimensions.get('window');
const Footer = ({ backTo, notRead, light, viewMode, changeViewMode, isSignIn }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(166, 216, light)}` }]}>
        <TouchableWithoutFeedback onPress={changeViewMode({ viewMode: 'academy', isSignIn })}>
            <View style={styles.item}>
                {
                    viewMode === 'academy' || backTo === 'academy' ?
                    <Image style={{ width: 40, height: 30 }} source={require('../Image/Footer/academyAfter.png')} /> :
                    <Image style={{ width: 40, height: 30 }} source={require('../Image/Footer/academy.png')} />
                }
                <Text style={{ fontSize: 12, color: `#${generateColor(50, 109, light)}`, marginTop: 3 }}>学院</Text>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={changeViewMode({ viewMode: 'notes', isSignIn })}>
            <View style={styles.item}>
                {
                    viewMode === 'notes' || backTo === 'notes' ?
                    <Image style={{ width: 30, height: 30 }} source={require('../Image/Footer/notesAfter.png')} /> :
                    <Image style={{ width: 30, height: 30 }} source={require('../Image/Footer/notes.png')} />
                }
                <Text style={{ fontSize: 12, color: `#${generateColor(50, 109, light)}`, marginTop: 3 }}>笔记</Text>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={changeViewMode({ viewMode: 'plaza', isSignIn })}>
            <View style={styles.item}>
                {
                    viewMode === 'plaza' || backTo === 'plaza' ?
                    <Image style={{ width: 40, height: 30 }} source={require('../Image/Footer/plazaAfter.png')} /> :
                    <Image style={{ width: 40, height: 30 }} source={require('../Image/Footer/plaza.png')} />
                }
                <Text style={{ fontSize: 12, color: `#${generateColor(50, 109, light)}`, marginTop: 3 }}>广场</Text>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={changeViewMode({ viewMode: 'news', isSignIn })}>
            <View style={[styles.item, { marginTop: (notRead > 0) ? -5 : 0 }]}>
                { notRead > 0 &&
                    (<View style={styles.point}>
                        <Text style={{ fontSize: 10, color: '#6a6a6a' }}>●</Text>
                     </View>)
                }
                {
                    viewMode === 'news' || backTo === 'news' ?
                    <Image style={{ width: 27, height: 30 }} source={require('../Image/Footer/newsAfter.png')} /> :
                    <Image style={{ width: 27, height: 30 }} source={require('../Image/Footer/news.png')} />
                }
                <Text style={{ fontSize: 12, color: `#${generateColor(50, 109, light)}`, marginTop: 3 }}>消息</Text>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={changeViewMode({ viewMode: 'me', isSignIn })}>
            <View style={styles.item}>
                {
                    viewMode === 'me' || backTo === 'me' ?
                    <Image style={{ width: 30, height: 30 }} source={require('../Image/Footer/meAfter.png')} /> :
                    <Image style={{ width: 30, height: 30 }} source={require('../Image/Footer/me.png')} />
                }
                <Text style={{ fontSize: 12, color: `#${generateColor(50, 109, light)}`, marginTop: 3 }}>我</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
);

Footer.propTypes = {
    notRead: PropTypes.bool.isRequired,
    backTo: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    viewMode: PropTypes.string.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    changeViewMode: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        backgroundColor: '#ededed',
        shadowOffset: { width: 2,
                        height: -2 },
        shadowOpacity: 0.7,
    },
    point: {
        zIndex: 10,
        width: width * 0.08,
        height: width * 0.01,
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    item: {
        width: '20%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    changeViewMode: ({ viewMode, isSignIn }) => () => {
        const notSignInToastMap = {
            notes: '请先登录查看笔记',
            news: '请先登录查看消息',
            me: '请先登录查看个人信息',
        };
        console.log(isSignIn);
        if (!isSignIn && ['notes', 'news', 'me'].includes(viewMode)) {
            Toast.fail(notSignInToastMap[viewMode], 1, null, false);
        }
        dispatch({
            type: 'CHANGE_VIEWMODE',
            viewMode,
        });
    },
});

const mapStateToProps = state => ({
    notRead: ['评论', '回复', '点赞', '收藏', '系统消息'].some(value => state.getIn(['news', value]).size > 0),
    backTo: state.get('viewMode') === 'menu' ? state.getIn(['menu', 'backTo']) : '',
    light: state.getIn(['pageSet', 'light']),
    viewMode: state.get('viewMode'),
    isSignIn: state.getIn(['me', '我的信息', 'userName']) !== '',
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
