import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Menu from './Menu';
import CreateNote from './CreateNote';

const NotesMenu = (props) => {

  const {
    shouldShow,
    showCreate,
    onClose
  } = props;

  return (
    <Menu
      shouldShow={shouldShow}
      onClose={() => onClose()}
      // backgroundColor={'#dd337788'}
    >
      <CreateNote
        shouldShow={showCreate}
        onClose={() => onClose()}
      />
    </Menu>
  );

}

const styles = StyleSheet.create({
  menuContent: {
    height: '100%',
    width: '100%'
  }
});

export default NotesMenu;
