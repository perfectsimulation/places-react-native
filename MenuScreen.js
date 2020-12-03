import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import CloseButton from './CloseButton';
import PinCard from './PinCard';

const MenuScreen = (props) => {
  const {
    headerIconSource,
    pins,
    onClose
  } = props;

  const [listItems, setListItems] = useState(pins);

  useEffect(() => {
    setListItems(pins);
  }, [pins]);

  renderPin = (pin) => (
    <PinCard pin={pin} />
  );

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.headerIcon}
          source={headerIconSource}
        />
        <FlatList
          style={styles.flatList}
          keyExtractor={(pin) => pin.key.toString()}
          data={listItems}
          renderItem={({ item }) => renderPin(item)}
        />
      </View>
      <CloseButton onClose={() => onClose()}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000cf',
    display: 'flex',
    alignItems: 'center'
  },
  headerIcon: {
    position: 'absolute',
    top: 64,
    height: 44,
    width: 44
  },
  flatList: {
    top: 114,
    width: '100%'
  }
});

export default MenuScreen;
