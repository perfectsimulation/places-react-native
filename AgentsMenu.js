import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import AgentDetail from './AgentDetail';
import AgentsList from './AgentsList';

const AgentsMenu = (props) => {

  const {
    shouldShow,
    onClose,
    viewableListItemCount,
  } = props;

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseAgents = onClose ?? (() => {});
  const maxVisibleItems = viewableListItemCount ?? 7;

  const [focusIndex, setFocusIndex] = useState(undefined);
  const [showPreview, setShowPreview] = useState(true);
  const [showList, setShowList] = useState(showPreview);
  const [showDetail, setShowDetail] = useState(!showPreview);

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

  // prefetch item photos
  useEffect(() => {
    data.map((item) => {
      Image.prefetch(item.photoUrl)
    });
  }, []);

  useEffect(() => {
    setShowDetail(!showPreview);
    setShowList(showPreview);
  }, [showPreview]);

  useEffect(() => {
    setShowPreview(!showDetail);
    setShowList(!showDetail);
  }, [showDetail]);

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
        <AgentDetail
          shouldShowPreview={showPreview}
          shouldShowFull={showDetail}
          data={data}
          focusIndex={focusIndex}
          sizeUnits={maxVisibleItems}
          onPressPreview={(showDetail) => setShowDetail(showDetail)}
        />
        <AgentsList
          shouldShow={showList}
          data={data}
          maxVisibleItems={maxVisibleItems}
          onFocusIndex={(index) => setFocusIndex(index)}
          style={styles.list}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#4499ee55',
  },
  list: {
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingBottom: '30%',
  }
});

export default AgentsMenu;
