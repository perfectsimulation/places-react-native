import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const OptionButton = (props) => {

  // required props: shouldShow
  // optional props: showPosition,
  //                 hidePosition,
  //                 transitionDuration,
  //                 transitionDuration,

  const {
    shouldShow,
    showPosition,
    hidePosition,
    transitionDuration
  } = props;

  // animate onPress feedback
  const [isPressing, setIsPressing] = useState(false);
  const feedbackValue = useRef(new Animated.Value(0)).current;
  const rotation = feedbackValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const feedbackAnimation = useRef(
    Animated.loop(
      Animated.timing(
        feedbackValue, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    )
  ).current;

   // animate transform position
   const initialPosition = shouldShow ? hidePosition : showPosition;
   const finalPosition = shouldShow ? showPosition : hidePosition;
   const positionValue = useRef(new Animated.ValueXY(initialPosition)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);
  const animationDuration = isFirstRender ? 0 : transitionDuration;

  // spring transform from initial to final position
  useEffect(() => {
    Animated.spring(
      positionValue, {
        toValue: finalPosition,
        duration: animationDuration,
        useNativeDriver: true
      }
    ).start();
  }, [shouldShow, positionValue]);

  useEffect(() => {
    if (isPressing) {
      feedbackAnimation.start();
    } else {
      feedbackAnimation.reset();
    }
  }, [isPressing, feedbackValue]);

  useEffect(() => {
    setIsFirstRender(false);
  });

  const onPressStart = () => {
    setIsPressing(true);
  }

  const onPressEnd = () => {
    setIsPressing(false);
  }

  const {
    onPress,
    labelText,
    iconImageName,
    containerStyle,
    buttonStyle,
    labelStyle,
    iconStyle,
  } = props;

  const container = containerStyle ?? styles.container;
  const button = buttonStyle ?? styles.button;
  const label = labelStyle ?? styles.label;
  const icon = iconStyle ?? styles.icon;

  const animatePress = () => {

  }

  return (
    <Animated.View
      style={[container, {
        transform: [
          { translateX: positionValue.x },
          { translateY: positionValue.y }
        ],
      }]}
    >
      <Pressable
        style={button}
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => setIsPressing(false)}
        onPress={() => onPress()}
      >
        <Text style={label}>{labelText}</Text>
        <Image style={icon} source={iconImageName} />
        {isPressing && (
          <Animated.View
            style={[styles.feedback, {
              transform: [ { rotate: rotation } ]
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
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    position: 'absolute',
    bottom: 70,
    fontSize: 12,
    height: 16, 
    width: 88,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    backgroundColor: 'darkred',
    color: 'white'
  },
  icon: {
    height: 36,
    width: 36
  },
  feedback: {
    position: 'absolute',
    height: 68,
    width: 68,
    borderRadius: 68,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    // opacity: 0.7
  },
});

export default OptionButton;
