import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Image,
  Text,
  TextInput,
  PanResponder,
  Keyboard,
  StyleSheet
} from 'react-native';
import AddPinOverlay from './AddPinOverlay';
import Menu from './Menu';
import OptionButton from './OptionButton';

const CreatePinView = (props) => {

  // toggle overlay for positioning new pin
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

  // title input value
  const [title, setTitle] = useState('Moonsugar Outpost');

  // description input value
  const [description, setDescription] = useState(
    'Unbearably refreshing to visit. ' +
    'Untold indulgences lie hidden within this divine oasis. ' +
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

  // drag confirmation pin
  const pan = useRef(new Animated.ValueXY()).current;

  // clamp vertical translation of pin, interpolated from gesture
  const dragValue = pan.y.interpolate({
    inputRange: [0, 60, Infinity],
    outputRange: [0, 60, 60]
  });

  // allow vertical drag of confirmation pin
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          y: pan.y._value
        });
      },
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy > 0) {
          return Animated.event(
            [
              null,
              { dy: pan.y }
            ],
            { useNativeDriver: false }
            )(event, gesture)
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        Animated.spring(
          pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }
        ).start();
      }
    })
  ).current;

  // handle press on back button in top left corner
  const onPressBack = () => {
    Keyboard.dismiss();
    setIsLocationConfirmed(false);
  }

  // handle press on public segment of access toggle
  const onPressPublic = () => {
    Keyboard.dismiss();
    setIsPublic(true);
  }

  // handle press on private segment of access toggle
  const onPressPrivate = () => {
    Keyboard.dismiss();
    setIsPublic(false)
  }

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
        <Pressable style={styles.menuContent}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.topOverlay}>
            <Text style={styles.topText}>
              Create
            </Text>
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
          </View>
          <View style={styles.coordinateContainer}>
            <Text style={styles.leftAlignCoordinateLabelText}>{'Latitude'}</Text>
            <Text style={styles.rightAlignCoordinateLabelText}>{'Longitude'}</Text>
            <Text style={styles.leftAlignCoordinateValueText}>{latitude}</Text>
            <Text style={styles.rightAlignCoordinateValueText}>{longitude}</Text>
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
        </Pressable>
        <View style={styles.bottomOverlay}>
          <Animated.View
            style={{
              transform: [{ translateY: dragValue }]
            }}
            {...panResponder.panHandlers}
          >
            <View style={styles.confirmPin}>
              <View style={styles.pinFill}>
                <View style={[styles.pinUpperColor, {
                  'backgroundColor': 'ghostwhite'
                }]}/>
                <View style={[styles.pinLowerColor, {
                  'borderTopColor': 'ghostwhite'
                }]}/>
              </View>
              <Image
                style={styles.pinImage}
                source={require('./icons/pin.png')}
              />
            </View>
          </Animated.View>
          <Text style={styles.confirmText}>Drag down to confirm</Text>
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
    // backgroundColor: '#151515c3',
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
    justifyContent: 'space-between',
    // backgroundColor: '#77771133',
  },
  leftAlignCoordinateLabelText: {
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
    height: 14,
    width: '50%',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  rightAlignCoordinateLabelText: {
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
    marginHorizontal: 12,
    marginTop: 0,
    paddingHorizontal: 12,
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
  publicAccessToggleContainer: {
    margin: 12,
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
  bottomOverlay: {
    marginTop: 'auto',
    paddingBottom: 42,
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#151515c3',
  },
  confirmPin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pinFill: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinUpperColor: {
    alignSelf: 'center',
    position: 'absolute',
    top: 1.5,
    height: 36,
    width: 36,
    borderRadius: 36,
    backgroundColor: 'ghostwhite',
  },
  pinLowerColor: {
    alignSelf: 'center',
    position: 'absolute',
    top: 27,
    borderTopWidth: 28.5,
    borderRightWidth: 16.5,
    borderBottomWidth: 0,
    borderLeftWidth: 16.5,
    borderColor: 'transparent',
    borderTopColor: 'ghostwhite'
  },
  pinImage: {
    height: 60,
    width: 60
  },
  confirmText: {
    marginTop: 44,
    height: 24,
    width: '100%',
    lineHeight: 24,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffffaa'
  }
});

export default CreatePinView;
