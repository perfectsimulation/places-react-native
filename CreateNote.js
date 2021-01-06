import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Menu from './Menu';

const CreateNote = (props) => {

  const {
    shouldShow,
    onClose
  } = props;

  return (
    <Menu
      shouldShow={shouldShow}
      onClose={() => onClose()}
      backgroundColor={'#77aa77aa'}
    >
      <View style={styles.menuContent} />
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuContent: {
    height: '100%',
    width: '100%'
  }
});

export default CreateNote;
