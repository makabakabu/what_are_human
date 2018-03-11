import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');
const MenuItem = ({ imageSource, text, press }) => (
    <TouchableOpacity onPress={press} >
        <View style={styles.main}>
            <Image style={styles.image} source={imageSource} />
            <Text style={styles.text} > { text } </Text>
        </View>
    </TouchableOpacity>
);

MenuItem.propTypes = {
    imageSource: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
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
    image: {
        width: width * 0.08,
        height: width * 0.08,
    },
    text: {
        fontSize: 10,
        color: '#6a6a6a',
    },
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    press: () => {
        dispatch({
            type: 'ACADEMY_SELECT_MOST',
            viewMode: ownProps.text,
        });
        ownProps.drawer.closeDrawer();
    },
});

export default connect(null, mapDispatchToProps)(MenuItem);
