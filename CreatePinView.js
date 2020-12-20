import React, { useState, useEffect } from 'react';
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
  const [title, setTitle] = useState('Moonsugar Outpost');
  const [description, setDescription] = useState('Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace div.');
  const [isPublic, setIsPublic] = useState(false);

  const onPressPublic = () => { setIsPublic(true) }
  const onPressPrivate = () => { setIsPublic(false) }

  const [publicStyle, setPublicStyle] = useState([styles.publicAccessSegment]);
  const [privateStyle, setPrivateStyle] = useState([styles.publicAccessSegmentSelected]);

  const [publicLabelStyle, setPublicLabelStyle] = useState([styles.publicAccessLabel]);
  const [privateLabelStyle, setPrivateLabelStyle] = useState([styles.publicAccessLabelSelected]);

  // set segmented control styles
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
    padding: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#88004433'
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
    borderBottomColor: '#ffffff33',
    textAlignVertical: 'top',
    color: 'white',
    backgroundColor: '#66334499'
  },
  publicAccessToggleContainer: {
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    backgroundColor: '#11339933'
  },
  publicAccessToggle: {
    borderWidth: 1,
    borderColor: '#aeaeae',
    display: 'flex',
    flexDirection: 'row',
  },
  publicAccessSegmentSelected: {
    width: '50%',
    backgroundColor: '#aeaeae'
  },
  publicAccessSegment: {
    width: '50%',
    borderColor: 'white',
  },
  publicAccessLabelSelected: {
    height: 24,
    width: '100%',
    lineHeight: 24,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#151515c3',
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
