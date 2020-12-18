import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const Pin = (props) => {

  const { color, style } = props;
  const position = style ?? styles.pin;
  const fillColor = color ?? '#f8f8ff';

  return (
    <View style={position}>
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
  pin: {
    bottom: '16%',
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
