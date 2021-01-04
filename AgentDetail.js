import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const AgentDetail = (props) => {
  const {
    item
  } = props;

  const {
    name,
    photoUrl,
  } = item;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: photoUrl }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    // backgroundColor: '#8844aa99',
  },
  imageContainer: {
    paddingHorizontal: '10%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

export default AgentDetail;
