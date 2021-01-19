import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import DraggableDrawer from './DraggableDrawer';
import Button from './Button';

const AgentDetail = (props) => {

  const {
    shouldShow,
    item,
    onMaximize,
    onMinimize,
    onClose
  } = props;

  const renderPreviewContent = () => (
    <View style={styles.previewContainer}>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => console.log('info')}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          iconStyle={styles.bigButtonIcon}
          iconSource={require('./icons/inner-white.png')}
        />
        <Button
          onPress={() => console.log('data')}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          iconStyle={styles.buttonIcon}
          iconSource={require('./icons/nerve-white.png')}
        />
        <Button
          onPress={() => console.log('notes')}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          iconStyle={styles.bigButtonIcon}
          iconSource={require('./icons/outer-white.png')}
        />
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>カケグルイマショウカ</Text>
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
  previewContainer: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: '#aa44bb77'
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 106,
    // backgroundColor: '#55aa6677'
  },
  contentText: {
    paddingLeft: 3,
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: 'white',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 44,
    width: 44,
    borderRadius: 44,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    // backgroundColor: '#8833ee55'
  },
  buttonIcon: {
    height: 32,
    width: 32
  },
  bigButtonIcon: {
    height: 40,
    width: 40
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
