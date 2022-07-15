import React, { useEffect } from 'react';
import { usePurpleDotConfig } from './PurpleDot';
import { usePurpleDotCheckout } from './use-purple-dot-checkout';

export const PreorderCheckout = ({ cart }) => {
  const { sdk } = usePurpleDotConfig();
  const { preorderCheckout } = usePurpleDotCheckout({ cart });

  useEffect(() => {
    if (preorderCheckout) {
      sdk.showCombinedCart({ shopifyCart: cart });
    }
  }, [sdk]);

  return <div />;
};
