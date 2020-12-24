import React, { useState } from 'react';
import Pin from './Pin';
import PinPlacementOverlay from './PinPlacementOverlay';
import PinFormOverlay from './PinFormOverlay';

const CreatePinView = (props) => {

  const {
    shouldShow,
    isDraggingMap,
    currentRegion,
    onConfirmLocation,
    onRepositionPin,
    onPressCancelButton,
    onPressConfirmButton
  } = props;

  const region = currentRegion ?? { latitude: 0, longitude: 0 };

  // toggle overlay components for positioning new pin
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

  // hide pin form overlay and show pin placement overlay
  const repositionPin = () => {
    setIsLocationConfirmed(false);
    onRepositionPin();
  }

  // hide pin placement overlay and show pin form overlay
  const confirmLocation = () => {
    setIsLocationConfirmed(true);
    onConfirmLocation();
  }

  const shouldShowPlacementOverlay = () => {
    return shouldShow && !isLocationConfirmed;
  }

  const shouldShowFormOverlay = () => {
    return shouldShow && isLocationConfirmed;
  }

  return (
    <>
      <Pin shouldShow={shouldShow} />
      <PinPlacementOverlay
        shouldShow={shouldShowPlacementOverlay()}
        isDraggingMap={isDraggingMap}
        onConfirmLocation={() => confirmLocation()}
        onPressCancelButton={() => onPressCancelButton()}
      />
      <PinFormOverlay
        shouldShow={shouldShowFormOverlay()}
        isDraggingMap={isDraggingMap}
        currentRegion={region}
        onRepositionPin={() => repositionPin()}
        onPressConfirmButton={(pinForm) => onPressConfirmButton(pinForm)}
      />
    </>
  );
}

export default CreatePinView;
