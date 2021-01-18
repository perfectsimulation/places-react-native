import React, { useRef, useState, useEffect } from 'react';
import {
  PanResponder,
  useWindowDimensions,
  Animated,
  StyleSheet
} from 'react-native';

const DraggableDrawer = (props) => {

  const {
    shouldShow,
    previewContent,
    content,
    onMaximize,
    onMinimize,
    onClose,
    previewRatio,
    transitionDuration,
    backgroundColor,
  } = props;

  const { height: windowHeight } = useWindowDimensions();
  const previewHeight = Math.round(previewRatio * windowHeight);
  const marginHeight = windowHeight - previewHeight;

  const beforeShow = shouldShow ? windowHeight : 0;
  const afterShow = shouldShow ? 0 : windowHeight;

  const [showPreview, setShowPreview] = useState(true);

  const beforeTogglePreview = showPreview ? 0 : 1;
  const afterTogglePreview = showPreview ? 1 : 0;

  const show = useRef(new Animated.Value(beforeShow)).current;
  const drag = useRef(new Animated.Value(0)).current;
  const togglePreview = useRef(new Animated.Value(beforeTogglePreview)).current;

  const contentMargin = togglePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [marginHeight * -1, 0]
  });

  const previewContentOpacity = togglePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const contentOpacity = togglePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  // minimum drag distance to qualify a drag action
  const dragActionThreshold = marginHeight * 0.2;

  const [dragUp, setDragUp] = useState(false);
  const [dragDown, setDragDown] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      // respond to gestures
      onStartShouldSetPanResponder: (_evt, gestureState) => {
        // ignore simple tap
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onPanResponderGrant: (_evt, _gestureState) => {
        // gesture started
        // gestureState.d{x,y} set to zero
      },
      onPanResponderMove: (evt, gestureState) => {
        // most recent move distance is gestureState.move{X,Y}
        // accumulated gesture distance since becoming responder
        // is gestureState.d{x,y}

        // animate content screenY position
        return Animated.event(
          [
            null,
            { dy: drag }
          ],
          { useNativeDriver: false }
        )(evt, gestureState);
      },
      onPanResponderTerminationRequest: (_evt, _gestureState) => true,
      onPanResponderRelease: (_evt, gestureState) => {
        // all touches released while this view is the responder
        // typically means gesture succeeded

        // touch qualifies as a gesture if accumulated
        // distance exceeds threshold and most recent touch
        // ends in same direction
        const netVerticalDistance = gestureState.dy;
        const netVerticalDirection = netVerticalDistance > 0 ? 1 : -1;
        const finalVerticalDirection = gestureState.vy >= 0 ? 1 : -1;

        // check if most recent touch and net change have the same direction
        const canGesture = netVerticalDistance * finalVerticalDirection > 0;

        // check if net change exceeds threshold to qualify an action
        const shouldGesture = Math.abs(netVerticalDistance) > dragActionThreshold;

        if (canGesture && shouldGesture) {
          if (netVerticalDirection < 0) {
            setDragUp(true);
          } else {
            setDragDown(true);
          }
        } else {
          // snap content to resting height
          Animated.spring(
            drag, {
              toValue: 0,
              duration: transitionDuration,
              useNativeDriver: true
            }
          ).start();
        }
      },
      onPanResponderTerminate: (_evt, _gestureState) => {
        // another component has become responder
        // should cancel gesture
      },
      onShouldBlockNativeResponder: (_evt, _gestureState) => {
        // android only
        // block native components from becoming JS responder
        return true; // default
      }
    })
  ).current;

  useEffect(() => {
    Animated.spring(
      show, {
        toValue: afterShow,
        duration: transitionDuration,
        useNativeDriver: true
      }
    ).start();

    if (shouldShow) {
      drag.setOffset(0);
      drag.setValue(0);
    } else {
      setShowPreview(true);
    }
  }, [shouldShow]);

  useEffect(() => {
    Animated.spring(
      togglePreview, {
        toValue: afterTogglePreview,
        duration: transitionDuration,
        useNativeDriver: true
      }
    ).start();
  }, [showPreview]);

  useEffect(() => {
    if (dragUp) {
      setDragUp(false);
      handleDragUp();
      Animated.spring(
        drag, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true
        }
      ).start();
    }
  }, [dragUp]);

  useEffect(() => {
    if (dragDown) {
      setDragDown(false);
      handleDragDown();
      Animated.spring(
        drag, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true
        }
      ).start();
    }
  }, [dragDown]);

  const handleDragUp = () => {
    if (showPreview) {
      onMaximize();
      setShowPreview(false);
    }
  }

  const handleDragDown = () => {
    if (!showPreview) {
      onMinimize();
      setShowPreview(true);
    } else {
      onClose();
    }
  }

  const focus = Animated.add(show, drag);

  return (
    <Animated.View
      style={[{
        ...styles.container,
        height: windowHeight,
        transform: [{ translateY: focus }]
      }]}
      { ...panResponder.panHandlers }
    >
      <Animated.View
        style={[{
          ...styles.content,
          top: marginHeight,
          height: windowHeight,
          transform: [{ translateY: contentMargin }],
          backgroundColor: backgroundColor
        }]}
      >
        <Animated.View
          style={[{
            opacity: previewContentOpacity
          }]}
        >
          {previewContent}
        </Animated.View>
        <Animated.View
          style={[{
            opacity: contentOpacity
          }]}
        >
          {content}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    // backgroundColor: '#4444aa22'
  },
  content: {
    width: '100%',
    // backgroundColor: '#66bb5566'
  }
});

DraggableDrawer.defaultProps = {
  shouldShow: false,
  previewContent: <></>,
  content: <></>,
  onMaximize: (() => {}),
  onMinimize: (() => {}),
  onClose: (() => {}),
  previewRatio: 0.66,
  transitionDuration: 64,
  backgroundColor: 'transparent'
};

export default DraggableDrawer;
