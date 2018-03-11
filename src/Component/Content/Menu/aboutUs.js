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
import generateColor from '../../../Action/generateColor';
import generateSize from '../../../Action/generateSize';

const { height, width } = Dimensions.get('window');
const AboutUs = ({ light, fontSize }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.text, { marginTop: 30, color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                “微斯人”APP是沐之普适文化研究院推出的一个公共文化平台，这个文化平台致力于研究“人”这个概念或定义在人类语言中认识的可能性。“微斯人”APP并不是李沐之著作“微斯人”的在线阅读版本，这个APP可以说是人类系统化反观自身的一次尝试，是人类意识共同体自我伸展的必然性产物。
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                “微斯人”APP的核心内容是三卷以“人是什么”为主题的文本展示，每卷365条，每日发布一条。“人是什么”是一个涉及人类文明方方面面的巨大命题，也正是因为这个原因，著作者李沐之最终决定开放他的文字，欢迎对他的文字内容有不同看法的人参与修订，修订一条获得认可可以得到200元稿酬，修订后将在下一个版本中出现，并备注修订者的名字。
            </Text>
            <Text style={[styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                “微斯人”APP还有一个野心，就是期望在相对了解“人是什么”之后，能够依托“人是什么”搭建一个全新的普适价值。“微斯人”APP是一个以全人类整体命运作为优先价值考量的公共文化平台，为了做到这一点，我们必须超越国家、民族、集体及个人利益，关注全人类整体利益并为其可持续发展研究各种应对措施预案。人类新普适价值的建构研究是中国真正崛起必须补上的短板，同时也是“人类命运共同体”这一理念实现的唯一前提。
            </Text>
            <Text style={[styles.text, { textAlign: 'right', marginTop: 30, color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 20) }]}>
                沐之普适文化研究院
            </Text>
        </ScrollView>
    </View>
);

AboutUs.propTypes = {
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
        color: 'white',
        fontSize: 20,
        marginTop: 10,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

export default connect(mapStateToProps)(AboutUs);
