import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import CloseButton from './CloseButton';

const Menu = (props) => {

  // TODO useWindowDimensions instead
  const window = Dimensions.get('window');
  const height = window.height;

  const {
    shouldShow,
    children,
    onClose,
    showDefaultCloseButton,
    animationDuration
  } = props;

  // null checks / default values
  const show = shouldShow ?? true;
  const content = children ?? <></>;
  const onCloseMenu = onClose ?? (() => {});
  const showCloseButton = showDefaultCloseButton ?? true;
  const transitionDuration = animationDuration ?? 300;

  // translate entire menu on/off-screen
  const beforeShow = show ? height : 0;
  const afterShow = show ? 0 : height;

  // fade entire menu in/out
  const beforeOpacity = show ? 0 : 1;
  const afterOpacity = show ? 1 : 0;

  // translate and opacity ref values
  const translateAnim = useRef(new Animated.Value(beforeShow)).current;
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);

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
          useNativeDriver: true,
        }
      ).start();
    } else {
      // translate entire menu off-screen upon animation completion
      const timer = setTimeout(() => {
        Animated.timing(
          translateAnim, {
            toValue: afterShow,
            duration: 0,
            useNativeDriver: true,
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
        useNativeDriver: true,
      }
    ).start();
  }, [afterOpacity, opacityAnim]);

  // close this menu from this close button
  useEffect(() => {
    onCloseMenu();
    setShouldClose(false);
  }, [shouldClose]);

  // record the elapsed first render
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // TODO look into a better way
  if (isFirstRender) {
    return <View style={styles.loading} />;
  }

  return (
    <Animated.View
      onTouchEnd={(e) => {
        if (e.target == e.currentTarget)
          setShouldClose(true);
      }}
      style={[styles.container, {
        transform: [{ translateY: translateAnim }],
          opacity: opacityAnim
      }]}
    >
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
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#151515c3',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default Menu;
