import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const AgentListItem = (props) => {

  const {
    isActiveItem,
    item,
    imageSize
  } = props;

  // fade item in/out
  const beforeOpacity = isActiveItem ? 0 : 1;
  const afterOpacity = isActiveItem ? 1 : 0;

  // duration of fade animations
  const duration = isActiveItem ? 8 : 256;

  // opacity animation value
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // animate opacity when active status changes
  useEffect(() => {
    Animated.timing(
      opacityAnim, {
        toValue: afterOpacity,
        duration: duration,
        useNativeDriver: true
      }
    ).start();
  }, [isActiveItem, opacityAnim]);

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          opacity: opacityAnim
        }
      ]}
    >
      <View
        style={[
          {
            ...styles.imageContainer,
            height: imageSize,
            width: imageSize
          }
        ]}
        >
        <Image
          style={styles.image}
          source={{ uri: item.photoUrl }}
        />
      </View>
      <Text style={styles.nameText}>
        {item.name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {},
  image: {
    height: '100%',
    width: '100%'
  },
  nameText: {
    marginTop: 10,
    height: 18,
    lineHeight: 18,
    fontWeight: '500',
    color: '#ffffffaa',
    textAlign: 'center'
    // backgroundColor: '#88ddee11'
  }
});

export default AgentListItem;
