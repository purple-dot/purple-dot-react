import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

export const PurpleDotContext = React.createContext('not_set');

export const usePurpleDot = () => useContext(PurpleDotContext);

const PurpleDot = ({ apiKey, enableCart, children }) => {
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    loadPurpleDot().then((purpleDot) => {
      purpleDot.init({ apiKey, enableCart });
      setCtx(purpleDot);
    });
  }, [apiKey, enableCart]);

  return (
    <PurpleDotContext.Provider value={ctx}>{children}</PurpleDotContext.Provider>
  );
};

PurpleDot.propTypes = {
  apiKey: PropTypes.string.isRequired,
  enableCart: PropTypes.element,
  children: PropTypes.element.isRequired,
};

PurpleDot.defaultProps = {
  enableCart: false,
};

export default PurpleDot;
