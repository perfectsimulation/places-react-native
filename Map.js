import React, { useState, useRef } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {

  const mapView = useRef(null);

  const [currentRegion, setCurrentRegion] = useState({
    latitude: 38.9610685,
    longitude: -120.0987182,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pins, setPins] = useState([]);

  const [hideCreatePin, setHideCreatePin] = useState(false);

  const [isDraggingMap, setIsDraggingMap] = useState(false);

  const [isNamingNewPin, setIsNamingNewPin] = useState(false);

  const [newPinName, setNewPinName] = useState(null);

  const saveCurrentRegion = () => {
    setCurrentRegion(mapView.current.__lastRegion);
    setIsDraggingMap(false);
    setIsNamingNewPin(true);
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

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapView}
          style={styles.map}
          region={currentRegion}
          showsUserLocation={true}
          onTouchStart={() => setIsDraggingMap(true)}
          onTouchEnd={() => saveCurrentRegion()}
        >
          {pins.map((pin, index) => (
            <Marker
              key={index}
              coordinate={pin.coordinate}
              title={pin.title}
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
              style={styles.pinImage}
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
            style={styles.createButton}
            onPress={() => setHideCreatePin(false)}
          >
            <Text style={styles.buttonText}>
              +
            </Text>
          </Pressable>
        )}
        {!hideCreatePin && !isDraggingMap && (
          <View style={styles.confirmCancelButtonsContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setHideCreatePin(true)}
            >
              <Text style={styles.buttonText}>
                ×
              </Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={() => onPressConfirmButton()}
            >
              <Text style={styles.confirmButtonText}>
                ✓
              </Text>
            </Pressable>
          </View>
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
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  createPinContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
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
    backgroundColor: '#00000060',
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    color: 'white'
  },
  newPinNameInputFocused: {
    height: 30,
    width: '100%',
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#00000060',
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
    backgroundColor: '#00000060',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  },
  createButton: {
    position: 'absolute',
    bottom: 32,
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: '#00000088',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  buttonText: {
    fontSize: 64,
    lineHeight: 66,
    height: 64,
    width: 64,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white'
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
    backgroundColor: '#be000088',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  confirmButton: {
    height: 64,
    width: 64,
    borderRadius: 64,
    marginLeft: 32,
    backgroundColor: '#0088007f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  confirmButtonText: {
    fontSize: 44,
    lineHeight: 62,
    height: 64,
    width: 64,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  }
});

export default Map;
