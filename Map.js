import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import loadPins from './server';
import OptionsMenu from './OptionsMenu';
import AddPinOverlay from './AddPinOverlay';
import MenuScreen from './MenuScreen';

const Map = () => {

  const [currentRegion, setCurrentRegion] = useState(null);

  const [pins, setPins] = useState([]);

  const [hideCreatePin, setHideCreatePin] = useState(true);

  const [isDraggingMap, setIsDraggingMap] = useState(false);

  const [isNamingNewPin, setIsNamingNewPin] = useState(false);

  const [newPinName, setNewPinName] = useState(null);

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

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

  const onCloseMenu = () => {
    setShowMenu(false);
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
              description={pin.description}
              coordinate={pin.coordinate}
              tracksViewChanges={false}
            >
              <Image
                style={styles.pinImage}
                source={require('./icons/map-pin.png')}
              />
            </Marker>
          ))}
        </MapView>
        <AddPinOverlay
          hide={hideCreatePin}
          isDraggingMap={isDraggingMap}
          isNamingPin={isNamingNewPin}
          onPressCancelButton={() => onPressCancelButton()}
          onPressConfirmButton={() => onPressConfirmButton()}
          newPinName={newPinName}
          setNewPinName={(text) => setNewPinName(text)}
        />
        {hideCreatePin && (
          <Pressable
            style={styles.menuButton}
            onPress={() => setShowOptionsMenu(true)}
          >
            <Image
              style={styles.buttonImage}
              source={require('./icons/open.png')}
            />
          </Pressable>
        )}
        <OptionsMenu
          showOptionsMenu={showOptionsMenu}
          onPressConnectButton={() => console.log('connect')}
          onPressExploreButton={() => console.log('explore')}
          onPressPlacesButton={() => setShowMenu(true)}
          onPressSavedButton={() => console.log('saved')}
          onPressAddButton={() => onPressAddOptionButton()}
          onPressCloseButton={() => setShowOptionsMenu(false)}
        />
        {showMenu && (
          <MenuScreen
            headerIconSource={require('./icons/open.png')}
            pins={pins}
            onClose={() => onCloseMenu()}
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
  pinImage: {
    position: 'relative',
    height: 40,
    width: 40
  },
  menuButton: {
    position: 'absolute',
    bottom: 32,
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: '#ffffffdf',
    backgroundColor: '#000000df',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    bottom: 2,
    height: 36,
    width: 36
  }
});

export default Map;
