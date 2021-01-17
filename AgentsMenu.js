import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
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
    onCreateAgentNote,
    viewableListItemCount,
  } = props;

  // null checks TODO make defaultProps
  const show = shouldShow ?? false;
  const onCloseMenu = onClose ?? (() => {});
  const maxVisibleItems = viewableListItemCount ?? 7;

  // agents data
  const [agents, setAgents] = useState([]);

  // either show the list or show the detail
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showDetail, setShowDetail] = useState(!scrollEnabled);

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
    if (show && !showDetail) setScrollEnabled(true);
  }, [show]);

  const onOpenDetail = () => {
    setScrollEnabled(false);
    setShowDetail(true);
  }

  const onCloseDetail = () => {
    setScrollEnabled(true);
    setShowDetail(false);
    setFocusAgent(undefined);
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
    onCloseDetail();
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
          data={agents}
          showPreview={showDetail}
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
