/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useLayoutEffect } from 'react';
import { usePurpleDotConfig } from './PurpleDot';

export const PreorderSelfService = ({ email, onPreorderCancelled, onArrangeReturnClicked }) => {
  const { sdk } = usePurpleDotConfig();

  useLayoutEffect(() => {
    if (sdk) {
      sdk.loadPreorderStatusPage({ email });
    }
  }, [sdk, email]);

  useEffect(() => {
    if (sdk) {
      const cancelledCb = (e) => {
        onPreorderCancelled(e);
      };

      const onArrangeCb = (e) => {
        onArrangeReturnClicked(e);
      };
      sdk.on('PreorderCancelled', cancelledCb);
      sdk.on('ArrangeReturnClicked', onArrangeCb);
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
