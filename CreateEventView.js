import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import Button from './Button';

const CreateEventView = (props) => {

  const {
    shouldShow,
    pin,
    onPressCancelButton,
  } = props;

  const onPressCancel = onPressCancelButton ?? (() => {});

  // title input value
  const [title, setTitle] = useState('');

  if (pin === undefined) {
    return <></>;
  }

  return (
    <Menu
      shouldShow={shouldShow}
      title={'New Event'}
      backgroundColor={'#151515c3'}
      showDefaultCloseButton={false}
    >
      <Button
        onPress={() => onPressCancel()}
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
      <View style={styles.menuContent}>
        <ScrollView
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
            <Text style={styles.textInputLabel}>Location</Text>
            <TextInput
              style={styles.disabledInput}
              value={pin.title}
              maxLength={44}
              editable={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Start</Text>
            <TextInput
              style={styles.disabledInput}
              value={''}
              maxLength={44}
              editable={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>End</Text>
            <TextInput
              style={styles.disabledInput}
              value={''}
              maxLength={44}
              editable={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Type</Text>
            <TextInput
              style={styles.disabledInput}
              value={''}
              maxLength={44}
              editable={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>Agents</Text>
            <TextInput
              style={styles.disabledInput}
              value={''}
              maxLength={44}
              editable={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </ScrollView>
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    height: 16,
    width: 16
  },
  backIconTouch: {
    position: 'absolute',
    height: 16,
    width: 16,
    opacity: 0.5
  },
  menuContent: {
    top: 106,
    height: '100%',
    width: '100%'
    // backgroundColor: '#88004433'
  },
  textInputsContainer: {
    paddingHorizontal: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  },
  textInputContainer: {
    padding: 12,
    display: 'flex',
    alignContent: 'center'
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
    color: 'white'
  },
  disabledInput: {
    paddingTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff22',
    textAlignVertical: 'top',
    color: '#ffffffaa'
  }
});

export default CreateEventView;
