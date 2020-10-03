/* eslint-disable no-underscore-dangle */
import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

import PurpleDot from './PurpleDotContext';
import ButtonElement from './ButtonElement';

const apiKey = 'abc123';

describe('ButtonElement', () => {
  it('passes through the customerData prop to the SDK', async () => {
    const purpleDot = await loadPurpleDot();

    const { rerender } = render(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU123" customerData={{ email: 'test@test.com' }} />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(purpleDot.setCustomerData).toHaveBeenCalledWith({ email: 'test@test.com' });
    });

    rerender(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU123" customerData={{ email: 'test2@test.com' }} />
      </PurpleDot>,
    );

    expect(purpleDot.setCustomerData).toHaveBeenCalledWith({ email: 'test2@test.com' });
  });
});
