import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

export const PurpleDotContext = React.createContext('not_set');

export const usePurpleDot = () => useContext(PurpleDotContext);

const PurpleDot = ({ apiKey, children }) => {
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    loadPurpleDot().then((purpleDot) => {
      purpleDot.init({ apiKey });
      setCtx(purpleDot);
    });
  }, [apiKey]);

  return (
    <PurpleDotContext.Provider value={ctx}>{children}</PurpleDotContext.Provider>
  );
};

PurpleDot.propTypes = {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default PurpleDot;
