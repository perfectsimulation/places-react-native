import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import OptionButton from './OptionButton';

const OptionsMenu = (props) => {

  // opacity - entire menu
  const beforeOpacity = props.showOptionsMenu ? 0 : 1;
  const afterOpacity = props.showOptionsMenu ? 1 : 0;

  // transform XY - upper left button
  const beforeUpperLeftButtonPosition = props.showOptionsMenu ? { x: 0, y: 0 } : { x: -120, y: -300 };
  const afterUpperLeftButtonPosition = props.showOptionsMenu ? { x: -120, y: -300 } : { x: 0, y: 0 };

  // transform XY - upper right button
  const beforeUpperRightButtonPosition = props.showOptionsMenu ? { x: 0, y: 0 } : { x: 120, y: -300 };
  const afterUpperRightButtonPosition = props.showOptionsMenu ? { x: 120, y: -300 } : { x: 0, y: 0 };

  // transform XY - middle button
  const beforeMiddleButtonPosition = props.showOptionsMenu ? { x: 0, y: 0 } : { x: 0, y: -200 };
  const afterMiddleButtonPosition = props.showOptionsMenu ? { x: 0, y: -200 } : { x: 0, y: 0 };

  // transform XY - lower left button
  const beforeLowerLeftButtonPosition = props.showOptionsMenu ? { x: 0, y: 0 } : { x: -120, y: -100 };
  const afterLowerLeftButtonPosition = props.showOptionsMenu ? { x: -120, y: -100 } : { x: 0, y: 0 };

  // transform XY - lower right button
  const beforeLowerRightButtonPosition = props.showOptionsMenu ? { x: 0, y: 0 } : { x: 120, y: -100 };
  const afterLowerRightButtonPosition = props.showOptionsMenu ? { x: 120, y: -100 } : { x: 0, y: 0 };

  // transform Y - entire menu, instant
  const beforeShow = props.showOptionsMenu ? 1000 : 0;
  const afterShow = props.showOptionsMenu ? 0 : 1000;

  // animation ref values
  const showMenu = useRef(new Animated.Value(beforeShow)).current;
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;
  const upperLeftButtonAnim = useRef(new Animated.ValueXY(beforeUpperLeftButtonPosition)).current;
  const upperRightButtonAnim = useRef(new Animated.ValueXY(beforeUpperRightButtonPosition)).current;
  const middleButtonAnim = useRef(new Animated.ValueXY(beforeMiddleButtonPosition)).current;
  const lowerLeftButtonAnim = useRef(new Animated.ValueXY(beforeLowerLeftButtonPosition)).current;
  const lowerRightButtonAnim = useRef(new Animated.ValueXY(beforeLowerRightButtonPosition)).current;

  // do not animate on first render
  const [isFirstRender, setIsFirstRender] = useState(true);

  // animation duration
  const transitionDuration = 300;
  const animDuration = isFirstRender ? 0 : transitionDuration;

  // transform Y - entire menu, instant
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

  // opacity - entire menu
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: animDuration,
        useNativeDriver: true,
      }
    ).start();
  }, [afterOpacity, opacityAnim]);

  // transform XY - upper left button position
  // transform XY - upper right button position
  // transform XY - middle button position
  // transform XY - lower left button position
  // transform XY - lower right button position

  // record the elapsed first render
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // TODO look into a better 
  if (isFirstRender) {
    return <View style={styles.loading} />;
  }

  const {
    onPressConnectButton,
    onPressExploreButton,
    onPressUserButton,
    onPressSavedButton,
    onPressAddButton,
    onPressCloseButton
  } = props;

  return (
    <>
      <Animated.View style={[styles.container, {
        transform: [{ translateY: showMenu }],
          opacity: opacityAnim
        }]}>
        <View style={styles.optionsContainer}>
        <OptionButton
            onPress={() => onPressConnectButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: -120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Connect'}
            iconImageName={require('./icons/user.png')}
            containerStyle={styles.optionButtonContainer}
          />
          <OptionButton
            onPress={() => onPressExploreButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: 120, y: -300 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Explore'}
            iconImageName={require('./icons/explore.png')}
            containerStyle={styles.optionButtonContainer}
          />
          <OptionButton
            onPress={() => onPressPlacesButton()}
            shouldShow={props.showOptionsMenu}
            showPosition={{ x: 0, y: -200 }}
            hidePosition={{ x: 0, y: 0 }}
            transitionDuration={animDuration}
            labelText={'Places'}
            iconImageName={require('./icons/list.png')}
            containerStyle={styles.optionButtonContainer}
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
          />
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => onPressCloseButton()}
        >
          <Image
            style={styles.closeButtonImage}
            source={require('./icons/close.png')}
          />
        </Pressable>
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
  savedButtonImage: {
    top: 2,
    height: 46,
    width: 46
  },
  connectButtonImage: {
    top: 2,
    height: 46,
    width: 46
  },
  closeButtonImage: {
    bottom: 2,
    height: 36,
    width: 36
  },
  closeButton: {
    position: 'absolute',
    bottom: 32,
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OptionsMenu;
