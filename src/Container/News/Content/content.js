import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DrawerPage from './DrawerPage/drawerPage';
import UnreadNews from './UnreadNews/unreadNews';
import generateColor from '../../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const Content = ({ light, viewMode }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
            {viewMode === '未读消息' ? <UnreadNews /> :
                <DrawerPage viewMode={viewMode} /> }
        </ScrollView>
    </View>
);

Content.propTypes = {
    light: PropTypes.number.isRequired,
    viewMode: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        zIndex: -10,
        alignItems: 'center',
    },
});

const mapStateToProps = state => ({
    viewMode: state.getIn(['news', 'viewMode']),
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(Content);
