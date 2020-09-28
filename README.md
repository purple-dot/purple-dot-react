# Purple Dot SDK React Components

React components for the [purpledot.js SDK](https://www.purpledotprice.com/docs/reference/javascript-sdk).

## Installation

```
npm install @purple-dot/purple-dot-react
```

## Example Usage

First, you need to set up the `PurpleDot` context. This components loads our
JavaScript library and all other elements must be its children. You only need to
include it once.

Next, you can use the `*Element` placement elements in your components.

If you need access to the SDK object, you can use the `usePurpleDot` hook.

```javascript
import React, { useEffect } from 'react';
import { PurpleDot, PriceElement, ButtonElement, usePurpleDot } from '@purple-dot/purple-dot-react';

const ProductPage = ({ sku, name, price }) => {
  const purpleDot = usePurpleDot();

  useEffect(() => {
    if (purpleDot) {
      purpleDot.on('OrderSubmitted', ({ sku }) => {
        analytics.track('Purple Dot Order Submitted', { sku });
      });
    }
  }, [purpleDot]);

  return (
    <PurpleDot apiKey="87d9920c-c9d4-4a17-9b77-cfd71a2d4f1a">
      <div class="product-page">
        <span>{name}</span>
        <span>{price}</span>

        <PriceElement sku={sku} />

        <button id="add-to-cart">Add to Cart</button>

        <ButtonElement sku={sku} />

      </div>
    </PurpleDot>
  );
}
```

## Documentation

### `PurpleDot`

A context provider that loads the SDK and makes it available to its children.

```javascript
import { PurpleDot } from '@purple-dot/purple-dot-react';

<PurpleDot
  apiKey="87d9920c-c9d4-4a17-9b77-cfd71a2d4f1a" // Your public API key
/>
```

### `usePurpleDot`

A hook that returns an instance of the SDK. Because it loads asynchronously, it
returns `null` initially and when rendering on the server.

```javascript
import { usePurpleDot } from '@purple-dot/purple-dot-react';

const Component = () => {
  // Returns the SDK instance
  const purpleDot = usePurpleDot();

  useEffect(() => {
    // Wrap any usage in a null check
    if (purpleDot) {
      purpleDot.on('OrderSubmitted', () => { /* Your code */ });
    }
  }, [purpleDot]);

  return <div />;
};
```

### `PriceElement`

A component for the price placement.

```javascript
import { PriceElement } from '@purple-dot/purple-dot-react';

<PriceElement
  sku="SKU123" // The SKU of the product to show a price for (required)
  instanceId="2" // Used if there are multiple instances of the same element on the page
  onLoad={() => {}} // A callback that fires when the price starts showing
/>
```

### `ButtonElement`

A component for the CTA placement.

```javascript
import { ButtonElement } from '@purple-dot/purple-dot-react';

<ButtonElement
  sku="SKU123" // The SKU of the product to show a price for (required)
  instanceId="2" // Used if there are multiple instances of the same element on the page
  onLoad={() => {}} // A callback that fires when the price starts showing
/>
```

### Minimum Requirements

The minimum supported version of React is v16.8.
