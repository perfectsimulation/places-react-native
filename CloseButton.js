import React from 'react';
import {
  Pressable,
  Image,
  StyleSheet
} from 'react-native';

const CloseButton = (props) => {

  // null check
  const { onClose } = props;
  const onPress = onClose ?? (() => {});

  return (
    <Pressable
      style={styles.closeButton}
      onPress={() => onPress()}
    >
      <Image
        style={styles.closeButtonImage}
        source={require('./icons/close.png')}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    bottom: 32,
    height: 52,
    width: 52,
    borderRadius: 52,
    backgroundColor: '#ffffffef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  closeButtonImage: {
    bottom: 2,
    height: 34,
    width: 34
  }
});

export default CloseButton;