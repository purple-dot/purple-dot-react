import { usePurpleDotConfig } from './PurpleDot';

export const usePurpleDotCheckout = ({ cart }) => {
  const { sdk } = usePurpleDotConfig();

  if (sdk && sdk.cartContainsPreorderItems({ shopifyCart: cart })) {
    return { preorderCheckout: true };
  }
  return { preorderCheckout: false };
};
