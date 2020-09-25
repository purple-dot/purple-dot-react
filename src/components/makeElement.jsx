import React, { useLayoutEffect, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePurpleDot } from './PurpleDotContext';
import toElemName from '../util/to-elem-name';

const useCallbackForEvent = ({
  purpleDot, eventName, callback, placementType, instanceId,
}) => useEffect(() => {
  if (purpleDot) {
    const cb = (e) => {
      if (e.placementType === placementType && e.instanceId === instanceId) {
        callback(e);
      }
    };
    purpleDot.on(eventName, cb);
  }

  return () => {
    // TODO: Unsubscribe here
    // purpleDot.off('PlacementLoaded', db);
  };
}, [purpleDot]);

const makeElement = (placementType) => {
  const Element = ({ instanceId, sku, onLoad }) => {
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

    useCallbackForEvent({
      purpleDot,
      instanceId,
      placementType,
      eventName: 'PlacementLoaded',
      callback: onLoad,
    });

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
    onLoad: PropTypes.func,
  };

  Element.defaultProps = {
    instanceId: '1',
    onLoad: () => {},
  };

  Element.displayName = `${toElemName(placementType)}Element`;

  return Element;
};

export default makeElement;
