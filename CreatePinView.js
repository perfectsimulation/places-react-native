import React, { useState } from 'react';
import AddPinOverlay from './AddPinOverlay';

const CreatePinView = (props) => {

  const [isNamingNewPin, setIsNamingNewPin] = useState(false);
  const [newPinName, setNewPinName] = useState(null);

  const {
    shouldShow,
    isDraggingMap,
    onPressCancelButton,
    onPressConfirmButton
  } = props;

  return (
    <AddPinOverlay
      shouldShow={shouldShow}
      isDraggingMap={isDraggingMap}
      onPressCancelButton={() => onPressCancelButton()}
      onPressConfirmButton={() => onPressConfirmButton()}
    />
  );
}

export default CreatePinView;
