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
          shouldShow={shouldShow}
          showPosition={{ x: -120, y: -300 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Activity'}
          iconSource={require('./icons/activity.png')}
          iconTouchSource={require('./icons/activity-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.activityButtonImage}
        />
        <OptionButton
          onPress={() => onExplore()}
          shouldShow={shouldShow}
          showPosition={{ x: 120, y: -300 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Explore'}
          iconSource={require('./icons/arrows.png')}
          iconTouchSource={require('./icons/arrows-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.exploreButtonImage}
        />
        <OptionButton
          onPress={() => onPlaces()}
          shouldShow={shouldShow}
          showPosition={{ x: 0, y: -200 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Places'}
          iconSource={require('./icons/places.png')}
          iconTouchSource={require('./icons/places-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.placesButtonImage}
        />
        <OptionButton
          onPress={() => onUser()}
          shouldShow={shouldShow}
          showPosition={{ x: -120, y: -100 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'User'}
          iconSource={require('./icons/smile.png')}
          iconTouchSource={require('./icons/smile-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.userButtonImage}
        />
        <OptionButton
          onPress={() => onAdd()}
          shouldShow={shouldShow}
          showPosition={{ x: 120, y: -100 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Add'}
          iconSource={require('./icons/add.png')}
          iconTouchSource={require('./icons/add-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.addButtonImage}
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
    alignItems: 'center',
    // backgroundColor: 'darkred'
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
    height: 42,
    width: 42
  },
  addButtonImage: {
    height: 40,
    width: 40
  }
});

export default OptionsMenu;
