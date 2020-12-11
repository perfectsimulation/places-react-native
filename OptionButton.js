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
    transitionDuration,
    shouldAnimateOnPressOutOpacity,
    shouldAnimateOnPressOutScale,
    beforePressOutOpacity,
    afterPressOutOpacity,
    beforePressOutScale,
    afterPressOutScale,
  } = props;

  // null checks
  // defaults for animating translation
  const show = shouldShow ?? true;
  const showPos = showPosition ?? { x: 0, y: 0 };
  const hidePos = hidePosition ?? { x: 0, y: 0 };
  const duration = transitionDuration ?? 0;

  // defaults for animating touch feedback
  const animateTouchOpacity = shouldAnimateOnPressOutOpacity ?? false;
  const animateTouchScale = shouldAnimateOnPressOutScale ?? false;
  const beforeOpacity = beforePressOutOpacity ?? 1;
  const afterOpacity = afterPressOutOpacity ?? 0;
  const beforeScale = beforePressOutScale ?? 0.8;
  const afterScale = afterPressOutScale ?? 1;

  // capture onPressIn and onPressOut events
  const [isPressIn, setIsPressIn] = useState(false);
  const [isPressOut, setIsPressOut] = useState(false);

  // cache values to animate touch feedback opacity
  const opacityValue = useRef(new Animated.Value(0)).current;
  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [beforeOpacity, afterOpacity]
  });

  // cache values to animate touch feedback scale
  const scaleValue = useRef(new Animated.Value(0)).current;
  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [beforeScale, afterScale]
  });

  // cache touch feedback opacity animation
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

  // cache touch feedback scale animation
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

   // cache values to animate position
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
    // process new onPressOut event
    if (isPressOut) {
      // disable press-in state immediately
      setIsPressIn(false);
    }

    // disable press-out state immediately if no animation needed
    if (!animateTouchOpacity && !animateTouchScale) {
      setIsPressOut(false);
    }

    // animate touch feedback opacity
    if (animateTouchOpacity) {
      if (isPressOut) {
        // start press-out opacity animation upon new press-out event
        feedbackOpacityAnimation.start(() => {
          // disable press-out state upon animation completion
          setIsPressOut(false);
        });
      } else {
        // reset animation if press-out state is newly disabled
        feedbackOpacityAnimation.reset();
      }
    }

    // animate touch feedback scale
    if (animateTouchScale) {
      if (isPressOut) {
        // start press-out scale animation upon new press-out event
        feedbackScaleAnimation.start(() => {
          // disable press-out state upon animation completion
          setIsPressOut(false);
        });
      } else {
        // reset animation if press-out state is newly disabled
        feedbackScaleAnimation.reset();
      }
    }
  }, [isPressOut, scaleValue, opacityValue]);

  useEffect(() => {
    setIsFirstRender(false);
  });

  const {
    onPress,
    labelText,
    innerLabelText,
    iconSource,
    iconTouchSource,
    containerStyle,
    buttonStyle,
    labelStyle,
    iconStyle,
    iconTouchStyle,
    iconTouchBackgroundStyle,
    touchDownFeedbackStyle,
    touchUpFeedbackStyle
  } = props;

  const handlePress = onPress ?? (() => {});
  const container = containerStyle ?? styles.container;
  const button = buttonStyle ?? styles.button;
  const label = labelStyle ?? styles.label;
  const icon = iconStyle ?? styles.icon;
  const iconTouch = iconTouchStyle ?? styles.icon;
  const iconTouchBackground = iconTouchBackgroundStyle ?? styles.iconTouchBackground;
  const touchDownFeedback = touchDownFeedbackStyle ?? styles.pressInFeedback;
  const touchUpFeedback = touchUpFeedbackStyle ?? styles.pressOutFeedback;

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
        onPress={() => handlePress()}
      >
        {iconSource && (
          <Image
            style={[{ position: 'absolute' }, icon]}
            source={iconSource}
          />
        )}
        {(isPressIn || isPressOut) && iconTouchSource && (
          <>
            <View style={iconTouchBackground} />
            <Image
              style={[{ position: 'absolute' }, iconTouch]}
              source={iconTouchSource}
            />
          </>
        )}
        {isPressIn && (
          <View style={touchDownFeedback} />
        )}
        {isPressOut && (
          <Animated.View
            style={[touchUpFeedback, {
              transform: [ { scale: scale } ],
              opacity: opacity
            }]}
          />
        )}
        {innerLabelText && (
          <Text style={label}>{innerLabelText}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
