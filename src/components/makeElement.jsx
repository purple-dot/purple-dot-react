import React, { useLayoutEffect, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePurpleDot } from './PurpleDotContext';
import toElemName from '../util/to-elem-name';

const makeElement = (placementType) => {
  const Element = ({ instanceId, sku }) => {
    const purpleDot = usePurpleDot();
    const isLoaded = useRef(false);

    useLayoutEffect(() => {
      if (purpleDot) {
        if (!isLoaded.current) {
          purpleDot.load({
            placementType,
            instanceId,
            sku,
          });
          isLoaded.current = true;
        } else {
          purpleDot.update({
            placementType,
            instanceId,
            sku,
          });
        }
      }
    }, [purpleDot, sku]);

    const prevInstanceId = useRef(instanceId);
    useEffect(() => {
      if (prevInstanceId.current !== instanceId) {
        console.warn('Unsupported prop change: cannot change instanceId after an element has been created.');
      }
    }, [instanceId]);

    return (
      <div
        data-purple-dot-placement-type={placementType}
        data-purple-dot-instance-id={instanceId}
      />
    );
  };

  Element.propTypes = {
    instanceId: PropTypes.string,
    sku: PropTypes.string.isRequired,
  };

  Element.defaultProps = {
    instanceId: '1',
  };

  Element.displayName = `${toElemName(placementType)}Element`;

  return Element;
};

export default makeElement;
