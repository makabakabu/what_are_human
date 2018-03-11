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
const Protocol = ({ light, fontSize }) => {
    styles.text = [styles.text, { color: `#${generateColor(166, 216, light)}`, fontSize: generateSize(fontSize, 16) }];
    return (
        <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.text, { marginTop: 40 }]}>
                    欢迎您来到微斯人社会公共文化平台，注册使用前请阅读以下协议条款。
                </Text>
                <Text style={styles.text}>
                    本协议为您与微斯人APP管理者之间所订立的契约，具有合同的法律效力，请您仔细阅读。
                </Text>
                <Text style={styles.text}>
                    本协议内容生效同时包含变更本协议内容包括协议正文及所有本APP已经发布的或将来在下一个APP版本中可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，应向微斯人APP管理者咨询（咨询电话：025-51887678）。您在同意所有协议条款并完成注册程序，才能成为微斯人APP的正式用户，您点击“我已阅读并同意微斯人APP用户协议和法律协议”按钮后，本协议即生效，对双方产生约束力。
                </Text>
                <Text style={styles.text}>
                    只要您使用微斯人APP平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容主张本协议无效，或要求撤销本协议。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。 您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用微斯人APP平台服务。本APP有权根据需要不定期地制订、修改本协议及/或各类规则，并在本APP平台公示，不再另行单独通知用户。变更后的协议和规则一经在微斯人APP平台公布，立即生效。如您不同意相关变更，应当立即停止使用本APP平台服务。如果您继续使用本APP平台服务，即表明您接受修订后的协议和规则。
                </Text>
                <Text style={styles.text}>
                    一、注册
                </Text>
                <Text style={styles.text}>
                    注册资格用户须具有法定的相应权利能力和行为能力的自然人、法人或其他组织，能够独立承担法律责任。您完成注册程序或其他微斯人APP平台同意的方式实际使用本平台服务时，即视为您确认自己具备主体资格，能够独立承担法律责任。若因您不具备主体资格，而导致的一切后果，由您及您的监护人自行承担。
                </Text>
                <Text style={styles.text}>
                    二、注册资料
                </Text>
                <Text style={styles.text}>
                    用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且微斯人APP保留终止用户使用本平台各项服务的权利。
                </Text>
                <Text style={styles.text}>
                    用户在本站进行浏览等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。
                </Text>
                <Text style={styles.text}>
                三、账户
                </Text>
                <Text style={styles.text}>
                    您注册成功后，即成为微斯人APP平台的会员，将持有本APP平台唯一编号的账户信息，您可以根据本站规定改变您的密码。
                </Text>
                <Text style={styles.text}>
                    您设置的姓名为真实姓名，不得侵犯或涉嫌侵犯他人合法权益。否则，微斯人APP有权终止向您提供服务，注销您的账户。账户注销后，相应的会员名将开放给任意用户注册登记使用。
                </Text>
                <Text style={styles.text}>
                    您应谨慎合理的保存、使用您的会员名和密码，应对通过您的会员名和密码实施的行为负责。除非有法律规定或司法裁定，且征得微斯人APP的同意，否则，会员名和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。
                </Text>
                <Text style={styles.text}>
                    用户在使用微斯人APP中的“我要捐赠”功能时，请注意一经捐赠，无法退还。请妥善保存好您的账户密码。用户不得将在微斯人APP注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。
                </Text>
                <Text style={styles.text}>
                    如果发现任何非法使用等可能危及您的账户安全的情形时，您应当立即以有效方式通知微斯人APP要求暂停相关服务，并向公安机关报案。您理解微斯人APP对您的请求采取行动需要合理时间，本APP对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
                </Text>
                <Text style={styles.text}>
                    四、用户信息的合理使用
                </Text>
                <Text style={styles.text}>
                    您同意微斯人APP平台拥有通过邮件、短信电话等形式，向在本APP注册用户发送信息等告知信息的权利。
                </Text>
                <Text style={styles.text}>
                    您了解并同意，微斯人APP有权应国家司法、行政等主管部门的要求，向其提供您在本APP平台填写的注册信息和言论记录等必要信息。如您涉嫌侵犯他人任何权益，则本APP亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。
                </Text>
                <Text style={styles.text}>
                    用户同意微斯人APP有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。
                </Text>
                <Text style={styles.text}>
                    五、免责条款
                </Text>
                <Text style={styles.text}>
                    本平台仅提供信息对接，发生一切纠纷问题皆与本平台无关，请通过仲裁部门维护各自权益。
                </Text>
                <Text style={[styles.text, { textAlign: 'right', fontSize: 12 }]}>
                    微斯人APP社会公共文化平台
                </Text>
            </ScrollView>
        </View>
    );
};

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
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

export default connect(mapStateToProps)(Protocol);
