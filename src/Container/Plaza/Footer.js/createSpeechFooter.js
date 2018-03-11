import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generateColor from '../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const CreateSpeechFooter = ({ light, comfirm }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(166, 216, light)}` }]}>
        <TouchableOpacity onPress={comfirm}>
            <View style={styles.touch}>
                <Image style={styles.image} source={require('../../../Image/Plaza/createSpeech.png')} />
                <Text style={styles.text} > 创建演讲 </Text>
            </View>
        </TouchableOpacity>
    </View>
);

CreateSpeechFooter.propTypes = {
    light: PropTypes.number.isRequired,
    comfirm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        backgroundColor: '#ededed',
        shadowOffset: { width: 2,
                        height: -2 },
        shadowOpacity: 0.7,
    },
    touch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.1,
        height: height * 0.08,
    },
    text: {
        marginLeft: 5,
        fontSize: 25,
        color: '#6a6a6a',
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
});

const mapDispatchToProps = dispatch => ({
    comfirm: () => {
        dispatch({
            type: 'CREATE_SPEECH',
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpeechFooter);
