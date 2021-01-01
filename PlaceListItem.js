import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';
import { getPhotoUrlById } from './server';

const PlaceListItem = (props) => {

  const { pin, onSelect } = props;
  const {
    photoIds,
    title,
    description
  } = pin;

  const [photoUrl, setPhotoUrl] = useState(null);

  // Fetch pin photo url from photo ID of pin
  useEffect(() => {
    const getPhoto = async () => {
      const photoUrl = await getPhotoUrlById(photoIds)
      return photoUrl;
    }

    getPhoto()
      .then((photoUrl) => { setPhotoUrl(photoUrl) })
      .catch((error) => { alert(error.message) });
  }, [photoIds]);

  return (
    <Pressable style={styles.container} onPress={() => onSelect(pin)}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: photoUrl }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff20'
  },
  imageContainer: {
    padding: 10,
    maxHeight: 140,
    height: 140,
    width: '100%'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  textContainer: {
    margin: 10,
    marginTop: 0
  },
  titleText: {
    fontWeight: '500',
    color: 'white'
  },
  subText: {
    marginTop: 2,
    fontSize: 12,
    color: '#ffffff88'
  },
  addNoteTouchable: {},
  notification: {},
});

export default PlaceListItem;
