import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  ScrollView,
  Pressable,
  Image,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';

const PinFormOverlay = (props) => {

  const {
    shouldShow,
    isDraggingMap,
    currentRegion,
    onRepositionPin,
    onPressConfirmButton,
  } = props;

  const titlePlaceholder = '';
  const descriptionPlaceholder = '';

  // const titlePlaceholder = 'Moonsugar Outpost';
  // const descriptionPlaceholder =
  //   'Grab yourself something unbearably refreshing to while away the harrowing rapture of time.';

  // title input value
  const [title, setTitle] = useState(titlePlaceholder);

  // description input value
  const [description, setDescription] = useState(descriptionPlaceholder);

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

  // heights of top and bottom overlays
  const [topHeight, setTopHeight] = useState(overlayHeight);
  const [bottomHeight, setBottomHeight] = useState(overlayHeight);
  const [bottomBuffer, setBottomBuffer] = useState(bottomHeight);

  // initial/final positions of overlay animations
  const beforeMoveTop = shouldShow ? -topHeight : 0;
  const afterMoveTop = shouldShow ? 0 : -topHeight;
  const beforeMoveBottom = shouldShow ? bottomHeight : 0;
  const afterMoveBottom = shouldShow ? 0 : bottomHeight;

  // translation animations for show/hide events
  const moveTop = useRef(new Animated.Value(beforeMoveTop)).current;
  const moveBottom = useRef(new Animated.Value(beforeMoveBottom)).current;
  const transitionDuration = 200;

  // translate bottom overlay if keyboard blocks text inputs container
  const inputsContainer = useRef(null);
  const keyboardShift = useRef(new Animated.Value(0)).current;

  // combine animation values for show/hide events and for keyboard events
  const [translateBottom, setTranslateBottom] = useState(moveBottom);

  // stagger dismissals of keyboard and overlay if user presses back while editing
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  // listen for keyboard events
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

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

  // update animation value for bottom overlay translation
  useEffect(() => {
    const combinedTranslate = Animated.add(moveBottom, keyboardShift);
    setTranslateBottom(combinedTranslate);
  }, [moveBottom, keyboardShift]);

  // hide keyboard if user touches map
  useEffect(() => {
    if (isDraggingMap) {
      Keyboard.dismiss();
    }
  }), [isDraggingMap];

  // dismiss overlay after keyboard
  useEffect(() => {
    if (shouldHide) {
      Keyboard.dismiss();
      const timer = setTimeout(() => {
        onRepositionPin();
        setShouldHide(false);
      }, 600); // TODO be precise about this
      return () => {
        clearTimeout(timer);
      }
    }
  }, [shouldHide]);

  // slide up bottom overlay to maintain visibility of text inputs container
  const onKeyboardDidShow = (event) => {
    setIsKeyboardOpen(true);
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;

    if (!inputsContainer || !inputsContainer.current) return;

    inputsContainer.current.measure((_X, _Y, _w, height, _pX, pageY) => {
      // calculate height of entire viewport that is not behind the keyboard
      const viewHeight = windowHeight - keyboardHeight;

      // cache height and vertical position of inputs container
      const inputsHeight = height;
      const inputsTop = pageY;

      // calculate vertical position of the bottom of inputs container
      const inputsBottom = inputsHeight + inputsTop;

      // calculate the height of inputs container behind the keyboard
      const inputsBehindKeyboard = viewHeight - inputsBottom;

      // do nothing when keyboard does not overlap inputs container at all
      if (inputsBehindKeyboard >= 0) return;

      // set height of bottom overlay buffer
      setBottomBuffer(inputsHeight + keyboardHeight)

      // shift up the bottom overlay so the inputs remain visible
      Animated.timing(
        keyboardShift, {
          toValue: inputsBehindKeyboard,
          duration: transitionDuration,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  // slide down bottom overlay when keyboard hides
  const onKeyboardDidHide = () => {
    Animated.timing(
      keyboardShift, {
        toValue: 0,
        duration: transitionDuration,
        useNativeDriver: true,
      }
    ).start(() => {
      // reset bottom overlay buffer height
      setBottomBuffer(bottomHeight);
      setIsKeyboardOpen(false);
    });
  }

  // hide keyboard before repositioning pin
  const onPressBack = () => {
    if (isKeyboardOpen) {
      setShouldHide(true);
      return;
    }
    onRepositionPin();
  }

  // handle press on public segment of access toggle
  const onPressPublic = () => {
    setIsPublic(true);
  }

  // handle press on private segment of access toggle
  const onPressPrivate = () => {
    setIsPublic(false);
  }

  // add pin to main map view
  const onSubmit = () => {
    const pin = {
      title: title,
      description: description
    };

    // TODO validate form
    onPressConfirmButton(pin);
  }

  const region = currentRegion ?? { latitude: 0, longitude: 0 };
  const latitude = region.latitude.toFixed(6);
  const longitude = region.longitude.toFixed(6);

  return (
    <>
      <Animated.View
        onLayout={(e) => setTopHeight(e.nativeEvent.layout.height)}
        style={[styles.topOverlay, {
          transform: [{ translateY: moveTop }]
        }]}
      >
        <ScrollView style={styles.topContents}>
          <Text style={styles.topText}>Create</Text>
          <View style={styles.coordinateContainer}>
            <Text style={styles.latitudeLabelText}>Latitude</Text>
            <Text style={styles.longitudeLabelText}>Longitude</Text>
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
        </ScrollView>
        <OptionButton
          onPress={() => onPressBack()}
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
      </Animated.View>
      <Animated.View
        onLayout={(e) => setBottomHeight(e.nativeEvent.layout.height)}
        style={[styles.bottomOverlay, {
          transform: [{ translateY: translateBottom }]
        }]}>
        <ScrollView
          ref={inputsContainer}
          style={styles.textInputsContainer}
        >
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
        </ScrollView>
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
        <View style={styles.confirmButtonContainer}>
          <Pressable
            style={styles.confirmButton}
            onPress={() => onSubmit()}
          >
            <Text style={styles.confirmButtonLabel}>Confirm</Text>
          </Pressable>
        </View>
        <View style={[styles.bottomOverlayBuffer, {
          top: bottomHeight,
          height: bottomBuffer
        }]} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    top: 0,
    paddingTop: 60,
    maxHeight: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#151515c3'
  },
  topContents: {},
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
    marginTop: 14,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: '#77771133'
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
    marginRight: -4,
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
    marginRight: -4,
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
    marginTop: 12,
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
    alignItems: 'center'
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
    // backgroundColor: '#151515c3'
  },
  photoIcon: {
    height: 60,
    width: 60,
    opacity: 0.7,
  },
  textInputsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    // backgroundColor: '#88004433'
  },
  textInputContainer: {
    padding: 12,
    display: 'flex',
    alignContent: 'center',
    // backgroundColor: '#2233ff44'
  },
  textInputLabel: {
    marginBottom: -12,
    height: 12,
    width: '100%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffffaa'
  },
  textInput: {
    paddingTop: 18,
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
    backgroundColor: '#151515c3'
  },
  bottomOverlayBuffer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#151515c3'
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

export default PinFormOverlay;
