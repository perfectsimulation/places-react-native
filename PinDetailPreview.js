import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  View,
  Text,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';

const PinDetailPreview = (props) => {
  const window = Dimensions.get('window');
  const height = Math.round(window.height * 0.25);

  const { pin, shouldShow } = props;

  // null checks / default values
  const show = shouldShow ?? true;

  // translate entire menu on/off-screen TODO use window height
  const beforeShow = show ? height : 0;
  const afterShow = show ? 0 : height;

  const translateAnim = useRef(new Animated.Value(beforeShow)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);
  const duration = 511;

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
  }, [afterShow, translateAnim]);

  // record the elapsed first render
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // TODO look into a better way
  if (isFirstRender) {
    return <View style={styles.loading} />;
  }

  const { title, description } = pin;

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
          <OptionButton
            labelText={'Add'}
            containerStyle={styles.optionButtonContainer}
            buttonStyle={styles.optionButton}
            labelStyle={styles.optionButtonLabel}
            iconSource={require('./icons/cubes-white.png')}
          />
          <OptionButton
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
    borderRadius: 10,
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
    // backgroundColor: 'palevioletred',
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
  largeOptionIcon: {
    height: 44,
    width: 44
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
