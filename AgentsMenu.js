import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import Menu from './Menu';

const AgentsMenu = (props) => {

  const {
    shouldShow,
    onClose
  } = props;

  // null checks TODO make defaultProps
  const show = shouldShow ?? true;
  const onCloseAgents = onClose ?? (() => {});

  // list
  const list = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(3);

  // list item section
  const data = [
    {
      imageId: 0,
      name: 'Terrible Fate',
      photoUrl: 'https://i.pinimg.com/originals/69/3a/81/693a8141af2b5d88ca24d249b0048876.png',
    },
    {
      imageId: 1,
      name: 'Chaos',
      photoUrl: 'https://www.pngkey.com/png/full/801-8019597_hades-the-chaos-update.png',
    },
    {
      imageId: 2,
      name: 'Asterius',
      photoUrl: 'https://i.redd.it/blna4mjr9uw21.png',
    },
    {
      imageId: 3,
      name: 'Megaera',
      photoUrl: 'https://i.redd.it/xcz1skgqdh241.png',
    },
    {
      imageId: 4,
      name: 'Alecto',
      photoUrl: 'https://i.redd.it/es9j9yzvysl21.png',
    },
    {
      imageId: 5,
      name: 'Hypnos',
      photoUrl: 'https://i.redd.it/cbyurjd9eh241.png',
    },
    {
      imageId: 6,
      name: 'Thanatos',
      photoUrl: 'https://i.redd.it/wp9z4ekmysl21.png',
    },
    {
      imageId: 7,
      name: 'Zagreus',
      photoUrl: 'https://static.wikia.nocookie.net/hades/images/2/29/Zagreus.png/revision/latest',
    }
  ];

  const renderListItem = (item) => (
    <View style={itemStyles.container}>
      <View style={itemStyles.imageContainer}>
        <Image
          style={itemStyles.image}
          source={{ uri: item.photoUrl }}
        />
      </View>
      <Text style={itemStyles.nameText}>
        {item.name}
      </Text>
    </View>
  );
  // list item section end

  const renderListHeader = () => (
    <View style={styles.flatListHeader} />
  );

  const renderListFooter = () => (
    <View style={styles.flatListFooter} />
  );

  const renderIndicator = () => (
    <View style={indicatorStyles.container}>
      {renderPageDots()}
    </View>
  );

  const renderPageDots = () => {
    let dots = [];
    for (let i = 0; i < data.length; i++) {
      dots.push(
        <View
          key={i}
          style={[
            indicatorStyles.dot,
            i == currentIndex
              ? {
                ...indicatorStyles.active,
              }
              : {
                ...indicatorStyles.inactive,
              }
          ]}
        />
      );
    }
    return dots;
  }

  // change the 'active' dot of the list pagination indicator
  const handleScroll = useRef(({ viewableItems, changed }) => {

    // get length of visible item array
    if (!viewableItems || viewableItems.length === 0) return;
    const visibleItemCount = viewableItems.length;

    // 1 VISIBLE ITEM - first item -> current index
    if (visibleItemCount === 1) {
      // should only occur when user is overscrolling
      setCurrentIndex(viewableItems[0].item.imageId);

    // 2 VISIBLE ITEMS - first item -> current index
    } else if (visibleItemCount === 2) {
      // handle when user stops overscrolling at the end of the list
      if (changed
        && changed.length === 1
        && changed[0].isViewable
        && changed[0].index === data.length - 2) {
        // item coming back into view from overscroll is second to last in list
        // do nothing - let current index remain the last item in the list
        // current index is equivalent to viewableItems[1].item here
        return;
      }

      // set current index to first of two visible items
      setCurrentIndex(viewableItems[0].item.imageId);

    // 3 VISIBLE ITEMS - second item -> current index
    } else if (visibleItemCount > 2) {
      // set current index to middle of three visible items
      setCurrentIndex(viewableItems[1].item.imageId);
    }
  });

  return (
    <Menu
      shouldShow={show}
      onClose={() => onCloseAgents()}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Agents</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            ref={list}
            style={styles.flatList}
            horizontal={true}
            keyExtractor={(agent) => agent.imageId.toString()}
            data={data}
            renderItem={({ item }) => renderListItem(item)}
            ListHeaderComponent={() => renderListHeader()}
            ListFooterComponent={() => renderListFooter()}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handleScroll.current}
            onEndReachedThreshold={0.25}
            onEndReached={() => setCurrentIndex(data.length - 1)}
          />
        </View>
        {renderIndicator()}
      </View>
    </Menu>
  );
}

const itemStyles = StyleSheet.create({
  container: {
    marginRight: 10,
    // backgroundColor: '#151515c3',
  },
  imageContainer: {
    marginTop: 10,
    maxHeight: 220,
    height: 220,
    width: 220,
    // backgroundColor: '#aa334444',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  nameText: {
    marginVertical: 10,
    fontWeight: '500',
    color: '#ffffffaa',
    // backgroundColor: '#5522ee44',
    textAlign: 'center'
  }
});

const indicatorStyles = StyleSheet.create({
  container: {
    top: 96,
    marginTop: 15,
    paddingLeft: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#77ee2222',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  active: {
    backgroundColor: 'white'
  },
  inactive: {
    backgroundColor: '#ffffff27'
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  headerText: {
    position: 'absolute',
    top: 60,
    paddingLeft: 2,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white'
  },
  flatListContainer: {
    // height: '30%',
    top: 96,
    width: '100%',
    // backgroundColor: '#88ddee11'
  },
  flatList: {
    width: '100%',
    // backgroundColor: '#88ddee11'
  },
  flatListContent: {
    height: '100%',
    justifyContent: 'center'
  },
  flatListHeader: {
    width: 85
  },
  flatListFooter: {
    width: 75
  },
});

export default AgentsMenu;
