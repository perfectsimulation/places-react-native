import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';
import CloseButton from './CloseButton';

const OptionsMenu = (props) => {

  // opacity - entire menu
  const beforeOpacity = props.showOptionsMenu ? 0 : 1;
  const afterOpacity = props.showOptionsMenu ? 1 : 0;

  // transform Y - entire menu, instant TODO use window height
  const beforeShow = props.showOptionsMenu ? 1000 : 0;
  const afterShow = props.showOptionsMenu ? 0 : 1000;

  // animation ref values
  const showMenu = useRef(new Animated.Value(beforeShow)).current;
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);

  // animation duration
  const transitionDuration = 300;
  const animDuration = isFirstRender ? 0 : transitionDuration;

  // animate position of menu container
  useEffect(() => {
    if (props.showOptionsMenu) {
      Animated.timing(
        showMenu, {
          toValue: afterShow,
          duration: 0,
          useNativeDriver: true,
        }
      ).start();
    } else {
      // translate entire menu off-screen upon animation completion
      const timer = setTimeout(() => {
        Animated.timing(
          showMenu, {
            toValue: afterShow,
            duration: 0,
            useNativeDriver: true,
          }
        ).start();

        return (() => {
          clearTimeout(timer);
        });
      }, transitionDuration); // TODO use actual animation length
    }
  }, [afterShow, showMenu]);

  // fade in/out menu container
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: animDuration,
        useNativeDriver: true,
      }
    ).start();
  }, [afterOpacity, opacityAnim]);

  // record the elapsed first render
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // TODO look into a better way
  if (isFirstRender) {
    return <View style={styles.loading} />;
  }

  const {
    onPressConnectButton, // top left
    onPressExploreButton, // top right
    onPressPlacesButton,  // middle
    onPressSavedButton,   // bottom left
    onPressAddButton,     // bottom right
    onPressCloseButton
  } = props;

  return (
    <>
      <Animated.View
        style={[styles.container, {
          transform: [{ translateY: showMenu }],
            opacity: opacityAnim
        }]}
      >
        <View style={styles.optionsContainer}>
          <OptionButton
            onPress={() => onPressConnectButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: -120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Activity'}
            iconImageName={require('./icons/activity.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.activityButtonImage}
          />
          <OptionButton
            onPress={() => onPressExploreButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: 120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Explore'}
            iconImageName={require('./icons/search.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.exploreButtonImage}
          />
          <OptionButton
            onPress={() => onPressPlacesButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: 0, y: -200 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Places'}
            iconImageName={require('./icons/globe.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.placesButtonImage}
          />
          <OptionButton
            onPress={() => onPressSavedButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: -120, y: -100 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Saved'}
            iconImageName={require('./icons/saved.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.savedButtonImage}
          />
          <OptionButton
            onPress={() => onPressAddButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: 120, y: -100 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Add'}
            iconImageName={require('./icons/add.png')}
            containerStyle={styles.optionButtonContainer}
            iconStyle={styles.addButtonImage}
          />
        </View>
        <CloseButton
          onClose={() => onPressCloseButton()}
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#000000bf',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
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
    height: 42,
    width: 42
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
