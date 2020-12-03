import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const PinCard = (props) => {

  const { pin } = props;
  const {
    title,
    description,
    coordinate,
    photo
  } = pin;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: photo }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{description}</Text>
      </View>
    </View>
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

export default PinCard;