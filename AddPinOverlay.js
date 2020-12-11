import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
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
      {!isDraggingMap && (
        <View style={styles.topOverlay}>
          <Text style={styles.topText}>
            Drop a spot
          </Text>
          <OptionButton
            onPress={() => onPressCancelButton()}
            containerStyle={styles.cancelButtonContainer}
            buttonStyle={styles.cancelButton}
            iconStyle={styles.cancelIcon}
            iconSource={require('./icons/cancel.png')}
          />
        </View>
      )}
      <View style={styles.pin}>
        <View style={styles.pinFill}>
          <View style={styles.pinFillCircle} />
          <View style={styles.pinFillTriangle} />
        </View>
        <Image
          style={styles.pinImage}
          source={require('./icons/pin.png')}
        />
      </View>
      {!isDraggingMap && (
        <View style={styles.bottomOverlay}>
          <View style={styles.swipeTab} />
          <OptionButton
            onPress={() => onPressConfirmButton()}
            innerLabelText={'Confirm Location'}
            containerStyle={styles.confirmButtonContainer}
            buttonStyle={styles.confirmButton}
            labelStyle={styles.confirmButtonLabel}
            iconStyle={styles.largeButtonImage}
          />
        </View>
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
    bottom: 12,
    left: 12
  },
  cancelButton: {
    height: 24,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelIcon: {
    height: 32,
    width: 32
  },
  pin: {},
  pinFill: {
    alignSelf: 'center',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinFillCircle: {
    position: 'absolute',
    top: 1,
    height: 24,
    width: 24,
    borderRadius: 24,
    backgroundColor: 'ghostwhite',
  },
  pinFillTriangle: {
    position: 'absolute',
    top: 18,
    borderTopWidth: 19,
    borderRightWidth: 11,
    borderBottomWidth: 0,
    borderLeftWidth: 11,
    borderColor: 'transparent',
    borderTopColor: 'ghostwhite'
  },
  pinImage: {
    height: 40,
    width: 40
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
    alignItems: 'center',
  },
  confirmButton: {
    height: 64,
    height: 48,
    width: '88%',
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
  }
});

export default AddPinOverlay;
