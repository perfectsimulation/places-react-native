import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import AgentsList from './AgentsList';
import AgentDetail from './AgentDetail';

const AgentsMenu = (props) => {

  const {
    shouldShow,
    onClose,
    viewableListItemCount,
  } = props;

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseMenu = onClose ?? (() => {});
  const maxVisibleItems = viewableListItemCount ?? 7;

  // either show the list or show the detail
  const [showList, setShowList] = useState(true);
  const [showDetail, setShowDetail] = useState(!showList);

  // selected agent from list to show in detail
  const [focusAgent, setFocusAgent] = useState();

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

  useEffect(() => {
    if (show) setShowList(true);
  }, [show]);

  // prefetch item photos
  useEffect(() => {
    data.map((item) => {
      Image.prefetch(item.photoUrl)
    });
  }, []);

  // focus agent on list item selection
  const onOpenDetail = (agent) => {
    setFocusAgent(agent);
    setShowList(false);
    setShowDetail(true);
  }

  const onCloseDetail = () => {
    setFocusAgent({});
    // setShowList(true);
    setShowDetail(false);
  }

  const onPressClose = () => {
    onCloseDetail();
    onCloseMenu();
  }

  return (
    <Menu
      shouldShow={show}
      // title={showList ? 'Agents' : String.empty }
      title={showList ? 'Agents' : focusAgent.name }
      onClose={() => onPressClose()}
      backgroundColor={'#151515c3'}
    >
      <View
        style={styles.container}
      >
        <AgentsList
          shouldShow={showList}
          data={data}
          onSelect={(item) => onOpenDetail(item)}
          maxVisibleItems={maxVisibleItems}
          containerStyle={styles.listContainer}
          listStyle={styles.list}
          listContentStyle={styles.listContentContainer}
          itemStyle={styles.listItem}
        />
        <AgentDetail
          shouldShow={showDetail}
          item={focusAgent}
          maxVisibleItems={maxVisibleItems}
          onClose={() => onCloseDetail()}
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
  listContainer: {
    alignSelf: 'flex-start',
    position: 'absolute',
    marginTop: 106,
    height: '100%',
    // backgroundColor: '#8844aa99',
  },
  list: {
    overflow: 'visible',
  },
  listContentContainer : {
    alignSelf: 'flex-start',
    alignItems: 'flex-end'
  },
  listItem: {
    // backgroundColor: '#88dd22cc',
    justifyContent: 'flex-end',
  }
});

export default AgentsMenu;
