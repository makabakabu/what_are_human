import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../../Action/generateColor';
import generateSize from '../../../../Action/generateSize';

const { width, height } = Dimensions.get('window');
const Protocol = ({ light, fontSize }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.text, { marginTop: 40, color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                1、言论必须在中华人民共和国宪法框架内展开，并为自己的言论负完全的法律责任；
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                2、不可攻击国家、民族、政党及政权，不允许出现任何颠覆分裂任何国家的言论；
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                3、专注于人的本体价值（非人本主义价值）及在此基础上延伸的普适价值的推演；
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                4、言论内容请专注于文化价值判断及上层建筑的理论建设；
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                5、时事民生等所有新闻性材料都必须展开到文化价值判断或上层建筑的高度并提出解决方案为最佳演讲结构；
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                6、微斯人APP社会公共文化平台对演讲内容不审核，但是保留删除演讲、评论及回复的权利，同时我们保留注销政治倾向过于偏激的账号的权利。
            </Text>
        </ScrollView>
    </View>
);

Protocol.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
        alignItems: 'center',
    },
    text: {
        width: 0.9 * width,
        marginTop: 15,
        color: 'white',
        fontSize: 16,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

export default connect(mapStateToProps)(Protocol);
