import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const MenuItem = ({ imageSource, text, notRead, press }) => (
    <TouchableOpacity onPress={press} >
        <View style={styles.main}>
            { notRead &&
                (<View style={styles.point}>
                    <Text style={{ fontSize: 10, color: '#aaa' }}>●</Text>
                 </View>)
            }
            <Image style={styles.image} source={imageSource} />
            <Text style={styles.text} > { text } </Text>
        </View>
    </TouchableOpacity>
);

MenuItem.propTypes = {
    imageSource: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    notRead: PropTypes.bool.isRequired,
    press: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width: width * 0.2,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
    },
    point: {
        zIndex: 10,
        width: width * 0.08,
        height: width * 0.01,
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    image: {
        width: width * 0.08,
        height: width * 0.07,
    },
    text: {
        fontSize: 10,
        color: '#6a6a6a',
    },
});
const mapStateToProps = (state, ownProps) => {
    let notRead;
    if (ownProps.text === '未读消息') {
        notRead = ['转发', '评论', '回复', '点赞', '收藏', '系统消息'].some(item => state.getIn(['news', item]).filter(value => !value.get('read')).size > 0);
    } else {
        notRead = state.getIn(['news', ownProps.text]).filter(value => !value.get('read')).size > 0;
    }
    return {
        notRead,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    press: () => {
        dispatch({
            type: 'NEWS_VIEWMODE',
            viewMode: ownProps.text,
        });
        ownProps.drawer.closeDrawer();
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
