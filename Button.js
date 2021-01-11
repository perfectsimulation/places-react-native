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

const Button = (props) => {

const {
    onPress,
    shouldShow,
    showPosition,
    hidePosition,
    transitionDuration,
    animateShowPosition,
    animateTouchEndOpacity,
    animateTouchEndScale,
    beforePressOutOpacity,
    afterPressOutOpacity,
    beforePressOutScale,
    afterPressOutScale,
  } = props;

  const beforeShow = shouldShow ? 0 : 1;
  const afterShow = shouldShow ? 1 : 0;

  // show/hide horizontal translation animation
  const horizontalAnim = useRef(new Animated.Value(beforeShow)).current;
  const positionX = horizontalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [hidePosition.x, showPosition.x]
  });

  // show/hide vertical translation animation
  const verticalAnim = useRef(new Animated.Value(beforeShow)).current;
  const positionY = verticalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [hidePosition.y, showPosition.y]
  });

  // touch feedback opacity animation
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const opacity = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [beforePressOutOpacity, afterPressOutOpacity]
  });

  // touch feedback scale animation
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [beforePressOutScale, afterPressOutScale]
  });

   // capture onPressIn and onPressOut events
  const [isPressIn, setIsPressIn] = useState(false);
  const [isPressOut, setIsPressOut] = useState(false);

  // spring transform from initial to final position
  useEffect(() => {
    if (animateShowPosition) {
      Animated.parallel([
        Animated.spring(
          verticalAnim, {
            toValue: afterShow,
            duration: transitionDuration,
            useNativeDriver: true
          }
        ).start(),
        Animated.spring(
          horizontalAnim, {
            toValue: afterShow,
            duration: transitionDuration,
            useNativeDriver: true
          }
        ).start()
      ]);
    }
  }, [shouldShow]);

  // animate touch end feedback
  useEffect(() => {
    // process new onPressOut event
    if (isPressOut) {
      // disable press-in state immediately
      setIsPressIn(false);
    }

    // disable press-out state immediately if no animation needed
    if (!animateTouchEndOpacity && !animateTouchEndScale) {
      setIsPressOut(false);
    }

    // animate touch feedback opacity
    if (animateTouchEndOpacity) {
      if (isPressOut) {
        // start press-out opacity animation upon new press-out event
        Animated.timing(
          opacityAnim, {
            toValue: 1,
            duration: transitionDuration,
            easing: Easing.circle,
            useNativeDriver: true
          }
        ).start(() => {
          // disable press-out state upon animation completion
          setIsPressOut(false);
          opacityAnim.resetAnimation();
          opacityAnim.setValue(0);
        });
      }
    }

    // animate touch feedback scale
    if (animateTouchEndScale) {
      if (isPressOut) {
        // start press-out scale animation upon new press-out event
        Animated.timing(
          scaleAnim, {
            toValue: 1,
            duration: transitionDuration,
            easing: Easing.out(Easing.circle),
            useNativeDriver: true
          }
        ).start(() => {
          // disable press-out state upon animation completion
          setIsPressOut(false);
          scaleAnim.resetAnimation();
          scaleAnim.setValue(0);
        });
      }
    }
  }, [isPressOut]);

  const {
    labelText,
    innerLabelText,
    iconSource,
    iconTouchSource,
    containerStyle,
    buttonStyle,
    labelStyle,
    iconStyle,
    iconTouchStyle,
    buttonTouchStyle,
    touchDownFeedbackStyle,
    touchUpFeedbackStyle
  } = props;

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          transform: [
            { translateX: positionX },
            { translateY: positionY }
          ],
        }
      ]}
    >
      <Text style={labelStyle}>{labelText}</Text>
      <Pressable
        style={buttonStyle}
        onPressIn={() => setIsPressIn(true)}
        onPressOut={() => setIsPressOut(true)}
        onPress={() => onPress()}
      >
        <View
          style={[
            (isPressIn || isPressOut)
              ? buttonTouchStyle
              : styles.none
          ]}
        />
        <Image
          style={[
            (isPressIn || isPressOut)
              ? iconTouchStyle
              : styles.none
          ]}
          source={iconTouchSource}
        />
        <Image
          style={[
            !(isPressIn || isPressOut)
              ? iconStyle
              : styles.none
          ]}
          source={iconSource}
        />
        <View
          style={[
            isPressIn
              ? touchDownFeedbackStyle
              : styles.none
          ]}
        />
        <Animated.View
          style={[
            isPressOut
              ? touchUpFeedbackStyle
              : styles.none,
            {
              opacity: opacity,
              transform: [
                { scale: scale }
              ]
            }
          ]}
        />
        <Text style={labelStyle}>{innerLabelText}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  none: {
    display: 'none'
  }
});

Button.defaultProps = {
  onPress: (() => {}),
  shouldShow: true,
  showPosition: { x: 0, y: 0 },
  hidePosition: { x: 0, y: 0 },
  transitionDuration: 0,
  animateShowPosition: false,
  animateTouchEndOpacity: false,
  animateTouchEndScale: false,
  beforePressOutOpacity: 1,
  afterPressOutOpacity: 0,
  beforePressOutScale: 0.8,
  afterPressOutScale: 1,
  labelText: String.empty,
  innerLabelText: String.empty,
  iconSource: require('./icons/missing.png'),
  iconTouchSource: require('./icons/missing.png'),
  containerStyle: styles.none,
  buttonStyle: styles.none,
  labelStyle: styles.none,
  iconStyle: styles.none,
  iconTouchStyle: styles.none,
  buttonTouchStyle: styles.none,
  touchDownFeedbackStyle: styles.none,
  touchUpFeedbackStyl: styles.none
};


export default Button;
