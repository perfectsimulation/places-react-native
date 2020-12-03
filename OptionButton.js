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

  // optional props: shouldShow,
  //                 showPosition,
  //                 hidePosition,
  //                 transitionDuration,
  //                 transitionDuration,

  const {
    shouldShow,
    showPosition,
    hidePosition,
    transitionDuration
  } = props;

  const show = shouldShow ?? true;
  const showPos = showPosition ?? { x: 0, y: 0 };
  const hidePos = hidePosition ?? { x: 0, y: 0 };
  const duration = transitionDuration ?? 0;

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
        {labelText && (
          <Text style={label}>{labelText}</Text>
        )}
        {isPressing && (
          <>
            <Animated.View
              style={[styles.feedbackBorder, {
                transform: [ { rotate: rotation } ]
              }]}
            />
            <View style={styles.feedbackOpacity} />
          </>
        )}
        {iconImageName && (
          <Image style={icon} source={iconImageName} />
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
    height: 16,
    width: 88,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    // backgroundColor: 'darkred',
    color: 'white'
  },
  icon: {
    height: 42,
    width: 42
  },
  feedbackBorder: {
    position: 'absolute',
    height: 68,
    width: 68,
    borderRadius: 68,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: 'transparent'
  },
  feedbackOpacity: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 64,
    margin: 12,
    backgroundColor: '#000000',
    opacity: 0.2
  }
});

export default OptionButton;
