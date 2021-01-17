import React, { useRef, useEffect } from 'react';
import {
  useWindowDimensions,
  Animated,
  Easing,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Button from './Button';

const PinDetailPreview = (props) => {

  const {
    shouldShow,
    pin,
    onPressAdd,
  } = props;

  const { title, description } = pin;

  // null checks / default values
  const show = shouldShow ?? true;
  const onPressAddButton = onPressAdd ?? (() => {console.log('add')});

  const windowHeight = useWindowDimensions().height;
  const height = Math.round(windowHeight * 0.25);

  // translate entire menu on/off-screen TODO use window height
  const beforeShow = show ? height : 0;
  const afterShow = show ? 0 : height;

  const translateAnim = useRef(new Animated.Value(beforeShow)).current;
  const duration = 300;

  // translate on/off-screen
  useEffect(() => {
    Animated.timing(
      translateAnim, {
        toValue: afterShow,
        duration: duration,
        easing: Easing.easeOutExpo,
        useNativeDriver: true,
      }
    ).start();
  }, [show]);

  return (
    <Animated.View
      style={[styles.container, {
        transform: [{ translateY: translateAnim }],
      }]}
    >
      <View style={styles.swipeTab} />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{description}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => onPressAddButton()}
            labelText={'Add'}
            containerStyle={styles.optionButtonContainer}
            buttonStyle={styles.optionButton}
            labelStyle={styles.optionButtonLabel}
            iconStyle={styles.mediumOptionIcon}
            iconSource={require('./icons/cubes-white.png')}
          />
          <Button
            labelText={'Link'}
            containerStyle={styles.optionButtonContainer}
            buttonStyle={styles.optionButton}
            labelStyle={styles.optionButtonLabel}
            iconStyle={styles.smallOptionIcon}
            iconSource={require('./icons/chain-white.png')}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '25%',
    width: '100%',
    backgroundColor: '#151515c3',
    backgroundColor: 'black'
  },
  swipeTab: {
    position: 'absolute',
    alignSelf: 'center',
    height: 2,
    width: '7%',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ffffff27'
  },
  innerContainer: {
    margin: 16,
  },
  titleText: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '500',
    color: 'white'
  },
  subText: {
    marginTop: 4,
    fontSize: 13,
    color: '#ffffff88'
  },
  buttonsContainer: {
    height: '60%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  optionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'darkred'
  },
  optionButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    margin: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallOptionIcon: {
    height: 34,
    width: 34
  },
  mediumOptionIcon: {
    height: 38,
    width: 38
  },
  optionButtonLabel: {
    position: 'absolute',
    top: 72,
    paddingLeft: 3,
    height: 16,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
});

export default PinDetailPreview;
