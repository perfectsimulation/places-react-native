import React from 'react';
import { StyleSheet } from 'react-native';
import Menu from './Menu';
import Button from './Button';

const OptionsMenu = (props) => {

  const {
    shouldShow,
    onPressActivityButton, // leftmost
    onPressUserButton,     // left
    onPressPlacesButton,   // middle
    onPressExploreButton,  // right
    onPressAddButton,      // rightmost
    onCloseOptionsMenu
  } = props;

  // TODO util for anim translation props showPosition/hidePosition
  // export { flourishRadial } from common/animateLayout.js
  // flourishRadial = (i, count) => { x: xi , y: yi }
  //    props:  i       - index
  //            count   - total items to flourish
  //            origin  - reference to center point
  // -----------------------------------------------
  // For each Button in this file
  // origin={ x: f(screen), y: f(screen) }
  // hidePosition={ origin }
  // showPosition={ flourishRadial(0, 5, origin) }

  return (
    <>
      <Menu
        shouldShow={shouldShow}
        onClose={() => onCloseOptionsMenu()}
        backgroundColor={'#151515c3'}
      >
        <Button
          labelText={'Lines'}
          shouldShow={shouldShow}
          onPress={() => onPressActivityButton()}
          showPosition={{ x: -140, y: -156 }}
          hidePosition={{ x: 0, y: -104 }}
          iconSource={require('./icons/activity.png')}
          iconTouchSource={require('./icons/activity-touch.png')}
          iconStyle={styles.activityButtonImage}
          iconTouchStyle={styles.activityButtonImage}
          {...optionButtonStyles}
          {...optionButtonAnimProps}
        />
        <Button
          labelText={'Agents'}
          shouldShow={shouldShow}
          onPress={() => onPressUserButton()}
          showPosition={{ x: -75, y: -198 }}
          hidePosition={{ x: 0, y: -104 }}
          iconSource={require('./icons/person.png')}
          iconTouchSource={require('./icons/person-touch.png')}
          iconStyle={styles.userButtonImage}
          iconTouchStyle={styles.userButtonImage}
          {...optionButtonStyles}
          {...optionButtonAnimProps}
        />
        <Button
          labelText={'Places'}
          shouldShow={shouldShow}
          onPress={() => onPressPlacesButton()}
          showPosition={{ x: 0, y: -213 }}
          hidePosition={{ x: 0, y: -104 }}
          iconSource={require('./icons/places.png')}
          iconTouchSource={require('./icons/places-touch.png')}
          iconStyle={styles.placesButtonImage}
          iconTouchStyle={styles.placesButtonImage}
          {...optionButtonStyles}
          {...optionButtonAnimProps}
        />
        <Button
          labelText={'Times'}
          shouldShow={shouldShow}
          onPress={() => onPressExploreButton()}
          showPosition={{ x: 75, y: -198 }}
          hidePosition={{ x: 0, y: -104 }}
          iconSource={require('./icons/arrows.png')}
          iconTouchSource={require('./icons/arrows-touch.png')}
          iconStyle={styles.exploreButtonImage}
          iconTouchStyle={styles.exploreButtonImage}
          {...optionButtonStyles}
          {...optionButtonAnimProps}
        />
        <Button
          labelText={'Create'}
          shouldShow={shouldShow}
          onPress={() => onPressAddButton()}
          showPosition={{ x: 140, y: -156 }}
          hidePosition={{ x: 0, y: -104 }}
          iconSource={require('./icons/shiny.png')}
          iconTouchSource={require('./icons/shiny-touch.png')}
          iconStyle={styles.addButtonImage}
          iconTouchStyle={styles.addButtonImage}
          {...optionButtonStyles}
          {...optionButtonAnimProps}
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
  optionButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3
  },
  optionButtonLabel: {
    position: 'absolute',
    bottom: 10,
    paddingLeft: 3,
    height: 12,
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  optionButtonTouch: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#000000df'
  },
  optionButtonPressIn: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2
  },
  optionButtonPressOut: {
    position: 'absolute',
    height: 65,
    width: 65,
    borderRadius: 66,
    borderColor: 'white',
    borderWidth: 1
  },
  activityButtonImage: {
    position: 'absolute',
    height: 40,
    width: 40
  },
  exploreButtonImage: {
    position: 'absolute',
    height: 38,
    width: 38
  },
  placesButtonImage: {
    position: 'absolute',
    height: 38,
    width: 38
  },
  userButtonImage: {
    position: 'absolute',
    height: 34,
    width: 34
  },
  addButtonImage: {
    position: 'absolute',
    height: 36,
    width: 36,
    left: 6
  }
});

const optionButtonStyles = {
  containerStyle: styles.optionButtonContainer,
  buttonStyle: styles.optionButton,
  labelStyle: styles.optionButtonLabel,
  buttonTouchStyle: styles.optionButtonTouch,
  touchDownFeedbackStyle: styles.optionButtonPressIn,
  touchUpFeedbackStyle: styles.optionButtonPressOut
};

// TODO export { ...animProps } from common/animProps.js
const optionButtonAnimProps = {
  transitionDuration: 200,
  animateShowPosition: true,
  animateTouchEndOpacity: true,
  animateTouchEndScale: true
};

OptionsMenu.defaultProps = {
  onPressActivityButton: (() => {}),
  onPressUserButton: (() => {}),
  onPressPlacesButton: (() => {}),
  onPressExploreButton: (() => {}),
  onPressAddButton: (() => {}),
  onCloseOptionsMenu: (() => {}),
};

export default OptionsMenu;
