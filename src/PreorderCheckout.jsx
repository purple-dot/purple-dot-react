import React, { useEffect } from 'react';
import { usePurpleDotConfig } from './PurpleDot';
import { usePurpleDotCheckout } from './use-purple-dot-checkout';
import decodeId from './decode-id';

export const PreorderCheckout = ({ cart, onItemRemoved }) => {
  const { sdk } = usePurpleDotConfig();
  const { preorderCheckout } = usePurpleDotCheckout({ cart });

  useEffect(() => {
    if (preorderCheckout) {
      const shopifyCart = {
        ...cart,
        items: cart.items.map((item) => ({
          ...item,
          id: decodeId(item.id),
        })),
      };
      sdk.showCombinedCart({ shopifyCart });
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

    return () => {
      const iframe = document.querySelector('#checkout-iframe');
      if (iframe) {
        iframe.parentElement.removeChild(iframe);
      }
    };
  }, [sdk]);

  return <div />;
};
