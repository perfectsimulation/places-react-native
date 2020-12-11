import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getPins } from './server';
import CreatePinView from './CreatePinView';
import MenuButton from './MenuButton';
import OptionsMenu from './OptionsMenu';
import PlacesMenu from './PlacesMenu';
import PinDetail from './PinDetail';

const Map = () => {

  const map = useRef();

  const [currentRegion, setCurrentRegion] = useState(null);
  const [pins, setPins] = useState([]);
  const [focusedPin, setFocusedPin] = useState(null);
  const [showPinDetail, setShowPinDetail] = useState(false);
  const [showAddPinOverlay, setShowAddPinOverlay] = useState(false);
  const [isDraggingMap, setIsDraggingMap] = useState(false);
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
      const pinsData = await getPins();
      return pinsData;
    }

    getPinsData()
      .then((pinsData) => { setPins(pinsData) })
      .catch((error) => { alert(error.message) });
  }, []);

  const onTouchMapStart = () => {
    setIsDraggingMap(true);
    setShowPinDetail(false);
  }

  const onTouchMapEnd = () => {
    setIsDraggingMap(false);
  }

  const OnPressPin = (pin) => {
    setFocusedPin(pin);
    setShowPinDetail(true);
  }

  const onPressAddButton = () => {
    setShowAddPinOverlay(true);
    setShowOptionsMenu(false);
  }

  const onPressCancelButton = () => {
    setShowAddPinOverlay(false);
  }

  const onPressConfirmButton = () => {
    // createPin();
    console.log(currentRegion);
    setShowAddPinOverlay(false);
  }

  const onPressPlacesButton = () => {
    setShowOptionsMenu(false);
    setShowMenu(true);
  }

  const onSelectPlacesMenuItem = (pin) => {
    if (!map || !map.current) return;
    const pinRegion = {
      latitude: pin.coordinate.latitude,
      longitude: pin.coordinate.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta
    };

    // close places menu
    setShowMenu(false);

    // animate scroll to the pin on map
    map.current.animateToRegion(pinRegion, 255);

    // set the focused pin and display pin detail
    setFocusedPin(pin);
    setShowPinDetail(true);
  }

  const onCloseMenu = () => {
    setShowMenu(false);
  }

  const createPin = (pin) => {
    const pinCoordinate = {
      latitude: pin.coordinate.latitude,
      longitude: pin.coordinate.longitude
    };

    const newPin = {
      key: pins.length,
      title: pin.title,
      coordinate: pinCoordinate,
    };

    pins.push(newPin);
  }

  if (!currentRegion) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
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
            stopPropagation={true}
            onPress={() => OnPressPin(pin)}
          >
            <Image
              style={styles.pinImage}
              source={require('./icons/map-pin.png')}
            />
            <Callout tooltip />
          </Marker>
        ))}
      </MapView>
      <MenuButton
        shouldShow={!showAddPinOverlay}
        onPress={() => setShowOptionsMenu(true)}
      />
      <CreatePinView
        shouldShow={showAddPinOverlay}
        isDraggingMap={isDraggingMap}
        onPressCancelButton={() => onPressCancelButton()}
        onPressConfirmButton={() => onPressConfirmButton()}
      />
      <OptionsMenu
        shouldShow={showOptionsMenu}
        onPressActivityButton={() => console.log('activity')}
        onPressExploreButton={() => console.log('explore')}
        onPressPlacesButton={() => onPressPlacesButton()}
        onPressUserButton={() => console.log('user')}
        onPressAddButton={() => onPressAddButton()}
        onCloseOptionsMenu={() => setShowOptionsMenu(false)}
      />
      <PlacesMenu
        shouldShow={showMenu}
        pins={pins}
        onClose={() => onCloseMenu()}
        onSelectItem={(pin) => onSelectPlacesMenuItem(pin)}
      />
      <PinDetail
        shouldShow={showPinDetail}
        showPreview={true}
        pin={focusedPin ?? {}}
      />
    </View>
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
  }
});

export default Map;
