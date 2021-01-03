import React, { useRef, useState } from 'react';
import {
  View,
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

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseAgents = onClose ?? (() => {});

  // scale list items by window size
  const windowWidth = useWindowDimensions().width;

  // round down item width to prevent clipping of items at edge of window
  const maxVisibleItems = 7;
  const listItemWidth = Math.floor(windowWidth / maxVisibleItems);

  // subtract the combined width of max visible items from total window width
  // add this marginal width to both the header and footer to ensure viewable
  // item count in onViewableItemsChanged handler never exceeds the max value
  const maxItemsWidth = maxVisibleItems * listItemWidth;
  const excessWidth = windowWidth - maxItemsWidth;

  // size header and footer to align list in center of window
  // i.e. the last item is centered when list is fully scrolled to the end
  const halfWindowWidth = Math.ceil(windowWidth / 2);
  const halfItemWidth = Math.ceil(listItemWidth / 2);
  const listHeaderWidth = halfWindowWidth - halfItemWidth + excessWidth;
  const listFooterWidth = listHeaderWidth;

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

  // consider list item to be viewable if more than half of it is visible
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 51
  });

  // update current index when list is scrolled
  const handleScroll = useRef(({ viewableItems, changed }) => {

    // do nothing on first render
    if (viewableItems.length === changed.length) return;

    // do nothing if there are no viewable items
    if (viewableItems.length === 0) return;

    // Note: built for odd-numbered max visible items, allowing a center item
    const minVisibleitems = Math.ceil(maxVisibleItems / 2);
    const maxVisibleCenterIndex = Math.floor(maxVisibleItems / 2);

    const viewableItemCount = viewableItems.length;

    const sortedViewableItems = viewableItems.sort((a, b) => a.index - b.index);
    const sortedChangedItems = changed.sort((a, b) => a.index - b.index);

    const highestViewableIndex = sortedViewableItems[viewableItemCount - 1].index;
    const lowestViewableIndex = sortedViewableItems[0].index;

    const highestChangedIndex = sortedChangedItems[changed.length - 1].index;
    const lowestChangedIndex = sortedChangedItems[0].index;

    const netViewableChanged = changed.reduce((count, item) => {
      const increment = item.isViewable ? 1 : -1;
      return count + increment;
    }, 0);

    let focusIndex;

    // handle if scroll position is somewhere in the middle of list
    if (viewableItemCount === maxVisibleItems) {

      // select center index of viewableItems
      focusIndex = maxVisibleCenterIndex;
    }

    // handle overscroll
    else if (viewableItemCount < minVisibleitems) {

      // overscrolled past the first item in list
      if (lowestViewableIndex === 0) {

        // snap focus to first item
        focusIndex = 0
      }

      // overscrolled past the last item in list
      else {

        // snap focus to last item
        focusIndex = viewableItemCount - 1;
      }
    }

    // handle if list was fully scrolled to the first or last item
    else if (viewableItemCount === minVisibleitems) {

      // scolled to the top of list (all the way to the left)
      if (highestViewableIndex <= lowestChangedIndex) {
        focusIndex = 0;
      }

      // scrolled to the bottom of list (all the way to the right)
      else if (lowestViewableIndex >= highestChangedIndex) {
        focusIndex = viewableItemCount - 1;
      }
    }

    // handle if there are fewer viewable items than the max value
    // four possible scenarios:
    //  - header shortened:   scrolled near list top, toward bottom
    //  - header lengthened:  scrolled near list top, toward top
    //  - footer shortened:   scrolled near list bottom, toward top
    //  - footer lengthened:  scrolled near list bottom, toward bottom
    else {

      // more viewable items after scroll
      if (netViewableChanged > 0) {

        // header shortened
        if (highestViewableIndex === lowestChangedIndex) {

          // determine how many items could fit inside the header
          const itemSpace = maxVisibleItems - viewableItemCount;

          // subtract from center index of viewable items array with max count
          focusIndex = maxVisibleCenterIndex - itemSpace;
        }

        // footer shortened
        else if (lowestViewableIndex === highestChangedIndex) {

          // use center index of viewable items array with max count
          focusIndex = maxVisibleCenterIndex;
        }
      }

      // fewer viewable items after scroll
      else if (netViewableChanged < 0) {

        // header lengthened
        if (highestViewableIndex < lowestChangedIndex) {

          // determine how many items could fit inside the footer
          const itemSpace = maxVisibleItems - viewableItemCount;

          // subtract from center index of viewable items array with max count
          focusIndex = maxVisibleCenterIndex - itemSpace;
        }

        // footer lengthened
        else if (lowestViewableIndex > highestChangedIndex) {

          // use center index of viewable items array with max count
          focusIndex = maxVisibleCenterIndex;
        }
      }
    }

    // set current index
    if (focusIndex !== undefined && focusIndex < viewableItemCount) {
      setCurrentIndex(viewableItems[focusIndex].index);
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

  return (
    <Menu
      shouldShow={show}
      title={'Agents'}
      onClose={() => onCloseAgents()}
      backgroundColor={'#151515c3'}
    >
      <View
        style={styles.container}
      >
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
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={handleScroll.current}
          />
        </View>
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  flatListContainer: {
    bottom: 106,
    width: '100%'
  },
  flatList: {
    width: '100%'
    // backgroundColor: '#88ddee11'
  }
});

export default AgentsMenu;
