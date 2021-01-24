import React from 'react';
import {
  useWindowDimensions,
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import agentProfile from './models/agentProfile';

const AgentProfile = (props) => {

  const sample = [
    [
      { 'name': 'Agent' },
      { 'age': '0' },
    ],
    [
      { 'height': '8' },
    ],
    [
      // { 'description': 'Improvised' },
    ]
  ];

  const pages = [
    {
      title: 'General',
      fields: [
        'name',
        'nicknames',
        'age'
      ]
    },
    {
      title: 'Physical',
      fields: [
        'height',
        'weight'
      ]
    },
    {
      title: 'Personality',
      fields: ['description']
    },
  ];

  const windowWidth = useWindowDimensions().width;

  const calculateCompletion = (item, index) => {
    const itemTotal = item.fields.length;
    const items = sample[index].length;
    const completion = items / itemTotal;
    const barWidth = completion * windowWidth;
    return barWidth;
  }

  const showCompletionText = (item, index) => {
    const itemTotal = item.fields.length;
    const items = sample[index].length;
    const completionText = `${items} / ${itemTotal}`;
    return completionText;
  }

  const renderPage = (item, index) => (
    <View
      style={styles.pageContainer}
    >
      <View
        style={styles.progressBar}
      >
        <View
          style={[{
            ...styles.progressBarBackground,
            width: calculateCompletion(item, index)
          }]}
        />
        <Text style={styles.pageLabel}>
          {item.title}
        </Text>
        <Text style={[styles.completionValue]}>
          {showCompletionText(item, index)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        keyExtractor={(page) => page.title.toString()}
        data={pages}
        renderItem={({ item, index }) => renderPage(item, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  completionValue: {
    alignSelf: 'flex-end',
    paddingRight: 1,
    lineHeight: 36,
    color: '#ffffff',
    textAlign: 'right',
    fontFamily: 'Courier New'
  },
  progressBarBackground: {
    position: 'absolute',
    width: 200,
    borderColor: 'transparent',
    borderTopColor: '#ffffff0c',
    borderTopWidth: 30,
    borderRightWidth: 10
  },
  container: {
    width: '100%',
  },
  flatList: {
    height: '100%',
    width: '100%',
  },
  pageContainer: {
    marginVertical: 10,
    width: '100%',
  },
  progressBar: {
    height: 26,
    borderBottomWidth: 1,
    borderColor: '#ffffff0c'
  },
  pageLabel : {
    paddingLeft: 1,
    position: 'absolute',
    height: 12,
    width: '100%',
    lineHeight: 12,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  }
});

export default AgentProfile;
