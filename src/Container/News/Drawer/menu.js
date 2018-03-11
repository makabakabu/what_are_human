import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import MenuItem from './menuItem';

const { height, width } = Dimensions.get('window');
const Menu = ({ drawer }) => (
    <View style={styles.main}>
        <View style={styles.menuContainer}>
            <MenuItem imageSource={require('../../../Image/SideMenu/share.png')} text="转发" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/comment.png')} text="评论" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/review.png')} text="回复" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/like.png')} text="点赞" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/collect.png')} text="收藏" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/systemNews.png')} text="系统消息" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/news.png')} text="未读消息" drawer={drawer} />
        </View>
    </View>
);

Menu.propTypes = {
    drawer: PropTypes.object,
};

Menu.defaultProps = {
    drawer: {},
};

const styles = StyleSheet.create({
    main: {
        width: width * 0.2,
        height,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    menuContainer: {
        width: width * 0.2,
        height: width * 1.4,
    },
});

export default Menu;
