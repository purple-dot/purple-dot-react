import React from 'react';
import { LearnMoreButton } from './LearnMoreButton';

const WaitlistPoweredBy = ({ className }) => (
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
    <p id="pd-branding" className={className}>
      Waitlist powered by
      {' '}
      <span className="pd-logo">
        Purple Dot
      </span>
      <LearnMoreButton />
    </p>
  </>
);

export { WaitlistPoweredBy };
