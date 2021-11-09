/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import makeComponent, { useCallbackForEvent } from './makeElement';
import { usePurpleDot } from './PurpleDotContext';

const CartButton = makeComponent('cart-button');

const CartButtonElement = ({
  onVisibilityChanged,
  ...props
}) => {
  const purpleDot = usePurpleDot();

  useCallbackForEvent({
    purpleDot,
    eventName: 'CartButtonVisibilityChanged',
    callback: onVisibilityChanged,
  });

  return <CartButton {...props} />;
};

CartButtonElement.propTypes = {
  onVisibilityChanged: PropTypes.func,
};

CartButtonElement.defaultProps = {
  onVisibilityChanged: null,
};

export default CartButtonElement;
