import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';

const AgentListItem = (props) => {

  const {
    isActiveItem,
    item,
    onSelect,
    imageSize,
    containerStyle,
    detailHeight,
    detailWidth,
    detailImageSize,
    detailOffset,
  } = props;

  const onPressDetail = onSelect ?? (() => {});

  // fade item in/out
  const beforeOpacity = isActiveItem ? 0.44 : 1;
  const afterOpacity = isActiveItem ? 1 : 0.44;

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
        containerStyle ?? styles.container,
        {
          opacity: opacityAnim,
        },
        isActiveItem
          ? { height: detailHeight }
          : { height: imageSize }
      ]}
    >
      <Pressable
        onPress={() => onPressDetail(item)}
        style={[
          isActiveItem
            ? {
                ...styles.detailContainer,
                height: detailHeight - imageSize,
                width: detailWidth,
                marginLeft: -detailOffset,
                bottom: imageSize
              }
            : { display: 'none' }
        ]}
      >
        <View
          style={[
            {
              ...styles.imageContainer,
              height: '100%'
            }
          ]}
          >
          <Image
            style={[
              isActiveItem
                ? {
                    ...styles.detailImage,
                    height: detailImageSize,
                    width: detailImageSize,
                  }
                : { display: 'none' }
            ]}
            source={{ uri: item.photoUrl }}
          />
        </View>
      </Pressable>
      <View
        style={[
          {
            ...styles.imageContainer,
            height: imageSize,
            width: imageSize,
          }
        ]}
      >
        <Image
          style={styles.image}
          source={{ uri: item.photoUrl }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  detailContainer: {
    position: 'absolute',
    // backgroundColor: '#44eeaa88',
  },
  detailImage: {
    position: 'absolute',
    // backgroundColor: '#4488eeaa',
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
