import React, { useState, useRef } from 'react';
import {
  View,
  Pressable,
  Text,
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

  const [hideCreatePin, setHideCreatePin] = useState(false);

  const [isDraggingMap, setIsDraggingMap] = useState(false);

  const useLastRegionForPin = () => {
    setCurrentRegion(mapView.current.__lastRegion);
    setIsDraggingMap(false);
  }

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapView}
          style={styles.map}
          region={currentRegion}
          onTouchStart={() => setIsDraggingMap(true)}
          onTouchEnd={() => useLastRegionForPin()}
        >
          {!hideCreatePin && (
            <Marker
              tracksViewChanges={false}
              coordinate={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude
              }}
            >
              <Image
                style={styles.pinImage}
                source={require('./map-pin.png')}
              />
            </Marker>
          )}
        </MapView>
        {!hideCreatePin && (
          <View style={styles.createPinContainer}>
            <Image
              style={styles.pinImage}
              source={require('./map-pin.png')}
            />
          </View>
        )}
        {!hideCreatePin && !isDraggingMap && (
          <Text style={styles.dragMapText}>
            Drag map to position new pin
          </Text>
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
        {!hideCreatePin && (
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
              onPress={() => setHideCreatePin(!hideCreatePin)}
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
  dragMapText: {
    position: 'absolute',
    top: 64,
    height: 30,
    width: '100%',
    backgroundColor: '#00000060',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '500',
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
    backgroundColor: '#BE000088',
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
    fontSize: 48,
    lineHeight: 66,
    height: 64,
    width: 64,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  }
});

export default Map;
