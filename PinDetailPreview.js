import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const PinDetailPreview = (props) => {

  const { pin } = props;
  const { title, description } = pin;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '25%',
    width: '100%',
    backgroundColor: '#151515c3'
  },
  innerContainer: {
    margin: 10,
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
  reviewContainer: {},
});

export default PinDetailPreview;
