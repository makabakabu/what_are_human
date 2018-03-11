import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import uuidv4 from 'uuid';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MyNewsSection from './myNewsSection';
import generateColor from '../../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const { alert } = Modal;
const PersonalInformation = ({ light, me, imageSource, infoList, changeInfo, logOff, generateSection }) => (
    <View>
        <View style={styles.profile}>
            <View style={[styles.portrait, { backgroundColor: `#${generateColor(166, 216, light)}` }]}>
                <Image style={{ width: width * 0.18, height: width * 0.28 }} source={imageSource} />
            </View>
            <Text style={{ color: `#${generateColor(166, 216, light)}`, fontSize: 16, marginTop: 5 }}>{ me.getIn(['我的信息', 'userName'])}</Text>
        </View>
        <View style={styles.text} >
            { generateSection({ me, infoList }) }
        </View>
        <View style={styles.myNews}>
            <TouchableOpacity onPress={changeInfo}>
                <View style={styles.button}>
                    <Text style={{ fontSize: 16, color: '#ededed' }}>修改密码</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOff}>
                <View style={styles.button}>
                    <Text style={{ fontSize: 16, color: '#ededed' }}>注销</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

PersonalInformation.propTypes = {
    light: PropTypes.number.isRequired,
    me: ImmutablePropTypes.map.isRequired,
    imageSource: PropTypes.number.isRequired,
    infoList: PropTypes.array.isRequired,
    changeInfo: PropTypes.func.isRequired,
    logOff: PropTypes.func.isRequired,
    generateSection: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    profile: {
        height: height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    portrait: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myNews: {
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        height: height * 0.07,
        width: width * 0.5,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width,
        height: height * 0.365,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

const mapStateToProps = state => ({
    imageSource: state.getIn(['me', '我的信息', 'gender']) === 'male' ? require('../../../../Image/Menu/maleGrey.png') : require('../../../../Image/Menu/femaleGrey.png'),
    light: state.getIn(['pageSet', 'light']),
    me: state.get('me'),
    infoList: ['我的演讲', '我的转发', '我的收藏', '我的点赞', '我的评论', '我的回复'],
});

const mapDispatchToProps = dispatch => ({
    changeInfo: () =>
        dispatch({
            type: 'ME_CHANGE_INFO',
        }),
    logOff: () => {
        alert('注销这个账户？', '', [{ text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type: 'ME_LOG_OFF',
                    });
                },
            },
        ]);
    },
    generateSection: ({ me, infoList }) => me.filter((value, key) => infoList.includes(key)).map((value, key) => <MyNewsSection key={uuidv4()} name={key} num={value.size} />).valueSeq().toArray(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
