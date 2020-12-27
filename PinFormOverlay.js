import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
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
import Pin from './Pin';
import OptionButton from './OptionButton';

const PinFormOverlay = (props) => {

  const {
    shouldShowPin,
    shouldShowOverlays,
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

  // pin color
  const [pinColor, setPinColor] = useState(null);

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
  const beforeMoveTop = shouldShowOverlays ? -topHeight : 0;
  const afterMoveTop = shouldShowOverlays ? 0 : -topHeight;
  const beforeMoveBottom = shouldShowOverlays ? bottomHeight : 0;
  const afterMoveBottom = shouldShowOverlays ? 0 : bottomHeight;
  const beforeMovePin = shouldShowPin ? -500 : 0;
  const afterMovePin = shouldShowPin ? 0 : -500;

  // translation animations for show/hide events
  const moveTop = useRef(new Animated.Value(beforeMoveTop)).current;
  const moveBottom = useRef(new Animated.Value(beforeMoveBottom)).current;
  const movePin = useRef(new Animated.Value(beforeMovePin)).current;
  const transitionDuration = 200;

  // middle overlay components
  const [pinOverlay, setPinOverlay] = useState(styles.pinOverlay);
  const [pinColorOverlay, setPinColorOverlay] = useState(styles.selectColorOverlay);

  // reset form after overlay is dismissed on submission
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // drop create pin into view
  useEffect(() => {
    // translate create pin into or out of view
    Animated.spring(
      movePin, {
        toValue: afterMovePin,
        duration: transitionDuration,
        useNativeDriver: true,
      }
    ).start(() => {
      if (!shouldShowPin) {
        // reset inputs
        setPinColor();
      }
    });
  }, [shouldShowPin]);

  // translate overlays on/off-screen
  useEffect(() => {
      // enable color overlay
      if (shouldShowOverlays) {
        setPinColorOverlay(styles.selectColorOverlay);
      }
      // translate top overlay into or out of view
      Animated.timing(
        moveTop, {
          toValue: afterMoveTop,
          duration: transitionDuration,
          easing: Easing.easeOutExpo,
          useNativeDriver: true,
        }
      ).start(() => {
        if (!shouldShowOverlays) {
          // disable select color container
          setPinColorOverlay(styles.hidden);
        }
      });
      // translate bottom overlay into or out of view
      Animated.timing(
        moveBottom, {
          toValue: afterMoveBottom,
          duration: transitionDuration,
          easing: Easing.easeOutExpo,
          useNativeDriver: true,
        }
      ).start();
  }, [shouldShowOverlays, afterMoveBottom, moveBottom]);

  // hide create pin before translating overlay if form is submitted
  useEffect(() => {
    const pinStyle = isSubmitted ? styles.hidden : styles.pinOverlay;
    setPinOverlay(pinStyle);

    if (isSubmitted) {
      const timer = setTimeout(() => {
        setPinColor();
        setIsSubmitted(false);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

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
      setBottomBuffer(inputsHeight + keyboardHeight);

      // shift up the bottom overlay so the inputs remain visible
      Animated.timing(
        keyboardShift, {
          toValue: inputsBehindKeyboard,
          duration: transitionDuration,
          easing: Easing.easeOutExpo,
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
        easing: Easing.easeOutExpo,
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
      description: description,
      pinColor: pinColor,
    };

    // TODO validate form
    setIsSubmitted(true);
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
      <Animated.View style={[pinOverlay, { transform: [{ translateY : movePin }] }]}>
        <Pin color={pinColor} />
      </Animated.View>
      <View style={pinColorOverlay}>
        <View style={styles.selectColorContainer}>
          <View style={styles.selectColorPopover}>
            <OptionButton
              onPress={() => setPinColor('#5e5ce6')}
              containerStyle={styles.selectColorButtonContainer}
              buttonStyle={[styles.selectColorButton, styles.colorPurple]}
              shouldShow={shouldShowOverlays}
              hidePosition={{ x: -500, y: 0 }}
              showPosition={{ x: 0, y: 0 }}
              touchDownFeedbackStyle={[styles.selectColorButtonTouchDown, styles.colorPurple]}
              touchUpFeedbackStyle={[styles.selectColorButtonTouchUp, styles.colorPurple]}
              shouldAnimateOnPressOutOpacity
              shouldAnimateOnPressOutScale
              beforePressOutScale={1}
              afterPressOutScale={1.1}
            />
            <OptionButton
              onPress={() => setPinColor('#ff375f')}
              containerStyle={styles.selectColorButtonContainer}
              buttonStyle={[styles.selectColorButton, styles.colorPink]}
              shouldShow={shouldShowOverlays}
              hidePosition={{ x: -500, y: 0 }}
              showPosition={{ x: 0, y: 0 }}
              touchDownFeedbackStyle={[styles.selectColorButtonTouchDown, styles.colorPink]}
              touchUpFeedbackStyle={[styles.selectColorButtonTouchUp, styles.colorPink]}
              shouldAnimateOnPressOutOpacity
              shouldAnimateOnPressOutScale
              beforePressOutScale={1}
              afterPressOutScale={1.1}
            />
            <OptionButton
              onPress={() => setPinColor('#ff9f0a')}
              containerStyle={styles.selectColorButtonContainer}
              buttonStyle={[styles.selectColorButton, styles.colorRed]}
              shouldShow={shouldShowOverlays}
              hidePosition={{ x: -500, y: 0 }}
              showPosition={{ x: 0, y: 0 }}
              touchDownFeedbackStyle={[styles.selectColorButtonTouchDown, styles.colorRed]}
              touchUpFeedbackStyle={[styles.selectColorButtonTouchUp, styles.colorRed]}
              shouldAnimateOnPressOutOpacity
              shouldAnimateOnPressOutScale
              beforePressOutScale={1}
              afterPressOutScale={1.1}
            />
            <OptionButton
              onPress={() => setPinColor('#f8f8ff')}
              containerStyle={styles.selectColorButtonContainer}
              buttonStyle={[styles.selectColorButton, styles.colorOrange]}
              shouldShow={shouldShowOverlays}
              hidePosition={{ x: -500, y: 0 }}
              showPosition={{ x: 0, y: 0 }}
              touchDownFeedbackStyle={[styles.selectColorButtonTouchDown, styles.colorOrange]}
              touchUpFeedbackStyle={[styles.selectColorButtonTouchUp, styles.colorOrange]}
              shouldAnimateOnPressOutOpacity
              shouldAnimateOnPressOutScale
              beforePressOutScale={1}
              afterPressOutScale={1.1}
            />
            <OptionButton
              onPress={() => setPinColor('transparent')}
              containerStyle={styles.selectColorButtonContainer}
              buttonStyle={[styles.selectColorButton, styles.colorTransparent]}
              shouldShow={shouldShowOverlays}
              hidePosition={{ x: -500, y: 0 }}
              showPosition={{ x: 0, y: 0 }}
              touchDownFeedbackStyle={[styles.selectColorButtonTouchDown, styles.colorTransparent]}
              touchUpFeedbackStyle={[styles.selectColorButtonTouchUp, styles.colorTransparent]}
              shouldAnimateOnPressOutOpacity
              shouldAnimateOnPressOutScale
              beforePressOutScale={1}
              afterPressOutScale={1.1}
            />
          </View>
        </View>
      </View>
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
  selectColorOverlay: {
    marginTop: 'auto',
    bottom: 30,
    // backgroundColor: '#33ee1133',
  },
  colorPurple: {
    backgroundColor: '#5e5ce6aa',
  },
  colorPink: {
    backgroundColor: '#ff375faa',
  },
  colorRed: {
    backgroundColor: '#ff9f0aaa',
  },
  colorOrange: {
    backgroundColor: '#f8f8ffaa',
  },
  colorTransparent: {
    backgroundColor: 'transparent',
    borderColor: '#ffffffbb',
    borderWidth: 1,
  },
  pinOverlay: {
    alignSelf: 'center',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    display: 'none'
  },
  selectColorContainer: {
    alignSelf: 'center',
    // backgroundColor: '#15151588',
  },
  selectColorPopover: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectColorButtonContainer: {
    // padding: 6,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#15151588',
  },
  selectColorButton: {
    margin: 4,
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#151515c3',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.5
  },
  selectColorButtonTouchDown: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectColorButtonTouchUp: {
    position: 'absolute',
    height: 32,
    width: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectPinContainer: {
    alignSelf: 'center',
    position: 'absolute',
    height: '100%',
    width: 56,
  },
  selectPinButton: {
    height: '100%',
    width: '100%',
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
