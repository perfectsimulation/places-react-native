import React, { useRef, useEffect } from 'react';
import {
  PanResponder,
  useWindowDimensions,
  Animated,
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import AgentDetailFull from './AgentDetailFull';

const AgentDetail = (props) => {

  const {
    shouldShow,
    showPreview,
    item,
    onClosePreview,
    onOpenFull,
    onPressCreate,
    onClose,
    overlayRatio,
    transitionDuration,
  } = props;

  const { height: windowHeight } = useWindowDimensions();
  const overlayHeight = Math.round(overlayRatio * windowHeight);
  const marginHeight = windowHeight - overlayHeight;

  // open full detail if gesture drags past minimum threshold
  const dragActionThreshold = marginHeight * 0.5;

  const afterShow = shouldShow ? 0 : windowHeight;
  const beforeShow = shouldShow ? windowHeight : 0;

  const show = useRef(new Animated.Value(beforeShow)).current;
  const drag = useRef(new Animated.Value(0)).current;
  const showFull = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      // respond to gestures
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // gesture started
        // gestureState.d{x,y} set to zero
      },
      onPanResponderMove: (evt, gestureState) => {
        // most recent move distance is gestureState.move{X,Y}
        // accumulated gesture distance since becoming responder
        // is gestureState.d{x,y}

        // animate the height of the detail preview
        return Animated.event(
          [
            null,
            { dy: drag }
          ],
          { useNativeDriver: false }
        )(evt, gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
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
            // open full detail
            onOpenFull();
          } else {
            // close preview detail
            onClosePreview();
          }
        } else {
          // snap the detail to its resting height
          // const restingHeight = showPreview ? marginHeight : 0;
          Animated.spring(
            drag, {
              toValue: 0,
              duration: transitionDuration,
              useNativeDriver: true
            }
          ).start();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // another component has become responder
        // should cancel gesture
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // android only
        // block native components from becoming JS responder
        return true; // default
      }
    })
  ).current;

  // open or close the preview detail
  useEffect(() => {
    // reset drag value before animating
    if (shouldShow) {
      drag.setOffset(0)
      drag.setValue(0);
    }

    // spring open/close
    Animated.spring(
      show, {
        toValue: afterShow,
        duration: transitionDuration,
        useNativeDriver: true
      }
    ).start();
  }, [shouldShow]);

  useEffect(() => {
    if (shouldShow && !showPreview) {
      Animated.parallel([
        Animated.spring(
          drag, {
            toValue: 0,
            duration: transitionDuration,
            useNativeDriver: true
          }
        ).start(),
        Animated.spring(
          showFull, {
            toValue: marginHeight * -1,
            duration: transitionDuration,
            useNativeDriver: true
          }
        ).start()
      ]);
    }
  }, [showPreview]);

  // combine animations for showing/hiding
  const translateY = Animated.add(show, drag);

  return (
    <Animated.View
      style={[{
        ...styles.container,
        transform: [{ translateY: translateY }],
        // backgroundColor: '#55ee3366'
      }]}
      { ...panResponder.panHandlers }
    >
      <Menu
        shouldShow={showPreview}
        style={styles.container}
        showDefaultCloseButton={false}
      >
        <View
          style={[{
            ...styles.fullWidth,
            height: marginHeight,
            // backgroundColor: '#77aa77aa'
          }]}
        />
        <Animated.View
          style={[{
            ...styles.preview,
            height: windowHeight,
            // backgroundColor: '#bb55aabb',
            transform: [{ translateY: showFull }]
          }]}
        >
          <View style={styles.optionsContainer}>
            <Pressable style={styles.optionButton}>
              <Text style={styles.buttonLabel}>♤</Text>
            </Pressable>
            <Pressable style={styles.optionButton}>
              <Text style={styles.buttonLabel}>♢</Text>
            </Pressable>
            <Pressable style={styles.optionButton}>
              <Text style={styles.buttonLabel}>♧</Text>
            </Pressable>
            <Pressable style={styles.optionButton}>
              <Text style={styles.buttonLabel}>♡</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Menu>
      <Animated.View
        style={[{
          ...styles.fullWidth,
          transform: [{ translateY: showFull }],
        }]}
      >
        <AgentDetailFull
          shouldShow={shouldShow && !showPreview}
          item={item}
          marginTop={marginHeight}
          top={windowHeight * -1}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column'
  },
  preview: {
    width: '100%',
    // borderTopWidth: 1,
    // borderColor: '#151515c3',
    backgroundColor: '#151515c3',
  },
  fullWidth: {
    width: '100%'
  },
  optionsContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex'
  },
  optionButton: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#00000055',
    borderColor: '#ffffff22'
  },
  buttonLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '100',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffff',
    height: '100%',
    width: '100%',
  }
});

AgentDetail.defaultProps = {
  shouldShow: false,
  showPreview: true,
  item: {},
  onOpenFull: (() => {}),
  onClosePreview: (() => {}),
  onPressCreate: (() => {}),
  onClose: (() => {}),
  overlayRatio: 0.71,
  transitionDuration: 150,
};

export default AgentDetail;
