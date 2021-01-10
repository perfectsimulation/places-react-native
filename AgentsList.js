import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import AgentListItem from './AgentListItem';

// Vertically-aligned horizontal FlatList
const AgentsList = (props) => {

  const {
    data,
    onSelect,
    scrollEnabled,
    maxVisibleItems,
    containerStyle,
    listStyle,
    listContentStyle,
    itemStyle
  } = props;

  const onSelectItem = onSelect ?? (() => {});

  // scale list items by window size
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // subtract list item height to calculate detail height
  const listBottom = Math.round(windowHeight / 4);

  // round down item width to prevent clipping of items at edge of window
  const listItemWidth = Math.floor(windowWidth / maxVisibleItems);

  // subtract list height to calculate detail height
  const previewHeight = windowHeight - listBottom;

  // detail image spans across width with horizontal margins equal to item size
  const previewImageRatio = (maxVisibleItems - 2) / maxVisibleItems;
  const previewImageSize = Math.floor(previewImageRatio * windowWidth);

  // calculate horizontal offset to center detail with 100% width of window
  const previewOffset = (windowWidth / 2) - (listItemWidth / 2);

  // subtract the combined width of max visible items from total window width
  // add this marginal width to both the header and footer to ensure viewable
  // item count in onViewableItemsChanged handler never exceeds the max value
  const maxItemsWidth = maxVisibleItems * listItemWidth;
  const excessWidth = windowWidth - maxItemsWidth;

  // size header and footer to vertically align list
  // i.e. the last item is centered when list is fully scrolled to the end
  const halfWindowWidth = Math.ceil(windowWidth / 2);
  const halfItemWidth = Math.ceil(listItemWidth / 2);
  const listHeaderWidth = halfWindowWidth - halfItemWidth + excessWidth;
  const listFooterWidth = listHeaderWidth;

  // list
  const list = useRef(undefined);

  // current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // current item detail
  const [showDetail, setShowDetail] = useState(false);

  // consider list item to be viewable if more than half of it is visible
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 51
  });

  useEffect(() => {
    setShowDetail(false);
  }, [currentIndex]);

  // update current index when list is scrolled
  const handleScroll = useRef(({ viewableItems, changed }) => {

    // do nothing on first render
    if (viewableItems.length === changed.length) return;

    // do nothing if there are no viewable items
    if (viewableItems.length === 0) return;

    // TODO handle when data.length < maxVisibleItems

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
    else {

      // scroll near top: |<->  | header shortened or lengthened
      if (highestViewableIndex <= lowestChangedIndex) {

        // determine how many items could fit inside the header
        const itemSpace = maxVisibleItems - viewableItemCount;

        // subtract from center index of viewable items array with max count
        focusIndex = maxVisibleCenterIndex - itemSpace;
      }

      // scroll near bottom: |  <->| footer shortened or lengthened
      else if (lowestViewableIndex >= highestChangedIndex) {

        // use center index of viewable items array with max count
        focusIndex = maxVisibleCenterIndex;
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

  const onTogglePreview = (showPreview) => {
    setShowDetail(showPreview);
    const focus = showPreview ? data[currentIndex] : undefined;
    onSelectItem(focus);
  }

  const renderListItem = (item, index) => (
    <AgentListItem
      showActive={index === currentIndex}
      item={item}
      onSelect={(item) => onTogglePreview(item)}
      hideList={showDetail}
      imageSize={listItemWidth}
      activeHeight={previewHeight}
      listBottom={listBottom}
      containerStyle={itemStyle}
      detailWidth={windowWidth}
      detailImageSize={previewImageSize}
      detailOffset={previewOffset}
    />
  );

  const renderListHeader = () => (
    <View style={{ width: listHeaderWidth }} />
  );

  const renderListFooter = () => (
    <View style={{ width: listFooterWidth }} />
  );

  return (
    <View
      style={[
        styles.flatListContainer,
        containerStyle ?? {},
      ]}
    >
      <FlatList
        ref={list}
        style={[
          styles.flatList,
          listStyle ?? {}
        ]}
        contentContainerStyle={[
          listContentStyle ?? {}
        ]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        scrollEnabled={scrollEnabled}
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
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%'
  },
  flatList: {
    width: '100%',
    // backgroundColor: '#15151531'
  }
});

export default AgentsList;