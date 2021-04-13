/* eslint-disable no-underscore-dangle */
import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { loadPurpleDot } from '@purple-dot/purple-dot-js';

import PurpleDot from './PurpleDotContext';
import makeElement from './makeElement';

const apiKey = 'abc123';

describe('makeElement()', () => {
  it('sets the display name of the element based on the placement type', () => {
    const ButtonElement = makeElement('button');

    expect(ButtonElement.displayName).toEqual('ButtonElement');
  });

  it('calls load() on the element when it is created and update() if the props change', async () => {
    const purpleDot = await loadPurpleDot();

    const ButtonElement = makeElement('button');

    const { rerender } = render(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU123" style={{ textColor: '#FF00FF' }} />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(purpleDot.load).toHaveBeenCalledWith({
        placementType: 'button',
        instanceId: '1',
        sku: 'SKU123',
        style: { textColor: '#FF00FF' },
        fallbackToSoldOut: false,
      });
    });

    rerender(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU456" style={{ textColor: '#000' }} />
      </PurpleDot>,
    );

    expect(purpleDot.update).toHaveBeenCalledWith({
      placementType: 'button',
      instanceId: '1',
      sku: 'SKU456',
      style: { textColor: '#000' },
      fallbackToSoldOut: false,
    });
  });

  it('warns when the instanceId prop changes', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    await loadPurpleDot();

    const ButtonElement = makeElement('button');

    const { rerender } = render(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU123" instanceId="123" />
      </PurpleDot>,
    );

    rerender(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku="SKU123" instanceId="456" />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith(
        'Unsupported prop change: cannot change instanceId after an element has been created.',
      );
    });

    jest.clearAllMocks();
  });

  it('calls the onLoad function when the SDK fires PlacementLoaded', async () => {
    const purpleDot = await loadPurpleDot();
    jest.spyOn(purpleDot, 'on');

    const sku = 'SKU123';
    const instanceId = '123';
    const placementType = 'button';
    const onLoad = jest.fn();

    const ButtonElement = makeElement(placementType);

    render(
      <PurpleDot apiKey={apiKey}>
        <ButtonElement sku={sku} instanceId={instanceId} onLoad={onLoad} />
      </PurpleDot>,
    );

    await waitFor(() => {
      expect(purpleDot.on).toHaveBeenCalled();
    });

    act(() => {
      purpleDot._fire('PlacementLoaded', { sku, instanceId, placementType });
    });

    expect(onLoad).toHaveBeenCalledWith({ sku, instanceId, placementType });
  });

  it('throws when used outside of the PurpleDot context', async () => {
    const ButtonElement = makeElement('button');

    expect(() => render(<ButtonElement sku="SKU123" />))
      .toThrow('Purple Dot placement elements must be wrapped in <PurpleDot /> context');
  });
});
