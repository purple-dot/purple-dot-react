import React, { useEffect } from 'react';
import { usePurpleDotConfig } from './PurpleDot';
import { usePurpleDotCheckout } from './use-purple-dot-checkout';

export const PreorderCheckout = ({ cart, onItemRemoved }) => {
  const { sdk } = usePurpleDotConfig();
  const { preorderCheckout } = usePurpleDotCheckout({ cart });

  useEffect(() => {
    if (preorderCheckout) {
      sdk.showCombinedCart({ shopifyCart: cart });
    }

    window.addEventListener('message', async (message) => {
      if (message.origin !== 'https://www.purpledotprice.com') {
        return;
      }

      const { meta, data } = message.data;
      if (meta && meta.type === 'remove-line-item') {
        await onItemRemoved({ variantId: data.externalVariantId });
      }
    });
  }, [sdk]);

  return <div />;
};
