import React from 'react';
import { AVAILABILITY } from './use-purple-dot';
import { WaitlistPoweredBy } from './WaitlistPoweredBy';
import { WaitlistShipDates } from './WaitlistShipDates';

const label = (availability) => {
  if (!availability.isFulfilled) {
    return 'Sold out';
  }
  if (!availability.data?.selectedVariant
      && availability.data?.product.availability === AVAILABILITY.PRE_ORDER) {
    return 'Pre-order';
  }
  if (availability.data?.selectedVariant?.availability === AVAILABILITY.PRE_ORDER) {
    return 'Pre-order';
  }
  if (availability.data?.selectedVariant?.availability === AVAILABILITY.SOLD_OUT) {
    return 'Sold out';
  }
  return 'Add to cart';
};

export const PreorderButton = ({
  onClick,
  availability,
  renderButton,
}) => {
  const showPreorderElements = (
    availability.isFulfilled
      && (availability.data?.selectedVariant?.availability === AVAILABILITY.PRE_ORDER || (
        !availability.data?.selectedVariant
          && availability.data?.product?.availability === AVAILABILITY.PRE_ORDER
      ))
  );

  return (
    <>
      {
        renderButton({
          disabled: !availability.isFulfilled || !availability.data?.selectedVariant,
          children: <span>{label(availability)}</span>,
          onClick: () => {
            onClick({
              id: availability.data.selectedVariant.id,
              properties: availability.data.selectedVariant.properties,
            });
          },
        })
      }
      {showPreorderElements ? (
        <>
          <WaitlistShipDates
            availability={availability}
          />
          <WaitlistPoweredBy />
        </>
      ) : null}
    </>
  );
};
