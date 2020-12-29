import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';

const PinPlacementOverlay = (props) => {
  const {
    shouldShow,
    isDraggingMap,
    onConfirmLocation,
    onPressCancelButton
  } = props;

  // initial/final positions of overlay animations
  const beforeMoveTop = shouldShow ? -88 : 0;
  const afterMoveTop = shouldShow ? 0 : -88;
  const beforeMoveBottom = shouldShow ? 108 : 0;
  const afterMoveBottom = shouldShow ? 0 : 108;

  // translation animations
  const moveTop = useRef(new Animated.Value(beforeMoveTop)).current;
  const moveBottom = useRef(new Animated.Value(beforeMoveBottom)).current;
  const transitionDuration = 300;

  // translate overlays on/off-screen
  useEffect(() => {
    // translate top overlay into or out of view
    Animated.timing(
      moveTop, {
        toValue: afterMoveTop,
        duration: transitionDuration,
        useNativeDriver: true,
      }
    ).start();
    // translate bottom overlay into or out of view
    Animated.timing(
      moveBottom, {
        toValue: afterMoveBottom,
        duration: transitionDuration,
        useNativeDriver: true,
      }
    ).start();
  }, [shouldShow, afterMoveBottom, moveBottom]);

  // hide the overlays when user is actively changing region
  const top = isDraggingMap ? styles.hidden : styles.topOverlay;
  const bottom = isDraggingMap ? styles.hidden : styles.bottomOverlay;

  return (
    <>
      <Animated.View
        style={[top, {
          transform: [{ translateY: moveTop }]
        }]}
      >
        <Text style={styles.topText}>Drop a spot</Text>
        <OptionButton
          onPress={() => onPressCancelButton()}
          containerStyle={styles.backButtonContainer}
          buttonStyle={styles.backButton}
          iconStyle={styles.backIcon}
          iconTouchStyle={styles.backIconTouch}
          iconSource={require('./icons/cancel.png')}
          iconTouchSource={require('./icons/cancel.png')}
          buttonTouchStyle={styles.backButton}
          touchDownFeedbackStyle={{}}
          touchUpFeedbackStyle={{}}
        />
      </Animated.View>
      <Animated.View
        style={[bottom, {
          transform: [{ translateY: moveBottom }]
        }]}>
        <View style={styles.confirmContainer}>
          <OptionButton
            containerStyle={styles.confirmButtonContainer}
            onPress={() => onConfirmLocation()}
            innerLabelText={'Here'}
            labelStyle={styles.confirmButtonLabel}
            buttonStyle={styles.confirmButton}
            buttonTouchStyle={styles.confirmButtonTouch}
            touchDownFeedbackStyle={{}}
            touchUpFeedbackStyle={{}}
          >
          </OptionButton>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    paddingTop: 60,
    paddingBottom: 28,
    maxHeight: 88,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3'
  },
  topText: {
    paddingLeft: 3,
    height: 16,
    width: '100%',
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  backButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 45,
    left: 3
  },
  backButton: {
    height: 46,
    width: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    height: 16,
    width: 16
  },
  backIconTouch: {
    height: 16,
    width: 16,
    opacity: 0.5,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 12,
    paddingBottom: 48,
    maxHeight: 108,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#151515c3'
  },
  confirmContainer: {
    paddingHorizontal: 24,
    width: '100%',
  },
  confirmButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#77771133'
  },
  confirmButton: {
    height: 48,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  confirmButtonTouch: {
    position: 'absolute',
    height: 48,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff22',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  confirmButtonLabel: {
    alignSelf: 'center',
    paddingLeft: 3,
    height: 16,
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  }
});

export default PinPlacementOverlay;
