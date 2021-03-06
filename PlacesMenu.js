import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import PlaceListItem from './PlaceListItem';

const PlacesMenu = (props) => {

  const {
    shouldShow,
    pins,
    onClose,
    onSelectItem
  } = props;

  // null checks / default values
  const show = shouldShow ?? false;
  const onClosePlaces = onClose ?? (() => {});
  const onSelectPlace = onSelectItem ?? (() => {});

  // list
  const list = useRef(undefined);

  // pins
  const [listItems, setListItems] = useState(pins);

  useEffect(() => {
    setListItems(pins);
  }, [pins]);

  // scroll list to top after it becomes transparent
  useEffect(() => {
    if (!list || !list.current) return;
    if (!shouldShow) {
      const timer = setTimeout(() => {
        list.current.scrollToOffset(false, 0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldShow]);

  const renderListItem = (pin) => (
    <PlaceListItem
      pin={pin}
      onSelect={(pin) => onSelectPlace(pin)}
    />
  );

  const renderListFooter = () => (
    <View style={styles.flatListFooter} />
  );

  return (
    <Menu
      shouldShow={show}
      title={'Places'}
      onClose={() => onClosePlaces()}
      backgroundColor={'#151515c3'}
    >
      <View style={styles.container}>
        <FlatList
          ref={list}
          style={styles.flatList}
          keyExtractor={(pin) => pin.id.toString()}
          data={listItems}
          renderItem={({ item }) => renderListItem(item)}
          ListFooterComponent={() => renderListFooter()}
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
  flatList: {
    marginBottom: 96,
    top: 96,
    width: '100%'
  },
  flatListFooter: {
    height: 160,
    width: '100%'
  },
});

export default PlacesMenu;
