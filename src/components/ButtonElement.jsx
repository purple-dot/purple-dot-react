/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import makeComponent, { useCallbackForEvent } from './makeElement';
import { usePurpleDot } from './PurpleDotContext';

const Button = makeComponent('button');

const ButtonElement = ({
  customerData,
  onPreorderCheckoutStep,
  onPreorderCheckoutSubmitted,
  onPreorderCreated,
  onPreorderFailed,
  ...props
}) => {
  const purpleDot = usePurpleDot();

  useEffect(() => {
    if (purpleDot) {
      purpleDot.setCustomerData(customerData);
    }
  }, [purpleDot, customerData]);

  useCallbackForEvent({
    purpleDot,
    eventName: 'PreorderCheckoutStep',
    callback: onPreorderCheckoutStep,
  });

  useCallbackForEvent({
    purpleDot,
    eventName: 'PreorderCheckoutSubmitted',
    callback: onPreorderCheckoutSubmitted,
  });

  useCallbackForEvent({
    purpleDot,
    eventName: 'PreorderCreated',
    callback: onPreorderCreated,
  });

  useCallbackForEvent({
    purpleDot,
    eventName: 'PreorderFailed',
    callback: onPreorderFailed,
  });

  return <Button {...props} />;
};

ButtonElement.propTypes = {
  customerData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),

  onPreorderCheckoutStep: PropTypes.func,
  onPreorderCheckoutSubmitted: PropTypes.func,
  onPreorderCreated: PropTypes.func,
  onPreorderFailed: PropTypes.func,
};

ButtonElement.defaultProps = {
  customerData: null,

  onPreorderCheckoutStep: null,
  onPreorderCheckoutSubmitted: null,
  onPreorderCreated: null,
  onPreorderFailed: null,
};

export default ButtonElement;
