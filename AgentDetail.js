import React, { useRef, useEffect } from 'react';
import {
  useWindowDimensions,
  Animated,
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';

const AgentDetail = (props) => {

  const {
    shouldShow,
    item,
    onPressCreate,
    onClose,
    overlaySize,
  } = props;

  const onCloseDetail = onClose ?? (() => {});
  const onCreateNote = onPressCreate ?? (() => {});

  const { height: windowHeight } = useWindowDimensions();
  const overlayHeight = overlaySize ?? windowHeight * 0.71;

  const afterShow = shouldShow ? 1 : 0;
  const beforeShow = shouldShow ? 0 : 1;

  const show = useRef(new Animated.Value(beforeShow)).current;
  const showHeight = show.interpolate({
    inputRange: [0, 1],
    outputRange: [overlayHeight, 0]
  });

  useEffect(() => {
    Animated.spring(
      show, {
        toValue: afterShow,
        duration: 256,
        useNativeDriver: true
      }
    ).start();
  }, [shouldShow]);

  return (
    <Animated.View
      shouldShow={shouldShow}
      showDefaultCloseButton={false}
      backgroundColor={'#00000055'}
      style={[{
        ...styles.container,
        height: windowHeight,
        bottom: ((windowHeight - overlayHeight) * -1),
        transform: [{ translateY: showHeight }]
      }]}
    >
      <View style={styles.menuContent}>
        <View style={styles.optionsContainer}>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>♤</Text>
          </Pressable>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>♢</Text>
          </Pressable>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>♧</Text>
          </Pressable>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>♡</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#66666620',
    alignItems: 'center',
    display: 'flex'
  },
  menuContent: {
    height: '100%',
    width: '100%'
  },
  optionsContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex'
  },
  optionButton: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#00000055',
    borderColor: '#ffffff22'
  },
  buttonLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '100',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffff',
    height: '100%',
    width: '100%',
  }
});

export default AgentDetail;
