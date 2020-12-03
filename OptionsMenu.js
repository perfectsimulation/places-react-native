import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import OptionButton from './OptionButton';

const OptionsMenu = (props) => {

  const {
    showOptionsMenu,
    onPressConnectButton, // top left
    onPressExploreButton, // top right
    onPressPlacesButton,  // middle
    onPressSavedButton,   // bottom left
    onPressAddButton,     // bottom right
    onCloseOptionsMenu
  } = props;

  return (
    <>
      <Menu
        shouldShow={showOptionsMenu}
        onClose={() => onCloseOptionsMenu()}
      >
        <View style={styles.optionsContainer}>
          <OptionButton
            onPress={() => onPressConnectButton()}
            shouldShow={showOptionsMenu}
            showPosition={{ x: -120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            labelText={'Activity'}
            iconImageName={require('./icons/activity.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.activityButtonImage}
          />
          <OptionButton
            onPress={() => onPressExploreButton()}
            shouldShow={showOptionsMenu}
            showPosition={{ x: 120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            labelText={'Explore'}
            iconImageName={require('./icons/search.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.exploreButtonImage}
          />
          <OptionButton
            onPress={() => onPressPlacesButton()}
            shouldShow={showOptionsMenu}
            showPosition={{ x: 0, y: -200 }}
            hidePosition={{ x: 0, y: 0 }}
            labelText={'Places'}
            iconImageName={require('./icons/globe.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.placesButtonImage}
          />
          <OptionButton
            onPress={() => onPressSavedButton()}
            shouldShow={showOptionsMenu}
            showPosition={{ x: -120, y: -100 }}
            hidePosition={{ x: 0, y: 0 }}
            labelText={'Saved'}
            iconImageName={require('./icons/saved.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.savedButtonImage}
          />
          <OptionButton
            onPress={() => onPressAddButton()}
            shouldShow={showOptionsMenu}
            showPosition={{ x: 120, y: -100 }}
            hidePosition={{ x: 0, y: 0 }}
            labelText={'Add'}
            iconImageName={require('./icons/add.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.addButtonImage}
          />
        </View>
      </Menu>
    </>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionButtonContainer: {
    position: 'absolute',
    bottom: 14
  },
  activityButtonImage: {
    height: 38,
    width: 38
  },
  exploreButtonImage: {
    height: 38,
    width: 38
  },
  placesButtonImage: {
    height: 58,
    width: 58
  },
  savedButtonImage: {
    top: 2,
    height: 46,
    width: 46
  },
  addButtonImage: {
    height: 40,
    width: 40
  }
});

export default OptionsMenu;
