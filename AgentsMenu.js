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
    onCreateAgentNote,
    viewableListItemCount,
  } = props;

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseMenu = onClose ?? (() => {});
  const maxVisibleItems = viewableListItemCount ?? 7;

  // either show the list or show the detail
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showDetail, setShowDetail] = useState(!scrollEnabled);

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
    if (show && !showDetail) setScrollEnabled(true);
  }, [show]);

  // prefetch item photos
  useEffect(() => {
    data.map((item) => {
      Image.prefetch(item.photoUrl)
    });
  }, []);


  const onOpenDetail = () => {
    setScrollEnabled(false);
    setShowDetail(true);
  }

  const onCloseDetail = () => {
    setScrollEnabled(true);
    setShowDetail(false);
  }

  const onToggleFocus = (agent) => {
    setFocusAgent(agent);
    if (agent) {
      onOpenDetail();
    } else {
      onCloseDetail();
    }
  }

  const onCreateNote = () => {
    onCloseDetail(false);
    onCreateAgentNote();
  }

  const onPressClose = () => {
    onCloseDetail();
    onCloseMenu();
  }

  return (
    <Menu
      shouldShow={show}
      title={focusAgent ? focusAgent.name : 'Agents'}
      onClose={() => onPressClose()}
      backgroundColor={'#151515c3'}
    >
      <View
        style={styles.container}
      >
        <AgentsList
          data={data}
          onSelect={(agent) => onToggleFocus(agent)}
          scrollEnabled={scrollEnabled}
          maxVisibleItems={maxVisibleItems}
          containerStyle={styles.listContainer}
          listStyle={styles.list}
          listContentStyle={styles.listContentContainer}
          itemStyle={styles.listItem}
        />
        <AgentDetail
          shouldShow={showDetail}
          item={focusAgent}
          onPressCreate={() => onCreateNote()}
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
    position: 'absolute',
    height: '100%',
    // backgroundColor: '#8844aa99',
  },
  list: {
    overflow: 'visible',
  },
  listContentContainer : {
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  listItem: {
    // backgroundColor: '#88dd22cc',
    justifyContent: 'flex-end',
  }
});

export default AgentsMenu;
