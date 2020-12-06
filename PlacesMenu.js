import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import PinCard from './PinCard';

const PlacesMenu = (props) => {

  const {
    shouldShow,
    pins,
    onClose
  } = props;

  // null checks / default values
  const show = shouldShow ?? true;
  const onClosePlaces = onClose ?? (() => {});

  // pins
  const [listItems, setListItems] = useState(pins);

  useEffect(() => {
    setListItems(pins);
  }, [pins]);

  renderPin = (pin) => (
    <PinCard pin={pin} />
  );

  return (
    <Menu
      shouldShow={show}
      onClose={() => onClosePlaces()}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Places</Text>
        <FlatList
          style={styles.flatList}
          keyExtractor={(pin) => pin.id.toString()}
          data={listItems}
          renderItem={({ item }) => renderPin(item)}
        />
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  headerText: {
    position: 'absolute',
    top: 60,
    paddingLeft: 2,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  flatList: {
    marginBottom: 96,
    top: 96,
    width: '100%'
  }
});

export default PlacesMenu;
