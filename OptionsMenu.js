import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import OptionButton from './OptionButton';

const OptionsMenu = (props) => {

  const {
    shouldShow,
    onPressActivityButton, // top left
    onPressExploreButton,  // top right
    onPressPlacesButton,   // middle
    onPressUserButton,    // bottom left
    onPressAddButton,      // bottom right
    onCloseOptionsMenu
  } = props;

  const onActivity = onPressActivityButton ?? (() => {});
  const onExplore = onPressExploreButton ?? (() => {});
  const onPlaces = onPressPlacesButton ?? (() => {});
  const onUser = onPressUserButton ?? (() => {});
  const onAdd = onPressAddButton ?? (() => {});
  const onClose = onCloseOptionsMenu ?? (() => {});

  return (
    <>
      <Menu
        shouldShow={shouldShow}
        onClose={() => onClose()}
      >
        <OptionButton
          onPress={() => onActivity()}
          labelText={'Activity'}
          iconSource={require('./icons/activity.png')}
          iconTouchSource={require('./icons/activity-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.activityButtonImage}
          iconTouchStyle={styles.activityButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: -120, y: -300 }}
          hidePosition={{ x: 0, y: 0 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onExplore()}
          labelText={'Explore'}
          iconSource={require('./icons/arrows.png')}
          iconTouchSource={require('./icons/arrows-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.exploreButtonImage}
          iconTouchStyle={styles.exploreButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: 120, y: -300 }}
          hidePosition={{ x: 0, y: 0 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onPlaces()}
          labelText={'Places'}
          iconSource={require('./icons/places.png')}
          iconTouchSource={require('./icons/places-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.placesButtonImage}
          iconTouchStyle={styles.placesButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: 0, y: -200 }}
          hidePosition={{ x: 0, y: 0 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onUser()}
          labelText={'User'}
          iconSource={require('./icons/person.png')}
          iconTouchSource={require('./icons/person-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.userButtonImage}
          iconTouchStyle={styles.userButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: -120, y: -100 }}
          hidePosition={{ x: 0, y: 0 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onAdd()}
          labelText={'Add'}
          iconSource={require('./icons/pin-glyph.png')}
          iconTouchSource={require('./icons/pin-glyph-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.addButtonImage}
          iconTouchStyle={styles.addButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: 120, y: -100 }}
          hidePosition={{ x: 0, y: 0 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
      </Menu>
    </>
  );
}

const styles = StyleSheet.create({
  optionButtonContainer: {
    position: 'absolute',
    bottom: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityButtonImage: {
    height: 52,
    width: 52
  },
  exploreButtonImage: {
    height: 52,
    width: 52
  },
  placesButtonImage: {
    height: 52,
    width: 52
  },
  userButtonImage: {
    height: 46,
    width: 46
  },
  addButtonImage: {
    height: 40,
    width: 40,
    height: 48,
    width: 48
  }
});

export default OptionsMenu;
