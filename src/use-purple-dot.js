import { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useAvailability as usePreorderAvailability, useWaitlists } from './use-data';
import { mergeAsyncResults } from './merge-async-results';

export const AVAILABILITY = {
  IN_STOCK: 'IN_STOCK',
  PRE_ORDER: 'PRE_ORDER',
  SOLD_OUT: 'SOLD_OUT',
};

const availability = (inStock, preorder) => {
  if (inStock?.inventory_quantity > 0) {
    return AVAILABILITY.IN_STOCK;
  } if (preorder?.available_stock > 0) {
    return AVAILABILITY.PRE_ORDER;
  }
  return AVAILABILITY.SOLD_OUT;
};

const findVariant = (avail, variantId) => avail.variants
  .find((v) => v.id.toString() === variantId.toString());

const selectedVariant = ({
  inStockAvailability, preorderAvailability, waitlists, selectedVariantId,
}) => {
  if (!selectedVariantId) {
    return undefined;
  }

  const inStockVariant = findVariant(inStockAvailability, selectedVariantId);
  const preorderVariant = findVariant(preorderAvailability, selectedVariantId);
  const availabilityResult = availability(inStockVariant, preorderVariant);
  const waitlist = waitlists.waitlists
    .find((w) => w.id === preorderVariant.waitlist_id);
  const properties = availabilityResult === AVAILABILITY.PRE_ORDER ? {
    __releaseId: preorderVariant.waitlist_id,
    'Purple Dot Pre-order': waitlist.display_dispatch_date,
  } : undefined;

  return {
    id: selectedVariantId.toString(),
    availability: availabilityResult,
    waitlist,
    properties,
  };
};

const useInStockAvailability = ({ fetchAvailability, productId }) => {
  const promiseFn = useCallback(
    (...args) => Promise.resolve(fetchAvailability(...args)),
    [fetchAvailability],
  );
  return useAsync({
    promiseFn,
    productId,
    watch: `${productId}`,
  });
};

export const usePurpleDot = ({
  productId,
  selectedVariantId = null,
  fetchAvailability,
}) => {
  const preorderResult = usePreorderAvailability({ productId });
  const inStockResult = useInStockAvailability({ productId, fetchAvailability });
  const waitlistsResult = useWaitlists();
  const result = mergeAsyncResults(preorderResult, inStockResult, waitlistsResult);

  if (!result.isFulfilled) {
    return result;
  }

  const [preorderAvailability, inStockAvailability, waitlists] = result.data;

  return {
    isFulfilled: true,
    data: {
      product: {
        id: productId.toString(),
        availability: availability(inStockAvailability, preorderAvailability),
        waitlist: waitlists.waitlists
          .find((w) => w.product.id === productId.toString()),
      },
      selectedVariant: selectedVariant({
        inStockAvailability,
        preorderAvailability,
        selectedVariantId,
        waitlists,
      }),
    },
  };
};
