import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Menu from './Menu';

const AgentDetailFull = (props) => {
  const {
    shouldShow,
    item,
    top
  } = props;

  if (item === undefined) {
    return <></>;
  }

  return (
    <Menu
      shouldShow={shouldShow}
      title={item.name}
      style={[{
        ...styles.menuContent,
        top: top
      }]}
      showDefaultCloseButton={false}
      backgroundColor={'#151515c3'}
    />
  );
}

const styles = StyleSheet.create({
  menuContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

export default AgentDetailFull;
