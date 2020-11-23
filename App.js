/**
 * Map Test React Native App
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

import Map from './Map';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Map />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: window.height,
    width: window.width
  }
});

export default App;
