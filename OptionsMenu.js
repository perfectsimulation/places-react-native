import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const UserMenu = (props) => {
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
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
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
        </View>
        <Pressable
          style={styles.closeButton}
          onPress={() => onPressCloseButton()}
        >
          <Image
            style={styles.closeButtonImage}
            source={require('./close.png')}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    margin: 20,
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
