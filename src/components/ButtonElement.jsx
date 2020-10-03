/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import makeComponent from './makeElement';
import { usePurpleDot } from './PurpleDotContext';

const Button = makeComponent('button');

const ButtonElement = ({ customerData, ...props }) => {
  const purpleDot = usePurpleDot();

  useEffect(() => {
    if (purpleDot) {
      purpleDot.setCustomerData(customerData);
    }
  }, [purpleDot, customerData]);

  return <Button {...props} />;
};

ButtonElement.propTypes = {
  customerData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};

ButtonElement.defaultProps = {
  customerData: null,
};

export default ButtonElement;
