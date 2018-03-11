import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Animatable from 'react-native-animatable';
import Dialog from './dialog';

const { width, height } = Dimensions.get('window');
const DialogFrame = ({ content, visibility }) => (
    <Animatable.View transition="bottom" style={[styles.discuss, { bottom: visibility ? height * 0.09 : -0.835 * height }]}>
        <ScrollView>
            {
                content.reduce((discussArray, value, key) => ([...discussArray, <DateMark date={key} key={key} />, ...value.map((nextValue, nextKey) => <Dialog key={nextKey} content={nextValue} time={key} discussId={nextKey} />).valueSeq().toArray()]), [])
            }
        </ScrollView>
    </Animatable.View>
);
//

const DateMark = ({ date }) => (
    <View style={{ width, alignItems: 'center' }}>
        <View style={{ height: 30, width: 100, borderRadius: 5, backgroundColor: '#6a6a6a', opacity: 0.3, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: '#ededed', fontSize: 10 }}> {date} </Text>
        </View>
    </View>
);

DateMark.propTypes = {
    date: PropTypes.string.isRequired,
};

DialogFrame.propTypes = {
    content: ImmutablePropTypes.map.isRequired,
    visibility: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    discuss: {
        width,
        maxHeight: height * 0.835,
        position: 'absolute',
        borderTopWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#ededed',
        overflow: 'hidden',
    },
});

const mapStateToProps = (state, ownProps) => ({
    content: ownProps.discuss.get('content'),
    visibility: ownProps.discuss.get('visibility'),
    light: state.getIn(['pageSet', 'light']),
});

export default connect(mapStateToProps)(DialogFrame);
