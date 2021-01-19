import React, { useRef, useState, useEffect } from 'react';
import {
  useWindowDimensions,
  Animated,
  Text,
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
    style,
    backgroundColor
  } = props;

  const { height } = useWindowDimensions();

  // translate entire menu on/off-screen
  const beforeShow = shouldShow ? height : 0;
  const afterShow = shouldShow ? 0 : height;

  // fade entire menu in/out
  const beforeOpacity = shouldShow ? 0 : 1;
  const afterOpacity = shouldShow ? 1 : 0;

  // translate and opacity ref values
  const translateAnim = useRef(new Animated.Value(beforeShow)).current;
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // call onClose prop onPress of close button
  const [shouldClose, setShouldClose] = useState(false);

  // translate menu on/off-screen
  useEffect(() => {
    if (shouldShow) {
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
      }, animationDuration);
    }
  }, [shouldShow, shouldClose]);

  // fade menu in/out
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: animationDuration,
        useNativeDriver: true
      }
    ).start();
  }, [shouldShow]);

  // close this menu from this close button
  useEffect(() => {
    onClose();
    setShouldClose(false);
  }, [shouldClose]);

  return (
    <Animated.View
      onTouchEnd={(e) => {
        if (e.target == e.currentTarget)
          setShouldClose(true);
      }}
      style={[
        style ?? styles.container,
        {
          backgroundColor: backgroundColor,
          transform: [{ translateY: translateAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      {children}
      {showDefaultCloseButton && (
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

Menu.defaultProps = {
  shouldShow: true,
  title: undefined,
  children: <></>,
  onClose: (() => {}),
  showDefaultCloseButton: true,
  animationDuration: 300,
  style: undefined,
  backgroundColor: 'transparent'
};

export default Menu;
