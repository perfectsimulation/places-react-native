import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const UserMenu = (props) => {

  const animDuration = 300;

  const beforeOpacity = props.showOptionsMenu ? 0 : 1;
  const afterOpacity = props.showOptionsMenu ? 1 : 0;

  const beforeTranslateY = props.showOptionsMenu ? 500 : 0;
  const afterTranslateY = props.showOptionsMenu ? 0 : 500;

  const beforeShow = props.showOptionsMenu ? 1000 : 0;
  const afterShow = props.showOptionsMenu ? 0 : 1000;

  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;
  const transformYAnim = useRef(new Animated.Value(beforeTranslateY)).current;
  const showMenu = useRef(new Animated.Value(beforeShow)).current;

  const [isFirstRender, setIsFirstRender] = useState(true);

  // opacity animation
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: isFirstRender ? 0 : animDuration,
        useNativeDriver: true,
      }
    ).start();
  }, [afterOpacity, opacityAnim]);

  // transform Y menu
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
      }, animDuration);
    }
  }, [afterShow, showMenu]);

  // transform Y animation
  useEffect(() => {
    Animated.timing(
      transformYAnim, {
        toValue: afterTranslateY,
        duration: isFirstRender ? 0 : animDuration,
        useNativeDriver: true,
      }
    ).start();
  }, [afterTranslateY, transformYAnim]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const {
    onPressSettingsButton,
    onPressFavoritesButton,
    onPressUserButton,
    onPressSearchButton,
    onPressAddButton,
    onPressCloseButton
  } = props;

  return (
    <>
      <Animated.View style={[styles.container, {
        transform: [{ translateY: showMenu }],
          opacity: opacityAnim
        }]}>
        <Animated.View style={[styles.optionsContainer, {
          transform: [{ translateY: transformYAnim }]
        }]}>
          <View style={styles.optionsRow}>
            <Pressable
              style={styles.optionButton}
              onPress={() => onPressSettingsButton()}
            >
              <Text style={styles.buttonLabelText}>
                Settings
              </Text>
              <Image
                style={styles.buttonImage}
                source={require('./settings.png')}
              />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => onPressFavoritesButton()}
            >
              <Text style={styles.buttonLabelText}>
                Saved
              </Text>
              <Image
                style={styles.savedButtonImage}
                source={require('./saved.png')}
              />
            </Pressable>
          </View>
          <View style={styles.optionsRow}>
            <Pressable
              style={styles.optionButton}
              onPress={() => onPressUserButton()}
            >
              <Text style={styles.buttonLabelText}>
                User
              </Text>
              <Image
                style={styles.buttonImage}
                source={require('./user.png')}
              />
            </Pressable>
          </View>
          <View style={styles.optionsRow}>
            <Pressable
              style={styles.optionButton}
              onPress={() => onPressSearchButton()}
            >
              <Text style={styles.buttonLabelText}>
                Search
              </Text>
              <Image
                style={styles.buttonImage}
                source={require('./search.png')}
              />
            </Pressable>
            <Pressable
              style={styles.optionButton}
              onPress={() => onPressAddButton()}
            >
              <Text style={styles.buttonLabelText}>
                Add
              </Text>
              <Image
                style={styles.buttonImage}
                source={require('./add.png')}
              />
            </Pressable>
          </View>
        </Animated.View>
        <Pressable
          style={styles.closeButton}
          onPress={() => onPressCloseButton()}
        >
          <Image
            style={styles.closeButtonImage}
            source={require('./close.png')}
          />
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#000000df',
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
  optionsRow: {
    width: '120%',
    margin: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  optionButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    margin: 12,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabelText: {
    position: 'absolute',
    bottom: 70,
    fontSize: 12,
    height: 16,
    width: 88,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  buttonImage: {
    height: 36,
    width: 36
  },
  savedButtonImage: {
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

export default UserMenu;
