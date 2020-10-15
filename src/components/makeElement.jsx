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
  const Element = ({
    instanceId, productId, productCode, sku, style, hoverStyle, disabledStyle, labelStyle, onLoad,
  }) => {
    const purpleDot = usePurpleDot();
    const isLoaded = useRef(false);

    if (purpleDot === 'not_set') {
      throw new Error('Purple Dot placement elements must be wrapped in <PurpleDot /> context');
    }

    useLayoutEffect(() => {
      if (purpleDot) {
        if (!isLoaded.current) {
          purpleDot.load({
            placementType,
            instanceId,
            productId,
            productCode,
            sku,
            style,
            hoverStyle,
            disabledStyle,
            labelStyle,
          });
          isLoaded.current = true;
        } else {
          purpleDot.update({
            placementType,
            instanceId,
            productId,
            productCode,
            sku,
            style,
          });
        }
      }
    }, [purpleDot, sku, productId, productCode]);

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

  const styleShape = PropTypes.shape({
    cssSrc: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
    lineHeight: PropTypes.string,
    letterSpacing: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    backgroundColor: PropTypes.string,
  });

  Element.propTypes = {
    instanceId: PropTypes.string,
    productId: PropTypes.string,
    productCode: PropTypes.string,
    sku: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    style: styleShape,
    hoverStyle: styleShape,
    disabledStyle: styleShape,
    labelStyle: styleShape,
  };

  Element.defaultProps = {
    instanceId: '1',
    onLoad: () => {},
    productId: undefined,
    productCode: undefined,
    style: undefined,
    hoverStyle: undefined,
    disabledStyle: undefined,
    labelStyle: undefined,
  };

  Element.displayName = `${toElemName(placementType)}Element`;

  return Element;
};

export default makeElement;
