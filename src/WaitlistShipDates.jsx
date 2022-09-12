import React from 'react';

const WaitlistShipDates = ({
  availability,
  className,
}) => {
  const productWaitlist = availability.data?.product.waitlist;
  const selectedVariantWaitlist = availability.data?.selectedVariant?.waitlist;
  const waitlist = selectedVariantWaitlist ?? productWaitlist;

  return (
    <p id="pd-dispatch-dates" className={className}>
      {waitlist?.display_dispatch_date}
    </p>
  );
};

export { WaitlistShipDates };
