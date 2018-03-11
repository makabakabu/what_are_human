import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import { PickerView } from 'antd-mobile';
import generateColor from '../../../Action/generateColor';

const { height, width } = Dimensions.get('window');
const PageSet = ({ light, fontSize, pickFontSize, changeLightness }) => (
    <View style={[styles.main, { backgroundColor: `#${generateColor(50, 109, light)}` }]}>
        <View style={styles.fontSize}>
            <Image style={{ width: 36, height: 36 }} source={require('../../../Image/Menu/pageSetup/size.png')} />
            <View style={{ width: width * 0.6 }}>
                <PickerView onChange={pickFontSize} value={[fontSize]} data={[[{ label: '大', value: '大' }, { label: '中', value: '中' }, { label: '小', value: '小' }]]} cascade={false} itemStyle={{ color: '#ededed' }} />
            </View>
        </View>
        <View style={styles.light}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../Image/Menu/pageSetup/light.png')} />
            <Slider value={light} onSlidingComplete={itemValue => changeLightness({ itemValue })} style={{ width: 0.6 * width, marginLeft: 30, borderRadius: 10 }} />
        </View>
    </View>
);

PageSet.propTypes = {
    light: PropTypes.number.isRequired,
    fontSize: PropTypes.string.isRequired,
    pickFontSize: PropTypes.func.isRequired,
    changeLightness: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
    main: {
        width,
        height: height * 0.835,
        paddingTop: height * 0.1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontSize: {
        flexDirection: 'row',
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    light: {
        flexDirection: 'row',
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: height * 0.3,
    },
});

const mapStateToProps = state => ({
    light: state.getIn(['pageSet', 'light']),
    fontSize: state.getIn(['pageSet', 'fontSize']),
});

const mapDispatchToProps = dispatch => ({
    pickFontSize: (value) => {
        dispatch({
            type: 'PAGE_SET_FONT_SIZE',
            size: value[0],
        });
    },
    changeLightness: ({ itemValue }) => {
        dispatch({
            type: 'PAGE_SET_LIGHTNESS',
            lightness: itemValue,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSet);
