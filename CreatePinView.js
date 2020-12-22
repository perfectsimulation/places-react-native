import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Image,
  Text,
  TextInput,
  Keyboard,
  Dimensions,
  StyleSheet
} from 'react-native';
import Pin from './Pin';
import OptionButton from './OptionButton';

const CreatePinView = (props) => {

  const {
    shouldShow,
    isDraggingMap,
    currentRegion,
    onConfirmLocation,
    onRepositionPin,
    onPressCancelButton,
    onPressConfirmButton
  } = props;

  // toggle overlay components for positioning new pin
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

  // title input value
  const [title, setTitle] = useState('Moonsugar Outpost');

  // description input value
  const [description, setDescription] = useState(
    'Unbearably refreshing to visit. ' +
    'Untold indulgences await within this divine oasis. ' +
    'Something endless to while away the harrowing rapture of time.'
  );

  // selected segment of public access toggle
  const [isPublic, setIsPublic] = useState(false);

  // dynamic styles of public access segments
  const [publicStyle, setPublicStyle] = useState([styles.publicAccessSegment]);
  const [privateStyle, setPrivateStyle] = useState([styles.publicAccessSegmentSelected]);

  // dynamic styles of public access segment labels
  const [publicLabelStyle, setPublicLabelStyle] = useState([styles.publicAccessLabel]);
  const [privateLabelStyle, setPrivateLabelStyle] = useState([styles.publicAccessLabelSelected]);

  // TODO useWindowDimensions instead
  const window = Dimensions.get('window');
  const overlayHeight = window.height * 0.45;

  // initial/final positions of overlay animations
  const beforeShowTop = shouldShow ? -overlayHeight : 0;
  const afterShowTop = shouldShow ? 0 : -overlayHeight;
  const beforeShowBottom = shouldShow ? overlayHeight : 0;
  const afterShowBottom = shouldShow ? 0 : overlayHeight;

  // translation animation ref values
  const translateTopAnim = useRef(new Animated.Value(beforeShowTop)).current;
  const translateBottomAnim = useRef(new Animated.Value(beforeShowBottom)).current;
  const transitionDuration = 300;

  // trigger overlay translations
  const [shouldClose, setShouldClose] = useState(false);

  // translate overlays on/off-screen
  useEffect(() => {
      // translate top overlay into or out of view
      Animated.timing(
        translateTopAnim, {
          toValue: afterShowTop,
          duration: transitionDuration,
          useNativeDriver: true,
        }
      ).start();
      // translate bottom overlay into or out of view
      Animated.timing(
        translateBottomAnim, {
          toValue: afterShowBottom,
          duration: transitionDuration,
          useNativeDriver: true,
        }
      ).start();

  }, [shouldClose, afterShowBottom, translateBottomAnim]);

  // close this menu from this close button
  useEffect(() => {
    setShouldClose(!shouldShow);
  }, [shouldShow]);

  // set styles of public access toggle
  useEffect(() => {
    const publicSegment = isPublic ?
      styles.publicAccessSegmentSelected :
      styles.publicAccessSegment;

    const privateSegment = isPublic ?
      styles.publicAccessSegment :
      styles.publicAccessSegmentSelected;

    const publicLabel = isPublic ?
      styles.publicAccessLabelSelected :
      styles.publicAccessLabel;

    const privateLabel = isPublic ?
      styles.publicAccessLabel :
      styles.publicAccessLabelSelected;

      setPublicStyle(publicSegment);
      setPrivateStyle(privateSegment);
      setPublicLabelStyle(publicLabel);
      setPrivateLabelStyle(privateLabel);

  }), [isPublic];

  // handle press on cancel button
  const onPressCancel = () => {
    Keyboard.dismiss();
    setShouldClose(true);
    onPressCancelButton();
  }

  // handle press on back button in top left corner
  const onPressBack = () => {
    Keyboard.dismiss();
    setIsLocationConfirmed(false);
    onRepositionPin();
  }

  const confirmLocation = () => {
    Keyboard.dismiss();
    setIsLocationConfirmed(true);
    onConfirmLocation();
  }

  const onPressHeaderButton = isLocationConfirmed ?
    () => onPressBack() :
    () => onPressCancel();

  const onPressFooterButton = isLocationConfirmed ?
    () => onPressBack() :
    () => confirmLocation();

  // handle press on public segment of access toggle
  const onPressPublic = () => {
    Keyboard.dismiss();
    setIsPublic(true);
  }

  // handle press on private segment of access toggle
  const onPressPrivate = () => {
    Keyboard.dismiss();
    setIsPublic(false);
  }

  const region = currentRegion ?? { latitude: 0, longitude: 0 };
  const latitude = region.latitude.toFixed(6);
  const longitude = region.longitude.toFixed(6);

  const headerText = isLocationConfirmed ? 'Create' : 'Drop a spot';
  const confirmText = isLocationConfirmed ? 'Confirm' : 'Confirm location';
  const topOverlay = isDraggingMap ? styles.hidden : styles.topOverlay;
  const bottomOverlay = isDraggingMap ? styles.hidden : styles.bottomOverlay;
  const pin = shouldShow ? styles.pin : styles.hidden;

  return (
    <>
      <Animated.View
        style={[topOverlay, {
          transform: [{ translateY: translateTopAnim }]
        }]}
      >
        <Text style={styles.topText}>{headerText}</Text>
        <OptionButton
          onPress={() => onPressHeaderButton()}
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
        {isLocationConfirmed && (
          <>
            <View style={styles.coordinateContainer}>
              <Text style={styles.latitudeLabelText}>{'Latitude'}</Text>
              <Text style={styles.longitudeLabelText}>{'Longitude'}</Text>
              <Text style={styles.latitudeValueText}>{latitude}</Text>
              <Text style={styles.longitudeValueText}>{longitude}</Text>
            </View>
            <View style={styles.emptyPhotosContainer}>
              <View style={styles.photoContainer}>
                <Text style={styles.photoAddText}>Add a photo</Text>
                <View style={styles.photoIconContainer}>
                  <Image
                    style={styles.photoIcon}
                    source={require('./icons/add-photo.png')}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </Animated.View>
      <Animated.View
        style={[bottomOverlay, {
          transform: [{ translateY: translateBottomAnim }]
        }]}>
        {isLocationConfirmed && (
          <>
            <View style={styles.textInputsContainer}>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputLabel}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                  maxLength={44}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputLabel}>Description</Text>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                  scrollEnabled={false}
                  maxLength={280}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            </View>
            <View style={styles.publicAccessToggleContainer}>
              <View style={styles.publicAccessToggle}>
                <Pressable
                  style={publicStyle}
                  onPress={() => onPressPublic()}
                >
                  <Text style={publicLabelStyle}>Public</Text>
                </Pressable>
                <Pressable
                  style={privateStyle}
                  onPress={() => onPressPrivate()}
                >
                  <Text style={privateLabelStyle}>Private</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
        <View style={styles.confirmButtonContainer}>
          <Pressable
            style={styles.confirmButton}
            onPress={() => onPressFooterButton()}
          >
            <Text style={styles.confirmButtonLabel}>{confirmText}</Text>
          </Pressable>
        </View>
      </Animated.View>
      <Pin style={pin} />
    </>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  pin: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  topOverlay: {
    top: 0,
    paddingTop: 60,
    paddingBottom: 16,
    maxHeight: '45%',
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
    justifyContent: 'space-between',
    // backgroundColor: '#77771133',
  },
  latitudeLabelText: {
    height: 12,
    width: '50%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffffaa'
  },
  latitudeValueText: {
    marginTop: 6,
    height: 14,
    width: '50%',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  longitudeLabelText: {
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
  longitudeValueText: {
    marginTop: 6,
    height: 14,
    width: '50%',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'right',
    color: 'white'
  },
  emptyPhotosContainer: {
    marginVertical: 12,
    marginBottom: -16,
    height: 140,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515c3'
  },
  photosContainer: {
    marginVertical: 12,
    paddingLeft: 12,
    height: 140,
    width: '100%',
    // backgroundColor: '#151515c3',
    backgroundColor: '#ffffff88',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  photoContainer: {
    marginHorizontal: 12,
    height: '100%',
    width: '66%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoAddText: {
    paddingLeft: 2,
    fontSize: 12,
    color: '#ffffffbb'
  },
  photoIconContainer: {
    height: 66,
    width: 66,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#151515c3',
  },
  photoIcon: {
    height: 60,
    width: 60,
    opacity: 0.7,
    // backgroundColor: 'green'
  },
  textInputsContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // backgroundColor: '#88004433'
  },
  textInputContainer: {
    padding: 12,
    width: '100%',
    display: 'flex',
    alignContent: 'center'
  },
  textInputLabel: {
    height: 12,
    width: '100%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffffaa'
  },
  textInput: {
    marginTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff22',
    textAlignVertical: 'top',
    color: 'white',
    // backgroundColor: '#66334499'
  },
  bottomOverlay: {
    marginTop: 'auto',
    bottom: 0,
    maxHeight: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#151515c3',
  },
  publicAccessToggleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    // backgroundColor: '#11339933'
  },
  publicAccessToggle: {
    borderWidth: 1,
    borderColor: 'white',
    borderColor: '#ffffff88',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#00000055',
  },
  publicAccessSegmentSelected: {
    width: '50%',
    backgroundColor: '#ffffff88',
  },
  publicAccessSegment: {
    width: '50%',
  },
  publicAccessLabelSelected: {
    height: 24,
    width: '100%',
    lineHeight: 24,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black'
  },
  publicAccessLabel: {
    height: 24,
    width: '100%',
    lineHeight: 24,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  confirmButtonContainer: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 24,
    marginBottom: 36,
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

export default CreatePinView;
