/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { usePurpleDot } from './PurpleDotContext';

const PreorderStatus = ({ email, onPreorderCancelled, onArrangeReturnClicked }) => {
  const purpleDot = usePurpleDot();

  useLayoutEffect(() => {
    purpleDot.loadPreorderStatusPage({ email });
  }, [purpleDot, email]);

  useEffect(() => {
    if (purpleDot) {
      const cancelledCb = (e) => {
        onPreorderCancelled(e);
      };

      const onArrangeCb = (e) => {
        onArrangeReturnClicked(e);
      };
      purpleDot.on('PreorderCancelled', cancelledCb);
      purpleDot.on('ArrangeReturnClicked', onArrangeCb);
    }

    return () => {
      // TODO: Unsubscribe here
      // purpleDot.off('PlacementLoaded', db);
    };
  });

  return (
    <div
      data-purple-dot-placement-type="pre-order-status-placement"
      data-purple-dot-instance-id="1"
    />
  );
};

PreorderStatus.propTypes = {
  email: PropTypes.string.isRequired,
  onPreorderCancelled: PropTypes.func,
  onArrangeReturnClicked: PropTypes.func,
};

PreorderStatus.defaultProps = {
  onPreorderCancelled: () => {},
  onArrangeReturnClicked: () => {},
};

export default PreorderStatus;
