import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import DraggableDrawer from './DraggableDrawer';
import SegmentedControl from './SegmentedControl';
import AgentProfile from './AgentProfile';

const AgentDetail = (props) => {

  const {
    shouldShow,
    item,
    onMaximize,
    onMinimize,
    onClose
  } = props;

  const onPressInfo = () => {
    setSegmentContent(renderInfoContent());
  }

  const onPressTime = () => {
    setSegmentContent(renderTimeContent());
  }

  const onPressData = () => {
    setSegmentContent(renderDataContent());
  };

  const renderInfoContent = () => {
    return (
      <View
        style={styles.info}
      >
        <AgentProfile/>
      </View>
    );
  }

  const renderTimeContent = () => {
    return (
      <View
        style={styles.time}
      >
        <View>
          <Text style={styles.contentText}>
            Time
          </Text>
        </View>
      </View>
    );
  }

  const renderDataContent = () => {
    return (
      <View
        style={styles.data}
      >
        <View>
          <Text style={styles.contentText}>
            Data
          </Text>
        </View>
      </View>
    );
  }

  const [segmentContent, setSegmentContent] = useState(renderInfoContent());

  const renderPreviewContent = () => (
    <View style={styles.previewContainer}>
      <SegmentedControl
        segments={[
          {
            id: 'info',
            onPress: (() => onPressInfo()),
            source: require('./icons/inner-white.png')
          },
          {
            id: 'time',
            onPress: (() => onPressTime()),
            source: require('./icons/nerve-white.png')
          },
          {
            id: 'data',
            onPress: (() => onPressData()),
            source: require('./icons/outer-white.png')
          },
        ]}
      />
      {segmentContent}
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {segmentContent}
    </View>
  );

  return (
    <DraggableDrawer
      shouldShow={shouldShow}
      previewContent={renderPreviewContent()}
      content={renderContent()}
      onMaximize={() => onMaximize()}
      onMinimize={() => onMinimize()}
      onClose={() => onClose()}
      backgroundColor={'#151515c3'}
    />
  );
}

const styles = StyleSheet.create({
  info: {
    padding: 10,
    flex: 1,
    display: 'flex'
  },
  time: {
    padding: 10,
    flex: 1,
    display: 'flex',
    backgroundColor: '#bb337722'
  },
  data: {
    padding: 10,
    flex: 1,
    display: 'flex',
    backgroundColor: '#77773333'
  },
  previewContainer: {
    height: '100%'
  },
  contentContainer: {
    paddingTop: 108,
    height: '100%',
    // backgroundColor: '#bb337722'
  },
  contentText: {
    paddingLeft: 3,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white',
  }
});

AgentDetail.defaultProps = {
  shouldShow: false,
  item: {},
  onMaximize: (() => {}),
  onMinimize: (() => {}),
  onClose: (() => {}),
};

export default AgentDetail;
