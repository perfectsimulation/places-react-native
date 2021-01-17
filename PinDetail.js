import React from 'react';
import PinDetailPreview from './PinDetailPreview';
import PinDetailFull from './PinDetailFull';

const PinDetail = (props) => {

  const {
    shouldShow,
    showPreview,
    pin,
    onPressAdd,
  } = props;

  // null checks / default values
  const show = shouldShow ?? false;
  const preview = showPreview ?? true;
  const fullView = !preview;
  const onPressAddButton = onPressAdd ?? (() => {});

  if (!pin) {
    return <></>;
  }

  if (preview) {
    return (
      <PinDetailPreview
        shouldShow={show}
        pin={pin}
        onPressAdd={() => onPressAddButton()}
      />
    );
  }

  if (fullView) {
    return (
      <PinDetailFull
        shouldShow={show}
        pin={pin}
      />
    );
  }

  return <></>;

}

export default PinDetail;
