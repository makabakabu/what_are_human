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
            <MenuItem imageSource={require('../../../Image/SideMenu/review.png')} text="回复最多" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/share.png')} text="转发最多" drawer={drawer} />
            <MenuItem imageSource={require('../../../Image/SideMenu/collect.png')} text="收藏最多" drawer={drawer} />
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
        height: width * 0.6,
    },
});

export default Menu;
