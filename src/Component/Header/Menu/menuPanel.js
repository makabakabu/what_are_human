import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuOperation from './menuOperation';

const MenuPanel = () => (
    <View key="content" style={styles.content}>
        <View style={{ height: 150, marginTop: 5, overflow: 'hidden' }}>
            <MenuOperation viewMode="signIn" imageSource={require('../../../Image/Menu/signIn.png')} name="登陆" />
            <MenuOperation viewMode="purchase" imageSource={require('../../../Image/Menu/purchase.png')} name="购买" />
            <MenuOperation viewMode="pageSet" imageSource={require('../../../Image/Menu/pageSet.png')} name="页面设置" />
            <MenuOperation viewMode="donate" imageSource={require('../../../Image/Menu/donate.png')} name="我要捐赠" />
            <MenuOperation viewMode="aboutUs" imageSource={require('../../../Image/Menu/aboutUs.png')} name="关于我们" />
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        height: 160,
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

export default MenuPanel;
