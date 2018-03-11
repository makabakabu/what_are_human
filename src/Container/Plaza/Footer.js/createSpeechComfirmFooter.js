import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import generateColor from '../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const CreateSpeechComfirmFooter = ({ light, comfirmSpeech, cancelSpeech }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(166, 216, light)}` }]}>
        <TouchableOpacity onPress={comfirmSpeech}>
            <View style={styles.comfirm}>
                <Image style={styles.image} source={require('../../../Image/Plaza/check.png')} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={cancelSpeech}>
            <View style={styles.comfirm}>
                <Image style={styles.image} source={require('../../../Image/Plaza/false.png')} />
            </View>
        </TouchableOpacity>
    </View>
);

CreateSpeechComfirmFooter.propTypes = {
    light: PropTypes.number.isRequired,
    comfirmSpeech: PropTypes.func.isRequired,
    cancelSpeech: PropTypes.func.isRequired,
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
    comfirm: {
        width: width * 0.5,
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.1,
        height: height * 0.052,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
});

const mapDispatchToProps = dispatch => ({
    comfirmSpeech: () => {
        dispatch({
            type: 'PLAZA_CREATESPEECH_COMFIRM',
        });
        dispatch({
            type: 'ME_ADD',
            viewMode: '我的演讲',
        });
    },
    cancelSpeech: () =>
        dispatch({
            type: 'PLAZA_CREATESPEECH_CANCEL',
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpeechComfirmFooter);
