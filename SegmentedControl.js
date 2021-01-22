import React, { useState } from 'react';
import {
  View,
  Pressable,
  Image,
  StyleSheet
} from 'react-native';

const SegmentedControl = (props) => {

  const { segments } = props;
  const [activeSegment, setActiveSegment] = useState(0);

  const renderSegment = (segment, index) => (
    <Pressable
      key={index}
      onPress={() => {
        setActiveSegment(index);
        segment.onPress();
      }}
      style={
        activeSegment === index
          ? styles.selectedSegment
          : styles.segment
      }
    >
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={segment.source}
        />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => {
        return renderSegment(segment, index);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    // backgroundColor: '#8833ee55'
  },
  segment: {
    borderWidth: 0.5,
    borderColor: '#ffffff22',
    borderColor: 'transparent',
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00000044',
    flex: 1,
  },
  selectedSegment: {
    borderWidth: 0.5,
    borderColor: '#ffffff22',
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff11',
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    height: 28,
    width: 28
  }
});

SegmentedControl.defaultProps = {
  segments: []
};

export default SegmentedControl;
