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
    onPressSavedButton,    // bottom left
    onPressAddButton,      // bottom right
    onCloseOptionsMenu
  } = props;

  return (
    <>
      <Menu
        shouldShow={shouldShow}
        onClose={() => onCloseOptionsMenu()}
      >
        <OptionButton
          onPress={() => onPressActivityButton()}
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
          onPress={() => onPressExploreButton()}
          shouldShow={shouldShow}
          showPosition={{ x: 120, y: -300 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Explore'}
          iconSource={require('./icons/search.png')}
          iconTouchSource={require('./icons/search-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.exploreButtonImage}
        />
        <OptionButton
          onPress={() => onPressPlacesButton()}
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
          onPress={() => onPressSavedButton()}
          shouldShow={shouldShow}
          showPosition={{ x: -120, y: -100 }}
          hidePosition={{ x: 0, y: 0 }}
          labelText={'Saved'}
          iconSource={require('./icons/bookmark.png')}
          iconTouchSource={require('./icons/bookmark-touch.png')}
          containerStyle={styles.optionButtonContainer}
          iconStyle={styles.savedButtonImage}
        />
        <OptionButton
          onPress={() => onPressAddButton()}
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
    height: 44,
    width: 44
  },
  exploreButtonImage: {
    height: 38,
    width: 38
  },
  placesButtonImage: {
    height: 52,
    width: 52
  },
  savedButtonImage: {
    height: 36,
    width: 36
  },
  addButtonImage: {
    height: 40,
    width: 40
  }
});

export default OptionsMenu;
