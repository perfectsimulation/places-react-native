import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Pin from './Pin';
import OptionButton from './OptionButton';

const AddPinOverlay = (props) => {

  const {
    shouldShow,
    isDraggingMap,
    onPressCancelButton,
    onPressConfirmButton,
  } = props;

  // TODO maybe add fade in/out
  if (!shouldShow) {
    return <></>;
  }

  return (
    <>
      <Pin
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      />
      {!isDraggingMap && (
        <>
          <View style={styles.topOverlay}>
            <Text style={styles.topText}>
              Drop a spot
            </Text>
            <OptionButton
              onPress={() => onPressCancelButton()}
              containerStyle={styles.cancelButtonContainer}
              buttonStyle={styles.cancelButton}
              iconStyle={styles.cancelIcon}
              iconTouchStyle={styles.cancelIconTouch}
              iconSource={require('./icons/cancel.png')}
              iconTouchSource={require('./icons/cancel-touch.png')}
              iconTouchBackgroundStyle={styles.cancelIconTouchContainer}
              touchDownFeedbackStyle={{}}
              touchUpFeedbackStyle={{}}
            />
          </View>
          <View style={styles.bottomOverlay}>
            <View style={styles.swipeTab} />
            <OptionButton
              onPress={() => onPressConfirmButton()}
              innerLabelText={'Confirm Location'}
              containerStyle={styles.confirmButtonContainer}
              buttonStyle={styles.confirmButton}
              labelStyle={styles.confirmButtonLabel}
              iconStyle={styles.largeButtonImage}
              touchDownFeedbackStyle={styles.confirmButtonPressInFeedback}
              touchUpFeedbackStyle={{}}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    position: 'absolute',
    top: 0,
    paddingTop: 60,
    paddingBottom: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3'
  },
  topText: {
    paddingLeft: 3,
    height: 16,
    width: '100%',
    fontSize: 16,
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  cancelButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 1,
    left: 3
  },
  cancelButton: {
    height: 46,
    width: 46,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelIcon: {
    height: 16,
    width: 16
  },
  cancelIconTouchContainer: {
    height: 26,
    width: 26
  },
  cancelIconTouch: {
    height: 32,
    width: 32
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3',
  },
  swipeTab: {
    position: 'absolute',
    alignSelf: 'center',
    height: 2,
    width: '7%',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ffffff27'
  },
  confirmButtonContainer: {
    margin: 16,
    marginTop: 32,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    height: 48,
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000bb'
  },
  confirmButtonLabel: {
    position: 'absolute',
    alignSelf: 'center',
    paddingLeft: 3,
    height: 16,
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  confirmButtonPressInFeedback: {
    height: '120%',
    width: '108%',
    backgroundColor: 'black',
  }
});

export default AddPinOverlay;
