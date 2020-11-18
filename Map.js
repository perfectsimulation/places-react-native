import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 38.9610685,
            longitude: -120.0987182,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
