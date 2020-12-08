import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  View,
  Pressable,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const OptionButton = (props) => {

  const {
    shouldShow,
    showPosition,
    hidePosition,
    transitionDuration
  } = props;

  // null checks / default values
  const show = shouldShow ?? true;
  const showPos = showPosition ?? { x: 0, y: 0 };
  const hidePos = hidePosition ?? { x: 0, y: 0 };
  const duration = transitionDuration ?? 0;

  // capture onPressIn and onPressOut
  const [isPressIn, setIsPressIn] = useState(false);
  const [isPressOut, setIsPressOut] = useState(false);

  // animate onPressIn feedback opacity
  const opacityValue = useRef(new Animated.Value(0)).current;
  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  // animate onPressIn feedback scale
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  });

  const feedbackOpacityAnimation = useRef(
    Animated.timing(
      opacityValue, {
        toValue: 1,
        duration: 127,
        easing: Easing.circle,
        useNativeDriver: true
      }
    )
  ).current;

  const feedbackScaleAnimation = useRef(
    Animated.timing(
      scaleValue, {
        toValue: 1,
        duration: 127,
        easing: Easing.out(Easing.circle),
        useNativeDriver: true
      }
    )
  ).current;

   // animate transform position
   const initialPosition = show ? hidePos : showPos;
   const finalPosition = show ? showPos : hidePos;
   const positionValue = useRef(new Animated.ValueXY(initialPosition)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);
  const animationDuration = isFirstRender ? 0 : duration;

  // spring transform from initial to final position
  useEffect(() => {
    Animated.spring(
      positionValue, {
        toValue: finalPosition,
        duration: animationDuration,
        useNativeDriver: true
      }
    ).start();
  }, [show, positionValue]);

  // animate touch feedback
  useEffect(() => {
    if (isPressOut) {
      setIsPressIn(false);
      feedbackOpacityAnimation.start();
      feedbackScaleAnimation.start(() => {
        setIsPressOut(false);
      });
    } else {
      feedbackOpacityAnimation.reset();
      feedbackScaleAnimation.reset();
    }
  }, [isPressOut, scaleValue, opacityValue]);

  useEffect(() => {
    setIsFirstRender(false);
  });

  const {
    onPress,
    labelText,
    iconSource,
    iconTouchSource,
    containerStyle,
    buttonStyle,
    labelStyle,
    iconStyle,
  } = props;

  const container = containerStyle ?? styles.container;
  const button = buttonStyle ?? styles.button;
  const label = labelStyle ?? styles.label;
  const icon = iconStyle ?? styles.icon;

  return (
    <Animated.View
      style={[container, {
        transform: [
          { translateX: positionValue.x },
          { translateY: positionValue.y }
        ],
      }]}
    >
      {labelText && (
        <Text style={label}>{labelText}</Text>
      )}
      <Pressable
        style={button}
        onPressIn={() => setIsPressIn(true)}
        onPressOut={() => setIsPressOut(true)}
        onPress={() => onPress()}
      >
        {iconSource && (
          <Image
            style={[{ position: 'absolute' }, icon]}
            source={iconSource}
          />
        )}
        {(isPressIn || isPressOut) && iconTouchSource && (
          <>
            <View style={styles.iconTouchBackground} />
            <Image
              style={[{ position: 'absolute' }, icon]}
              source={iconTouchSource}
            />
          </>
        )}
        {isPressIn && (
          <View style={styles.pressInFeedback} />
        )}
        {isPressOut && (
          <Animated.View
            style={[styles.pressOutFeedback, {
              transform: [ { scale: scale } ],
              opacity: opacity
            }]}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  button: {
    height: 64,
    width: 64,
    borderRadius: 64,
    margin: 12,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    position: 'absolute',
    bottom: 84,
    paddingLeft: 3,
    height: 16,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  icon: {
    position: 'absolute',
    height: 42,
    width: 42
  },
  iconTouchBackground: {
    height: 65,
    width: 65,
    borderRadius: 65,
    backgroundColor: '#000000df'
  },
  pressInFeedback: {
    position: 'absolute',
    height: 65,
    width: 65,
    borderRadius: 65,
    borderColor: 'white',
    borderWidth: 2
  },
  pressOutFeedback: {
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 80,
    borderColor: 'white',
    borderWidth: 1
  }
});

export default OptionButton;
