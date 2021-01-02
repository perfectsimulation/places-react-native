import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

// indicate focused index of list
const PageIndicator = (props) => {

  const {
    currentIndex,
    count,
    style
  } = props;

  const container = style
    ? [styles.container, style]
    : [styles.container];

  const renderPageDots = () => {
    let dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i === currentIndex
              ? styles.active
              : styles.inactive
          ]}
        />
      );
    }
    return dots;
  }

  return (
    <View style={container}>
      {renderPageDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: 'white'
  },
  active: {},
  inactive: {
    opacity: 0.15
  }
});

export default PageIndicator;
