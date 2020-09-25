import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

import PurpleDot from './PurpleDotContext';
import makeElement from './makeElement';

const apiKey = 'abc123';

describe('makeElement()', () => {
  it('sets the display name of the element based on the placement type', () => {
    const PriceShortElement = makeElement('price-short');

    expect(PriceShortElement.displayName).toEqual('PriceShortElement');
  });

  it('calls load() on the element when it is created and update() if the props change', async () => {
    const purpleDot = await loadPurpleDot();

    const PriceElement = makeElement('price');

    const { rerender } = render(
      <PurpleDot apiKey={apiKey}>
        <PriceElement sku="SKU123" />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(purpleDot.load).toHaveBeenCalledWith({
        placementType: 'price',
        instanceId: '1',
        sku: 'SKU123',
      });
    });

    rerender(
      <PurpleDot apiKey={apiKey}>
        <PriceElement sku="SKU456" />
      </PurpleDot>,
    );

    expect(purpleDot.update).toHaveBeenCalledWith({
      placementType: 'price',
      instanceId: '1',
      sku: 'SKU456',
    });
  });

  it('warns when the instanceId prop changes', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    await loadPurpleDot();

    const PriceElement = makeElement('price');

    const { rerender } = render(
      <PurpleDot apiKey={apiKey}>
        <PriceElement sku="SKU123" instanceId="123" />
      </PurpleDot>,
    );

    rerender(
      <PurpleDot apiKey={apiKey}>
        <PriceElement sku="SKU123" instanceId="456" />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith(
        'Unsupported prop change: cannot change instanceId after an element has been created.',
      );
    });

    jest.clearAllMocks();
  });
});
