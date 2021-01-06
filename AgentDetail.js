import React from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import Menu from './Menu';

const AgentDetail = (props) => {

  const {
    shouldShow,
    item,
    maxVisibleItems,
    onPressCreate,
    onClose,
  } = props;

  const onCloseDetail = onClose ?? (() => {});
  const onCreateNote = onPressCreate ?? (() => {});

  const { width: windowWidth } = useWindowDimensions();
  const listItemWidth = Math.floor(windowWidth / maxVisibleItems);
  const headerImageSize = listItemWidth * 2;

  if (item === undefined || !item.name) {
    return <></>;
  }

  return (
    <Menu
      shouldShow={shouldShow}
      showDefaultCloseButton={false}
      style={styles.container}
      backgroundColor={'#151515c3'}
    >
      <View style={styles.menuContent}>
        <View
          style={[
            styles.header,
            {
              height: headerImageSize
            }
          ]}
        >
          <View
            style={[
              styles.imageContainer,
              {
                height: headerImageSize,
                width: headerImageSize
              }
            ]}
          >
            <Image
              style={styles.image}
              source={{ uri: item.photoUrl }}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>Info</Text>
          </Pressable>
          <Pressable style={styles.optionButton}>
            <Text style={styles.buttonLabel}>Notes</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => onCreateNote()}
          >
            <Text style={styles.buttonLabel}>Create</Text>
          </Pressable>
        </View>
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff20',
    height: '88%',
    width: '100%',
    alignItems: 'center'
  },
  menuContent: {
    height: '100%',
    width: '100%',
  },
  header: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageContainer: {
    // backgroundColor: '#4499ee11',
    marginTop: 10,
  },
  image: {
    height: '100%',
    width: '100%'
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    // backgroundColor: '#aaee8811'
    display: 'none'
  },
  infoText: {
    color: '#ffffffaa',
    // backgroundColor: '#aaee8811'
  },
  optionsContainer: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // backgroundColor: '#4499ee22',
  },
  optionButton: {
    marginHorizontal: 5,
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff20',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4499ee11',
    backgroundColor: '#00000055',
  },
  buttonLabel: {
    alignSelf: 'center',
    paddingLeft: 3,
    fontSize: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#ffffffaa'
  }
});

export default AgentDetail;
