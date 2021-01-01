import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import AgentListItem from './AgentListItem';

const AgentsMenu = (props) => {

  const {
    shouldShow,
    onClose
  } = props;

  // scale list items by window size
  const windowWidth = useWindowDimensions().width;
  const listHeaderWidth = Math.round(windowWidth / 4);
  const listFooterWidth = listHeaderWidth;
  const listItemWidth = Math.round(windowWidth / 2);

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseAgents = onClose ?? (() => {});

  // list
  const list = useRef(null);

  // current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // sample data
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

  const renderListItem = (item, index) => (
    <AgentListItem
      isActiveItem={index === currentIndex}
      item={item}
      imageSize={listItemWidth}
    />
  );

  const renderListHeader = () => (
    <View style={{ width: listHeaderWidth }} />
  );

  const renderListFooter = () => (
    <View style={{ width: listFooterWidth }} />
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
            i === currentIndex
              ? indicatorStyles.active
              : indicatorStyles.inactive
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

  // snap list to center the item at the current index after scroll
  const calculateOffsets = () => {
    let offsets = [];
    for (let i = 0; i < data.length; i++) {
      offsets.push(
        i * listItemWidth
      );
    }
    return offsets;
  }

  return (
    <Menu
      shouldShow={show}
      onClose={() => onCloseAgents()}
      backgroundColor={'#151515c3'}
    >
      <View
        style={styles.container}
      >
        <Text style={styles.headerText}>Agents</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            ref={list}
            style={styles.flatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'fast'}
            snapToOffsets={calculateOffsets()}
            keyExtractor={(agent) => agent.imageId.toString()}
            data={data}
            extraData={currentIndex}
            renderItem={({ item, index }) => renderListItem(item, index)}
            getItemLayout={(_data, index) => ({
              length: listItemWidth,
              offset: listItemWidth * index + listHeaderWidth,
              index
            })}
            ListHeaderComponent={() => renderListHeader()}
            ListFooterComponent={() => renderListFooter()}
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
    top: 96,
    marginVertical: 10,
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
  }
});

export default AgentsMenu;
