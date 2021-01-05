import React from 'react';
import {
  View,
  Pressable,
  Image,
  useWindowDimensions,
  StyleSheet
} from 'react-native';

const AgentDetail = (props) => {
  const {
    shouldShowPreview,
    shouldShowFull,
    data,
    focusIndex,
    sizeUnits,
    onPressPreview,
  } = props;

  const windowWidth = useWindowDimensions().width;
  const previewSizeRatio = (sizeUnits - 2) / sizeUnits;
  const previewSize = Math.floor(previewSizeRatio * windowWidth);

  const renderPreview = () => (
    <View
      style={previewStyles.container}>
      <Pressable
        style={[
          previewStyles.imageContainer,
          previewSize
            ? { height: previewSize, width: previewSize }
            : {}
        ]}
        onPress={() => onPressPreview(true)}
      >
        <Image
          style={previewStyles.image}
          source={{ uri: photoUrl }}
        />
      </Pressable>
    </View>
  );

  const renderFull = () => (
    <Pressable
      style={fullStyles.container}
      onPress={() => onPressPreview(false)}
    />
  );

  const item = data && focusIndex !== undefined && focusIndex < data.length
    ? data[focusIndex]
    : undefined;

  if (item === undefined) {
    return <></>;
  }

  const {
    name,
    photoUrl,
  } = item;

  if (shouldShowPreview) {
    return renderPreview();
  } else if (shouldShowFull) {
    return renderFull();
  } else {
    return <></>;
  }
}

const fullStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#11ee3388'
  }
});

const previewStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#8844aa99',
  },
  imageContainer: {
    padding: '5%',
    // backgroundColor: '#4499eeaa'
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

export default AgentDetail;
