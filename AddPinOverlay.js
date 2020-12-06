import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';

const AddPinOverlay = (props) => {

  const {
    shouldShow,
    isDraggingMap,
    isNamingPin,
    newPinName,
    setNewPinName,
    onPressCancelButton,
    onPressConfirmButton,
  } = props;

  if (!shouldShow) {
    return <></>;
  }

  return (
    <>
      {!isDraggingMap && (
        <Text style={styles.dragMapText}>
          Drag map to position new pin
        </Text>
      )}
      <View style={styles.createPinContainer}>
        <Image
          style={styles.createPinImage}
          source={require('./icons/map-pin.png')}
        />
        {isNamingPin && !isDraggingMap && (
          <View style={styles.newPinNameContainer}>
            <TextInput
              style={styles.newPinNameInput}
              value={newPinName}
              placeholder={'Name this pin'}
              placeholderTextColor={'#ffffff7e'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              maxLength={28}
              onChangeText={(text) => setNewPinName(text)}
            />
          </View>
        )}
      </View>
      {!isDraggingMap && (
        <View style={styles.confirmCancelButtonsContainer}>
          <OptionButton
            onPress={() => onPressCancelButton()}
            iconImageName={require('./icons/cancel.png')}
            containerStyle={styles.cancelButtonContainer}
            buttonStyle={styles.cancelButton}
            iconStyle={styles.largeButtonImage}
          />
          <OptionButton
            onPress={() => onPressConfirmButton()}
            iconImageName={require('./icons/confirm.png')}
            containerStyle={styles.confirmButtonContainer}
            buttonStyle={styles.confirmButton}
            iconStyle={styles.largeButtonImage}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dragMapText: {
    position: 'absolute',
    top: 64,
    height: 30,
    width: '100%',
    backgroundColor: '#000000cf',
    fontSize: 16,
    lineHeight: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  },
  createPinContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createPinImage: {
    position: 'relative',
    top: 6.4,
    height: 40,
    width: 40
  },
  newPinNameContainer: {
    position: 'absolute',
    bottom: 40,
    minWidth: 132,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  newPinNameInput: {
    height: 30,
    width: '100%',
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#000000cf',
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: 'white'
  },
  confirmCancelButtonsContainer: {
    position: 'absolute',
    bottom: 32,
    display: 'flex',
    flexDirection: 'row'
  },
  cancelButtonContainer: {
    marginRight: 32
  },
  confirmButtonContainer: {
    marginLeft: 32
  },
  cancelButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: '#be0000cf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: '#008800cf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeButtonImage: {
    height: 42,
    width: 42
  }
});

export default AddPinOverlay;
