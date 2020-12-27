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
    onPressUserButton,     // bottom left
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
          labelText={'Recent'}
          iconSource={require('./icons/activity.png')}
          iconTouchSource={require('./icons/activity-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.activityButtonImage}
          iconTouchStyle={styles.activityButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: -140, y: -156 }}
          hidePosition={{ x: 0, y: -104 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onUser()}
          labelText={'People'}
          iconSource={require('./icons/person.png')}
          iconTouchSource={require('./icons/person-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.userButtonImage}
          iconTouchStyle={styles.userButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: -75, y: -198 }}
          hidePosition={{ x: 0, y: -104 }}
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
          showPosition={{ x: 0, y: -213 }}
          hidePosition={{ x: 0, y: -104 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onExplore()}
          labelText={'Times'}
          iconSource={require('./icons/arrows.png')}
          iconTouchSource={require('./icons/arrows-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.exploreButtonImage}
          iconTouchStyle={styles.exploreButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: 75, y: -198 }}
          hidePosition={{ x: 0, y: -104 }}
          shouldAnimateOnPressOutOpacity
          shouldAnimateOnPressOutScale
        />
        <OptionButton
          onPress={() => onAdd()}
          labelText={'Create'}
          iconSource={require('./icons/shiny.png')}
          iconTouchSource={require('./icons/shiny-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.addButtonImage}
          iconTouchStyle={styles.addButtonImage}
          shouldShow={shouldShow}
          showPosition={{ x: 140, y: -156 }}
          hidePosition={{ x: 0, y: -104 }}
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
    bottom: -22,
    alignItems: 'center'
  },
  activityButtonImage: {
    height: 40,
    width: 40
  },
  exploreButtonImage: {
    height: 38,
    width: 38
  },
  placesButtonImage: {
    height: 38,
    width: 38
  },
  userButtonImage: {
    height: 34,
    width: 34
  },
  addButtonImage: {
    height: 36,
    width: 36,
    left: 6
  }
});

export default OptionsMenu;
