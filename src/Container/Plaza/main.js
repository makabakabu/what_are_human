import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../Action/generateColor';

const { width, height } = Dimensions.get('window');
const Main = ({ light, onPress }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]} >
        <View style={{ position: 'absolute', top: width * 0.37, right: width * 0.05, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={onPress({ place: 'tiananmen' })}>
                <Image style={{ width: width * 0.1, height: width * 0.0625 }} source={require('../../Image/Plaza/tiananmen.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>天安门广场</Text>
        </View>
        <View style={{ position: 'absolute', top: width * 0.35, left: width * 0.46, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={onPress({ place: 'france' })}>
                <Image style={{ width: 0.0575 * width, height: width * 0.1 }} source={require('../../Image/Plaza/france.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>协和广场</Text>
        </View>
        <View style={{ position: 'absolute', top: width * 0.36, left: width * 0.21, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={onPress({ place: 'freedom' })}>
                <Image style={{ width: 0.034 * width, height: 0.125 * width }} source={require('../../Image/Plaza/freedom.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>时代广场</Text>
        </View>
        <View style={{ position: 'absolute', top: width, left: width * 0.45, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={onPress({ place: 'flyArea' })}>
                <Image style={{ width: 0.1 * width, height: 0.07 * width }} source={require('../../Image/Plaza/flyArea.png')} />
            </TouchableWithoutFeedback>
            <Text style={[styles.text, { color: '#ededed' }]}>飞地微斯人+</Text>
        </View>
        <View style={{ position: 'absolute', top: width * 0.31, right: width * 0.38, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={onPress({ place: 'russia' })}>
                <Image style={{ width: 0.08 * width, height: 0.1 * width }} source={require('../../Image/Plaza/russia.png')} />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>红场</Text>
        </View>
        <Image style={styles.map} source={require('../../Image/Plaza/map.png')} />
    </View>
);

Main.propTypes = {
    light: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        backgroundColor: '#6d6d6d',
        zIndex: -10,
    },
    map: {
        marginTop: width * 0.3,
        height: width * 0.6,
        width,
        zIndex: -10,
    },
    item: {
        width: 50,
        height: 70,
        position: 'absolute',
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 8,
        marginTop: 3,
        color: '#ededed',
    },
});
const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
});

const mapDispatchToProps = dispatch => ({
    onPress: ({ place }) => () => {
        dispatch({
            type: 'PLAZA_CHOOSE_PLACE',
            plazaName: place,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
