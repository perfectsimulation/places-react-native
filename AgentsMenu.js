import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import AgentsList from './AgentsList';
import AgentDetail from './AgentDetail';
import { getAgents } from './server';

const AgentsMenu = (props) => {

  const {
    shouldShow,
    onClose,
    viewableListItemCount,
  } = props;

  // agents data
  const [agents, setAgents] = useState([]);

  // either show the list or show the detail
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showList, setShowList] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  // selected agent from list to show in detail
  const [focusAgent, setFocusAgent] = useState();

  useEffect(() => {
    const getAgentsData = async () => {
      const agentsData = await getAgents();
      return agentsData;
    }

    getAgentsData()
      .then((agents) => setAgents(agents))
      .catch((error) => alert(error.message));
  }, []);

  useEffect(() => {
    if (shouldShow && !showDetail) {
      setShowList(true);
      setScrollEnabled(true);
    }
  }, [shouldShow]);

  const onOpenDetail = () => {
    setScrollEnabled(false);
    setShowDetail(true);
  }

  const onCloseDetail = () => {
    setScrollEnabled(true);
    setShowDetail(false);
    setFocusAgent(undefined);
  }

  const onSelectItem = (agent) => {
    setFocusAgent(agent);
    if (agent) {
      onOpenDetail();
    } else {
      onCloseDetail();
    }
  }

  const handleClose = () => {
    onCloseDetail();
    onClose();
  }

  return (
    <Menu
      shouldShow={shouldShow}
      title={showList && !showDetail ? 'Agents' : undefined}
      onClose={() => handleClose()}
      backgroundColor={'#151515c3'}
    >
      <View style={styles.menuContent}>
        <Menu
          shouldShow={showList}
          title={focusAgent ? focusAgent.name : undefined}
          showDefaultCloseButton={false}
        >
          <AgentsList
            data={agents}
            showPreview={showDetail}
            onSelect={(agent) => onSelectItem(agent)}
            scrollEnabled={scrollEnabled}
            maxVisibleItems={viewableListItemCount}
            containerStyle={styles.listContainer}
            listStyle={styles.list}
            listContentStyle={styles.listContentContainer}
            itemStyle={styles.listItem}
          />
        </Menu>
        <AgentDetail
          shouldShow={showDetail}
          item={focusAgent}
          onMaximize={() => setShowList(false)}
          onMinimize={() => setShowList(true)}
          onClose={() => onCloseDetail()}
        />
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuContent: {
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

AgentsMenu.defaultProps = {
  shouldShow: false,
  onClose: (() => {}),
  viewableListItemCount: 7
};

export default AgentsMenu;
