import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';
import { getPhotoUrlById } from './server';

const AgentListItem = (props) => {

  const {
    showActive,
    item,
    onSelect,
    hideList,
    imageSize,
    activeHeight,
    listBottom,
    containerStyle,
    detailWidth,
    detailImageSize,
    detailOffset,
  } = props;

  const {
    photoId
  } = item;

  const onSelectItem = onSelect ?? (() => {});

  const [photoUrl, setPhotoUrl] = useState(undefined);

  // show detail when preview image is pressed
  const [showPreview, setShowPreview] = useState(false);

  // fade item in/out
  const beforeOpacity = showActive ? 0 : 1;
  const afterOpacity = showActive ? 1 : 0;

  const beforePreview = showPreview ? 0 : 1;
  const afterPreview = showPreview ? 1 : 0;

  const beforeHideList = hideList ? 0 : 1;
  const afterHideList = hideList ? 1 : 0;

  // durations of animations
  const opacityDuration = showActive ? 8 : 256;
  const previewDuration = 256;

  // opacity animation value
  const opacityAnim = useRef(new Animated.Value(beforeOpacity)).current;

  // scale and translate the preview image
  const previewAnim = useRef(new Animated.Value(beforePreview)).current;

  // translate the list item image out of view when a preview is showing
  const hideListAnim = useRef(new Animated.Value(beforeHideList)).current;

  // animation value to fade list item
  const opacity = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.44, 1]
  });

  // animation value to slide up preview image
  const rise = previewAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (activeHeight - imageSize) * -0.375]
  });

  // animation value to shrink preview image
  const shrink = previewAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5]
  });

  // animation value to hide list item image
  const hide = hideListAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (listBottom + imageSize)]
  });

  // animate opacity when active status changes
  useEffect(() => {
    Animated.spring(
      opacityAnim, {
        toValue: afterOpacity,
        duration: opacityDuration,
        useNativeDriver: true
      }
    ).start();
  }, [showActive]);

  // play preview animation when list item is selected
  useEffect(() => {
    Animated.spring(
      previewAnim, {
        toValue: afterPreview,
        duration: previewDuration,
        useNativeDriver: true
      }
    ).start();
  }, [showPreview]);

  // hide list item image when an item preview is showing
  useEffect(() => {
    Animated.spring(
      hideListAnim, {
        toValue: afterHideList,
        duration: previewDuration,
        useNativeDriver: true
      }
    ).start();
  }, [hideList]);

  // minimize detail when current index of list changes
  useEffect(() => {
    if (!showActive) {
      if (!hideList) {
        setShowPreview(false);
      }
    }
  }, [showActive]);

  // minimize detail when agents menu closes
  useEffect(() => {
    if (!hideList) {
      setShowPreview(false);
    }
  }, [hideList]);

  // fetch the photo for this list item
  useEffect(() => {
    const getPhoto = async () => {
      const photoUrl = await getPhotoUrlById([photoId]);
      return photoUrl;
    }

    getPhoto()
      .then((photoUrl) => setPhotoUrl(photoUrl))
      .catch((error) => alert(error.message));
  }, [photoId]);

  // show item detail
  const onPressPreview = () => {
    onSelectItem(!showPreview);
    setShowPreview(!showPreview);
  }

  return (
    <Animated.View
      style={[
        containerStyle ?? styles.container,
        {
          opacity: opacity
        },
        showActive
          ? { height: activeHeight }
          : { height: imageSize }
      ]}
    >
      <Pressable
        onPress={() => onPressPreview()}
        style={[
          showActive
            ? {
                ...styles.detailContainer,
                // backgroundColor: '#77aa77aa',
                height: activeHeight - imageSize,
                width: detailWidth,
                marginLeft: -detailOffset,
                bottom: imageSize
              }
            : { display: 'none' }
        ]}
      >
        <Animated.View
          style={[{
            ...styles.imageContainer,
            // backgroundColor: '#77aa77aa',
            transform: [
              { translateY: rise },
              { scaleX: shrink },
              { scaleY: shrink }
            ]
          }]}
        >
          <Image
            style={[
              showActive
                ? {
                    ...styles.detailImage,
                    height: detailImageSize,
                    width: detailImageSize
                  }
                : { display: 'none' }
            ]}
            source={photoUrl ? { uri: photoUrl } : require('./icons/missing.png')}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[{
          ...styles.imageContainer,
          // backgroundColor: '#77aa77aa',
          height: imageSize,
          width: imageSize,
          transform: [{ translateY: hide }]
        }]}
      >
        <Image
          style={styles.image}
          source={photoUrl ? { uri: photoUrl } : require('./icons/missing.png')}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
  }
});

export default AgentListItem;
