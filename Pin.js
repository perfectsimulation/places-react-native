import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const Pin = (props) => {

  const {
    shouldShow,
    color,
    style
  } = props;

  const show = shouldShow ?? true;
  const position = style ?? styles.pin;
  const pin = show ? position : styles.hidden;
  const fillColor = color ?? '#f8f8ff';

  return (
    <View style={pin}>
      <View style={styles.pinFill}>
        <View style={[styles.pinUpperColor, {
          'backgroundColor': fillColor
        }]}/>
        <View style={[styles.pinLowerColor, {
          'borderTopColor': fillColor
        }]}/>
      </View>
      <Image
        style={styles.pinImage}
        source={require('./icons/pin.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  pin: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pinFill: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinUpperColor: {
    alignSelf: 'center',
    position: 'absolute',
    top: 1,
    height: 24,
    width: 24,
    borderRadius: 24,
    backgroundColor: 'ghostwhite',
  },
  pinLowerColor: {
    alignSelf: 'center',
    position: 'absolute',
    top: 18,
    borderTopWidth: 19,
    borderRightWidth: 11,
    borderBottomWidth: 0,
    borderLeftWidth: 11,
    borderColor: 'transparent',
    borderTopColor: 'ghostwhite'
  },
  pinImage: {
    height: 40,
    width: 40
  }
});

export default Pin;
