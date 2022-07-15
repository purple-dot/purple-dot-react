import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

export const PurpleDotContext = React.createContext({ apiKey: null, sdk: undefined });

export const usePurpleDotConfig = () => useContext(PurpleDotContext);

const PurpleDot = ({ apiKey, children }) => {
  const [sdk, setSdk] = useState(null);

  useEffect(() => {
    if (apiKey) {
      loadPurpleDot().then((purpleDot) => {
        purpleDot.init({ apiKey, enableCombinedCart: true });
        setSdk(purpleDot);
      });
    }
  }, [apiKey]);

  return (
    <PurpleDotContext.Provider value={{ apiKey, sdk }}>
      {children}
    </PurpleDotContext.Provider>
  );
};

PurpleDot.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default PurpleDot;
