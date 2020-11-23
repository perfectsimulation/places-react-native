import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import loadPins from './server';
import OptionsMenu from './OptionsMenu';

const Map = () => {

  const [currentRegion, setCurrentRegion] = useState(null);

  const [pins, setPins] = useState([]);

  const [hideCreatePin, setHideCreatePin] = useState(true);

  const [isDraggingMap, setIsDraggingMap] = useState(false);

  const [isNamingNewPin, setIsNamingNewPin] = useState(false);

  const [newPinName, setNewPinName] = useState(null);

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  // Use user position to set initial map region
  useEffect(() => {
    const setUserRegion = () => {
      Geolocation.getCurrentPosition((userPosition) => {
        const userRegion = {
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };

        setCurrentRegion(userRegion);
      });
    }

    setUserRegion();
  }, []);

  // Fetch pins
  useEffect(() => {
    const getPinsData = async () => {
      const pinsData = await loadPins();
      return pinsData;
    }

    getPinsData()
      .then((pinsData) => { setPins(pinsData) })
      .catch((error) => { alert(error.message) });
  }, []);

  const onTouchMapStart = () => {
    setIsDraggingMap(true);
  }

  const onTouchMapEnd = () => {
    setIsDraggingMap(false);
    setIsNamingNewPin(true);
  }

  const onPressAddOptionButton = () => {
    setHideCreatePin(false);
    setIsNamingNewPin(true);
    setShowOptionsMenu(false);
  }

  const onPressCancelButton = () => {
    setHideCreatePin(true);
  }

  const onPressConfirmButton = () => {
    createPin();
    setHideCreatePin(true);
    setIsNamingNewPin(false);
    setNewPinName(null);
  }

  const createPin = () => {
    const pinCoordinate = {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude
    };

    const pin = {
      coordinate: pinCoordinate,
      title: newPinName
    };

    pins.push(pin);
  }

  if (!currentRegion) {
    return <></>;
  }

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          mapType={'hybrid'}
          initialRegion={currentRegion}
          onRegionChangeComplete={(region) => setCurrentRegion(region)}
          onTouchStart={() => onTouchMapStart()}
          onTouchEnd={() => onTouchMapEnd()}
        >
          {pins.map((pin, index) => (
            <Marker
              key={index}
              title={pin.title}
              coordinate={pin.coordinate}
              tracksViewChanges={false}
            >
              <Image
                style={styles.pinImage}
                source={require('./map-pin.png')}
              />
            </Marker>
          ))}
        </MapView>
        {!hideCreatePin && !isDraggingMap && (
          <Text style={styles.dragMapText}>
            Drag map to position new pin
          </Text>
        )}
        {!hideCreatePin && (
          <View style={styles.createPinContainer}>
            <Image
              style={styles.createPinImage}
              source={require('./map-pin.png')}
            />
            {isNamingNewPin && !isDraggingMap && (
              <View style={styles.newPinNameContainer}>
                <TextInput
                  style={styles.newPinNameInput}
                  value={newPinName}
                  placeholder={'Name this pin'}
                  placeholderTextColor={'#ffffff7e'}
                  underlineColorAndroid={'transparent'}
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  maxLength={28}
                  onChangeText={(text) => setNewPinName(text)}
                />
              </View>
            )}
          </View>
        )}
        {hideCreatePin && (
          <Pressable
            style={styles.menuButton}
            onPress={() => setShowOptionsMenu(true)}
          >
            <Image
              style={styles.buttonImage}
              source={require('./open.png')}
            />
          </Pressable>
        )}
        {!hideCreatePin && !isDraggingMap && (
          <View style={styles.confirmCancelButtonsContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => onPressCancelButton()}
            >
              <Image
                style={styles.largeButtonImage}
                source={require('./cancel.png')}
              />
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={() => onPressConfirmButton()}
            >
              <Image
                style={styles.largeButtonImage}
                source={require('./confirm.png')}
              />
            </Pressable>
          </View>
        )}
        {showOptionsMenu && (
          <OptionsMenu
            onPressSettingsButton={() => console.log('settings')}
            onPressFavoritesButton={() => console.log('favorites')}
            onPressUserButton={() => console.log('user')}
            onPressSearchButton={() => console.log('search')}
            onPressAddButton={() => onPressAddOptionButton()}
            onPressCloseButton={() => setShowOptionsMenu(false)}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  createPinContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createPinImage: {
    position: 'relative',
    top: 6.4,
    height: 40,
    width: 40
  },
  pinImage: {
    position: 'relative',
    height: 40,
    width: 40
  },
  newPinNameContainer: {
    position: 'absolute',
    bottom: 40,
    minWidth: 132,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  newPinNameInput: {
    height: 30,
    width: '100%',
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#000000cf',
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    color: 'white'
  },
  dragMapText: {
    position: 'absolute',
    top: 64,
    height: 30,
    width: '100%',
    backgroundColor: '#000000cf',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  },
  menuButton: {
    position: 'absolute',
    bottom: 32,
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: '#00000088',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    bottom: 2,
    height: 36,
    width: 36
  },
  confirmCancelButtonsContainer: {
    position: 'absolute',
    bottom: 32,
    display: 'flex',
    flexDirection: 'row'
  },
  cancelButton: {
    height: 64,
    width: 64,
    marginRight: 32,
    borderRadius: 64,
    backgroundColor: '#be0000cf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    height: 64,
    width: 64,
    marginLeft: 32,
    borderRadius: 64,
    backgroundColor: '#008800cf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeButtonImage: {
    height: 42,
    width: 42
  }
});

export default Map;
