import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

const PinCard = (props) => {

  const { pin } = props;
  const {
    title,
    description,
    user,
    coordinate,
  } = pin;

  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'yellow',
    backgroundColor: 'darkred'
  },
  image: {
    maxHeight: 140,
    height: 140,
    width: '100%',
    backgroundColor: 'gray'
  },
  textContainer: {
    margin: 10
  },
  titleText: {
    color: 'white'
  },
  descriptionText: {},
  addNoteTouchable: {},
  notification: {},
});

export default PinCard;