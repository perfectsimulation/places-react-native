import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import CloseButton from './CloseButton';

const Menu = (props) => {

  const {
    shouldShow,
    title,
    children,
    onClose,
    showDefaultCloseButton,
    animationDuration,
    backgroundColor,
  } = props;

  // null checks / TODO defaultProps
  const show = shouldShow ?? true;
  const content = children ?? <></>;
  const onCloseMenu = onClose ?? (() => {});
  const showCloseButton = showDefaultCloseButton ?? true;
  const transitionDuration = animationDuration ?? 300;
  const containerStyle = backgroundColor
    ? {
      ...styles.container,
      backgroundColor: backgroundColor
    }
    : styles.container;

  // TODO useWindowDimensions instead
  const window = Dimensions.get('window');
  const height = window.height;

  // translate entire menu on/off-screen
  const beforeShow = show ? height : 0;
  const afterShow = show ? 0 : height;

  // fade entire menu in/out
  const beforeOpacity = show ? 0 : 1;
  const afterOpacity = show ? 1 : 0;

  // translate and opacity ref values
  const translateAnim = useRef(new Animated.Value(beforeShow)).current;
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // call onClose prop onPress of close button
  const [shouldClose, setShouldClose] = useState(false);

  // translate menu on/off-screen
  useEffect(() => {
    if (show) {
      // translate entire menu on-screen instantly
      Animated.timing(
        translateAnim, {
          toValue: afterShow,
          duration: 0,
          useNativeDriver: true
        }
      ).start();
    } else {
      // translate entire menu off-screen upon animation completion
      const timer = setTimeout(() => {
        Animated.timing(
          translateAnim, {
            toValue: afterShow,
            duration: 0,
            useNativeDriver: true
          }
        ).start();

        return (() => {
          clearTimeout(timer);
        });
      }, transitionDuration); // TODO use actual animation length
    }
  }, [shouldClose, afterShow, translateAnim]);

  // fade menu in/out
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: transitionDuration,
        useNativeDriver: true
      }
    ).start();
  }, [afterOpacity, opacityAnim]);

  // close this menu from this close button
  useEffect(() => {
    onCloseMenu();
    setShouldClose(false);
  }, [shouldClose]);

  return (
    <Animated.View
      onTouchEnd={(e) => {
        if (e.target == e.currentTarget)
          setShouldClose(true);
      }}
      style={[
        {
          ...containerStyle,
          transform: [{ translateY: translateAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      {content}
      {showCloseButton && (
        <CloseButton
          onClose={() => setShouldClose(true)}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    position: 'absolute',
    top: 60,
    paddingLeft: 2,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
});

export default Menu;
