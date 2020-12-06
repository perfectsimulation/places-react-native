import React from 'react';
import PinDetailPreview from './PinDetailPreview';
import PinDetailFull from './PinDetailFull';

const PinDetail = (props) => {

  const {
    shouldShow,
    showPreview,
    pin // *** REQUIRED ***
  } = props;

  // null checks / default values
  const show = shouldShow ?? false;
  const preview = showPreview ?? true;
  const fullView = !preview;

  if (!show) {
    return <></>;
  }

  if (!pin) {
    return <></>;
  }

  if (preview) {
    return <PinDetailPreview pin={pin} />
  }

  if (fullView) {
    return <PinDetailFull pin={pin} />
  }

}

export default PinDetail;
