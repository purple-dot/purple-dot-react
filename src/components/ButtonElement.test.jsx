/* eslint-disable no-underscore-dangle */
import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, act } from '@testing-library/react';
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

  it('subscribes to pre-order checkout events', async () => {
    const purpleDot = await loadPurpleDot();

    const onPreorderCheckoutStep = jest.fn();
    const onPreorderCheckoutSubmitted = jest.fn();
    const onPreorderCreated = jest.fn();
    const onPreorderFailed = jest.fn();

    render(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement
          sku="SKU123"
          onPreorderCheckoutStep={onPreorderCheckoutStep}
          onPreorderCheckoutSubmitted={onPreorderCheckoutSubmitted}
          onPreorderCreated={onPreorderCreated}
          onPreorderFailed={onPreorderFailed}
        />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(purpleDot.load).toHaveBeenCalled();
    });

    act(() => {
      purpleDot._fire('PreorderCheckoutStep', { stepNumber: 1 });
    });
    expect(onPreorderCheckoutStep).toHaveBeenCalledWith({ stepNumber: 1 });

    act(() => {
      purpleDot._fire('PreorderCheckoutSubmitted');
    });
    expect(onPreorderCheckoutSubmitted).toHaveBeenCalled();

    act(() => {
      purpleDot._fire('PreorderCreated', { reference: '123456' });
    });
    expect(onPreorderCreated).toHaveBeenCalledWith({ reference: '123456' });

    act(() => {
      purpleDot._fire('PreorderFailed');
    });
    expect(onPreorderFailed).toHaveBeenCalled();
  });
});
