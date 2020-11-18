/**
 * Map Test React Native App
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import Map from './Map';

const App = () => {
  const window = useWindowDimensions();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Map />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 10,
    height: window.height,
    width: window.width
  }
});

export default App;
