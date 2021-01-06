import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getPins } from './server';
import Pin from './Pin';
import CreatePinView from './CreatePinView';
import PinDetail from './PinDetail';
import MenuButton from './MenuButton';
import OptionsMenu from './OptionsMenu';
import AgentsMenu from './AgentsMenu';
import NotesMenu from './NotesMenu';
import PlacesMenu from './PlacesMenu';

const Map = () => {

  const map = useRef();

  const [currentRegion, setCurrentRegion] = useState(undefined);
  const [allowRegionChange, setAllowRegionChange] = useState(true);
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [pins, setPins] = useState([]);
  const [focusedPin, setFocusedPin] = useState(undefined);
  const [showPinDetail, setShowPinDetail] = useState(false);
  const [showCreatePin, setShowCreatePin] = useState(false);

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showAgentsMenu, setShowAgentsMenu] = useState(false);
  const [showNotesMenu, setShowNotesMenu] = useState(false);
  const [showPlacesMenu, setShowPlacesMenu] = useState(false);

  const [isCreatingNote, setIsCreatingNote] = useState(false);

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
      .then((pinsData) => setPins(pinsData))
      .catch((error) => alert(error.message));
  }, []);

  // hide create view and pin detail
  const onTouchMapStart = () => {
    setIsDraggingMap(true);
    setShowPinDetail(false);
  }

  const onTouchMapEnd = () => {
    setIsDraggingMap(false);
  }

  // open pin detail with selected pin
  const onPressPin = (pin) => {
    setFocusedPin(pin);
    setShowPinDetail(true);
  }

  // open agents menu
  const onPressAgentsButton = () => {
    setShowOptionsMenu(false);
    setShowAgentsMenu(true);
  }

  const onCloseAgentsMenu = () => {
    setShowAgentsMenu(false);
  }

  const onCreateAgentNote = () => {
    setShowAgentsMenu(false);
    setIsCreatingNote(true);
    onOpenNotesMenu();
  }

  const onOpenNotesMenu = () => {
    setShowNotesMenu(true);
  }

  // open places menu
  const onPressPlacesButton = () => {
    setShowOptionsMenu(false);
    setShowPlacesMenu(true);
  }

  // close places menu and scroll map to selected pin
  const onSelectPlacesMenuItem = (pin) => {
    if (!map || !map.current) return;
    const pinRegion = {
      latitude: pin.coordinate.latitude,
      longitude: pin.coordinate.longitude,
      latitudeDelta: pin.coordinate.latitudeDelta,
      longitudeDelta: pin.coordinate.longitudeDelta
    };

    // close places menu
    setShowPlacesMenu(false);

    // animate scroll to the pin on map
    map.current.animateToRegion(pinRegion, 255);

    // set the focused pin and display pin detail
    setFocusedPin(pin);
    setShowPinDetail(true);
  }

  const onClosePlacesMenu = () => {
    setShowPlacesMenu(false);
  }

  // begin pin creation flow
  const onPressAddButton = () => {
    setShowCreatePin(true);
    setShowOptionsMenu(false);
  }

  // cancel pin creation flow
  const onPressCancelButton = () => {
    setAllowRegionChange(true);
    setShowCreatePin(false);
  }

  // finalize new pin creation
  const onPressConfirmButton = (pinForm) => {
    createPin(pinForm);
    // console.log(currentRegion);
    setAllowRegionChange(true);
    setShowCreatePin(false);
  }

  const createPin = (pinForm) => {
    const pinCoordinate = {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta
    };

    const pin = {
      title: pinForm.title,
      description: pinForm.description,
      pinColor: pinForm.pinColor,
      id: pins.length,
      coordinate: pinCoordinate,
    };

    pins.push(pin);
    // TODO POST new pin
  }

  if (!currentRegion) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        showsUserLocation={true} // TODO handle false case
        mapType={'hybrid'}
        initialRegion={currentRegion}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
        scrollEnabled={allowRegionChange}
        zoomEnabled={allowRegionChange}
        rotateEnabled={allowRegionChange}
        pitchEnabled={allowRegionChange}
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
            onPress={() => onPressPin(pin)}
          >
            <Pin
              color={pin.pinColor}
              style={styles.pin}
            />
            <Callout tooltip />
          </Marker>
        ))}
      </MapView>
      <MenuButton
        shouldShow={!showCreatePin}
        onPress={() => setShowOptionsMenu(true)}
      />
      <CreatePinView
        shouldShow={showCreatePin}
        isDraggingMap={isDraggingMap}
        currentRegion={currentRegion}
        onConfirmLocation={() => setAllowRegionChange(false)}
        onRepositionPin={() => setAllowRegionChange(true)}
        onPressCancelButton={() => onPressCancelButton()}
        onPressConfirmButton={(pinForm) => onPressConfirmButton(pinForm)}
      />
      <OptionsMenu
        shouldShow={showOptionsMenu}
        onPressActivityButton={() => console.log('activity')}
        onPressExploreButton={() => console.log('explore')}
        onPressPlacesButton={() => onPressPlacesButton()}
        onPressUserButton={() => onPressAgentsButton()}
        onPressAddButton={() => onPressAddButton()}
        onCloseOptionsMenu={() => setShowOptionsMenu(false)}
      />
      <AgentsMenu
        shouldShow={showAgentsMenu}
        onClose={() => onCloseAgentsMenu()}
        onCreateAgentNote={() => onCreateAgentNote()}
      />
      <NotesMenu
        shouldShow={showNotesMenu}
        showCreate={isCreatingNote}
        onClose={() => setShowNotesMenu(false)}
      />
      <PlacesMenu
        shouldShow={showPlacesMenu}
        pins={pins}
        onClose={() => onClosePlacesMenu()}
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
  pin: {
    bottom: '16%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default Map;
