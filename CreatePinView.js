import React, { useState } from 'react';
import {
  View,
  Pressable,
  Image,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import AddPinOverlay from './AddPinOverlay';
import Menu from './Menu';
import OptionButton from './OptionButton';

const CreatePinView = (props) => {

  const [isLocationConfirmed, setIsLocationConfirmed] = useState(true);

  const {
    shouldShow,
    isDraggingMap,
    currentRegion,
    onPressCancelButton,
    onPressConfirmButton
  } = props;

  const region = currentRegion ?? { latitude: 0, longitude: 0 };
  const latitude = region.latitude.toFixed(6);
  const longitude = region.longitude.toFixed(6);

  return (
    <>
      <AddPinOverlay
        shouldShow={shouldShow && !isLocationConfirmed}
        isDraggingMap={isDraggingMap}
        onPressCancelButton={() => onPressCancelButton()}
        onPressConfirmButton={() => setIsLocationConfirmed(true)}
      />
      <Menu
        shouldShow={shouldShow && isLocationConfirmed}
        showDefaultCloseButton={false}
      >
        <View style={styles.menuContent}>
          <View style={styles.topOverlay}>
            <Text style={styles.topText}>
              Create
            </Text>
            <OptionButton
              onPress={() => setIsLocationConfirmed(false)}
              containerStyle={styles.backButtonContainer}
              buttonStyle={styles.backButton}
              iconStyle={styles.backIcon}
              iconTouchStyle={styles.backIconTouch}
              iconSource={require('./icons/cancel.png')}
              iconTouchSource={require('./icons/cancel-touch.png')}
              iconTouchBackgroundStyle={styles.backIconTouchContainer}
              touchDownFeedbackStyle={{}}
              touchUpFeedbackStyle={{}}
            />
          </View>
          <View style={styles.coordinateContainer}>
            <Text style={styles.leftAlignCoordinateLabelText}>{'Latitude'}</Text>
            <Text style={styles.rightAlignCoordinateLabelText}>{'Longitude'}</Text>
            <Text style={styles.leftAlignCoordinateValueText}>{latitude}</Text>
            <Text style={styles.rightAlignCoordinateValueText}>{longitude}</Text>
          </View>
          <View style={styles.photoContainer}>
            <Text style={styles.photoAddText}>Add a photo</Text>
            <View style={styles.photoIconContainer}>
              <Image style={styles.photoIcon} source={require('./icons/photo.png')} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{'Title'}</Text>
            <Text style={styles.subtitleText}>{'Description'}</Text>
          </View>
          <View style={styles.bottomOverlay}>
            <OptionButton
              onPress={() => onPressConfirmButton()}
              innerLabelText={'Confirm'}
              containerStyle={styles.confirmButtonContainer}
              buttonStyle={styles.confirmButton}
              labelStyle={styles.confirmButtonLabel}
              touchDownFeedbackStyle={styles.confirmButtonPressInFeedback}
              touchUpFeedbackStyle={{}}
            />
          </View>
        </View>
      </Menu>
    </>
  );
}

const styles = StyleSheet.create({
  menuContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    paddingTop: 60,
    paddingBottom: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3',
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
    bottom: 1,
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
  backIconTouchContainer: {
    height: 26,
    width: 26
  },
  backIconTouch: {
    height: 32,
    width: 32
  },
  coordinateContainer: {
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  leftAlignCoordinateLabelText: {
    paddingLeft: 3,
    height: 12,
    width: '50%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffffaa'
  },
  leftAlignCoordinateValueText: {
    marginTop: 6,
    paddingLeft: 3,
    height: 14,
    width: '50%',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  rightAlignCoordinateLabelText: {
    paddingLeft: 3,
    height: 12,
    width: '50%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'right',
    textAlignVertical: 'center',
    color: '#ffffffaa'
  },
  rightAlignCoordinateValueText: {
    marginTop: 6,
    paddingLeft: 3,
    height: 14,
    width: '50%',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'right',
    color: 'white'
  },
  photoContainer: {
    margin: 10,
    height: 140,
    width: '100%',
    backgroundColor: '#151515c3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoAddText: {
    fontSize: 12,
    color: '#ffffffbb'
  },
  photoIconContainer: {
    height: 88,
    width: 88,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange'
  },
  photoIcon: {
    height: 80,
    width: 80,
    opacity: 0.7,
    // backgroundColor: 'green'
  },
  titleContainer: {
    margin: 12,
    marginTop: 0,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  titleText: {
    width: '100%',
    fontWeight: '500',
    color: 'white'
  },
  subtitleText: {
    marginTop: 2,
    fontSize: 12,
    color: '#ffffff88'
  },
  bottomOverlay: {
    marginTop: 'auto',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3',
  },
  confirmButtonContainer: {
    marginHorizontal: 16,
    marginVertical: 32,
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

export default CreatePinView;
