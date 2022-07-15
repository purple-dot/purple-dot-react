import { useAsync } from 'react-async';
import { usePurpleDotConfig } from './PurpleDot';

const fetchAvailability = async ({ productId, apiKey }, { signal }) => {
  const res = await fetch(
    `https://www.purpledotprice.com/api/v1/availability?api_key=${apiKey}&product_id=${productId}`,
    { signal },
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const body = await res.json();
  return body.data;
};

const fetchWaitlists = async ({ apiKey }, { signal }) => {
  const res = await fetch(
    `https://www.purpledotprice.com/api/v1/waitlists?api_key=${apiKey}`,
    { signal },
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const body = await res.json();
  return { waitlists: body.data };
};

export const useAvailability = ({ productId }) => {
  const { apiKey } = usePurpleDotConfig();
  return useAsync({
    promiseFn: fetchAvailability,
    productId,
    apiKey,
  });
};

export const useWaitlists = () => {
  const { apiKey } = usePurpleDotConfig();
  return useAsync({
    promiseFn: fetchWaitlists,
    apiKey,
  });
};
