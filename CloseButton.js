import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  View,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';

const CloseButton = (props) => {

  const { onClose } = props;

  // null check / default value
  const onPress = onClose ?? (() => {});

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
    outputRange: [1, 0.8]
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

  return (
    <Pressable
      style={styles.button}
      onPress={() => onPress()}
      onPressIn={() => setIsPressIn(true)}
      onPressOut={() => setIsPressOut(true)}
    >
      {isPressIn && (
        <View style={styles.feedback} />
      )}
      {isPressOut && (
        <Animated.View
          style={[styles.feedback, {
            transform: [{ scale: scale }],
            opacity: opacity
          }]}
        />
      )}
      <Image
        style={styles.icon}
        source={require('./icons/close.png')}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 32,
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    bottom: 2,
    height: 34,
    width: 34
  },
  feedback: {
    position: 'absolute',
    height: 65,
    width: 65,
    borderRadius: 65,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#ffffff1f'
  }
});

export default CloseButton;