import React from 'react';
import { AVAILABILITY } from './use-purple-dot';

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

const WaitlistPoweredBy = () => (
  <>
    <style>
      {`
        .pd-logo:before {
          display: inline-block;
          position: relative;
          content: ' ';
          border-radius: 50%;
          width: 8px;
          height: 8px;
          bottom: 1px;
          background-color: #8F17D1;
        }

        .pd-logo {
          display: inline-block;
          color: #8F17D1;
        }
      `}
    </style>
    <p id="pd-branding">
      Waitlist powered by
      {' '}
      <span className="pd-logo">
        Purple Dot
      </span>
    </p>
  </>
);

const WaitlistShipDates = ({
  availability,
}) => {
  const productWaitlist = availability.data?.product.waitlist;
  const selectedVariantWaitlist = availability.data?.selectedVariant?.waitlist;
  const waitlist = selectedVariantWaitlist ?? productWaitlist;

  return (
    <p id="pd-dispatch-dates">
      {waitlist?.display_dispatch_date}
    </p>
  );
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
