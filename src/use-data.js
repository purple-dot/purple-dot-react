import { useAsync } from 'react-async';
import { usePurpleDotConfig } from './PurpleDot';

const fetchURL = async (url, { signal }) => {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(res.statusText || `HTTP Error: ${res.status}`);
  }
  const body = await res.json();
  return body.data;
};

const fetchAvailability = async ({ productId, apiKey }, { signal }) => fetchURL(
  `https://www.purpledotprice.com/api/v1/availability?api_key=${apiKey}&product_id=${productId}`,
  { signal },
);

const fetchWaitlists = async ({ apiKey }, { signal }) => {
  const waitlists = await fetchURL(
    `https://www.purpledotprice.com/api/v1/waitlists?api_key=${apiKey}`,
    { signal },
  );
  return { waitlists };
};

export const useAvailability = ({ productId }) => {
  const { apiKey } = usePurpleDotConfig();
  return useAsync({
    promiseFn: fetchAvailability,
    productId,
    apiKey,
    watch: `${apiKey}:${productId}`,
  });
};

export const useWaitlists = () => {
  const { apiKey } = usePurpleDotConfig();
  return useAsync({
    promiseFn: fetchWaitlists,
    apiKey,
    watch: `${apiKey}`,
  });
};
