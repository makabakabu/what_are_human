import React from 'react';
import {
        StyleSheet,
        Text,
        View,
        Image,
        TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MenuOperation = ({ viewMode, imageSource, name, press }) => (
    <TouchableOpacity onPress={press({ viewMode })}>
        <View style={styles.row}>
            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 25, width: 25 }} source={imageSource} />
            </View>
            <View style={styles.text}>
                <Text style={{ fontSize: 20, color: '#6d6d6d' }}>{ name }</Text>
            </View>
        </View>
    </TouchableOpacity>
);

MenuOperation.propTypes = {
    viewMode: PropTypes.string.isRequired,
    imageSource: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    press: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    row: {
        height: 31,
        width: '100%',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#6d6d6d',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapDispatchToProps = dispatch => ({
    press: ({ viewMode }) => () => {
         dispatch({
            type: 'CHANGE_MENU_VIEWMODE',
            viewMode,
        });
        dispatch({
            type: 'CHANGE_VIEWMODE',
            viewMode: 'menu',
        });
        dispatch({
            type: 'MENU_VISIBILITY',
        });
    },
});

export default connect(null, mapDispatchToProps)(MenuOperation);
