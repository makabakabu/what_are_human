import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

const OperationTrigger = ({ imageSource, likeId, number, have, press }) => (
    <TouchableWithoutFeedback onPress={press}>
        <View style={styles.item}>
            <Animatable.Image ref={(c) => { if (likeId !== '') { this[likeId] = c; } }} style={styles.itemImage} source={imageSource} />
            <Text style={styles.itemText}>{ number }</Text>
            { have && <Text style={{ fontSize: 10, color: '#ededed' }}>●</Text>}
        </View>
    </TouchableWithoutFeedback>
);

OperationTrigger.propTypes = {
    imageSource: PropTypes.number.isRequired,
    likeId: PropTypes.string,
    number: PropTypes.string,
    have: PropTypes.bool,
    press: PropTypes.func,
};

OperationTrigger.defaultProps = {
    number: '',
    have: false,
    likeId: '',
    press: () => {},
};

const styles = StyleSheet.create({
    item: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        height: 20,
        width: 20,
    },
    itemText: {
        color: '#e8e8e8',
        fontSize: 10,
        marginLeft: 3,
    },
});
export default OperationTrigger;
