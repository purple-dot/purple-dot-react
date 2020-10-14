# Purple Dot SDK React Components

React components for the [purpledot.js SDK](https://www.purpledotprice.com/docs/reference/javascript-sdk).

## Installation

```bash
npm install @purple-dot/purple-dot-react
```

## Example Usage

First, you need to set up the `PurpleDot` context. This components loads our
JavaScript library and all other elements must be its children. You only need to
include it once.

Next, you can use the `*Element` placement elements in your components.

If you need access to the SDK object, you can use the `usePurpleDot` hook.

```jsx
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

```jsx
import { PurpleDot } from '@purple-dot/purple-dot-react';

<PurpleDot
  apiKey="87d9920c-c9d4-4a17-9b77-cfd71a2d4f1a" // Your public API key
/>
```

### `usePurpleDot`

A hook that returns an instance of the SDK. Because it loads asynchronously, it
returns `null` initially and when rendering on the server.

```jsx
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

```jsx
import { PriceElement } from '@purple-dot/purple-dot-react';

<PriceElement
  /* The SKU of the product to show a price for (required) */
  sku="SKU123"
  /* Used if there are multiple instances of the same element on the page */
  instanceId="2"
  /* A callback that fires when the price starts showing */
  onLoad={() => {}}
  /* A style element that customises the placement's appearance.
     See https://www.purpledotprice.com/docs/reference/javascript-sdk#the-style-object */
  style={{ fontSize: '16px' }}
/>
```

### `ButtonElement`

A component for the CTA placement.

```jsx
import { ButtonElement } from '@purple-dot/purple-dot-react';

<ButtonElement
  /* Your unqiue product identifier */
  productCode="product-code"
  /* The SKU of the product to show a price for (required) */
  sku="SKU123"
  /* Used if there are multiple instances of the same element on the page */
  instanceId="2"
  /* A callback that fires when the price starts showing */
  onLoad={() => {}}
  /* An object or an (async) function returning an object with customer details
     to pre-fill the checkout with */
  customerData={() => {
    return {
      email: 'joe@test.com',
      address: {
        firstName: 'John',
        lastName: 'Smith',
        line1: '5 Test House',
        line2: '123 Test St',
        city: 'Testville',
        country: 'GB',
        postalCode: 'T14 1TT',
        phoneNumber: '07123 12345',
      },
  }}
  /* A style element that customises the placement's appearance.
     See https://www.purpledotprice.com/docs/reference/javascript-sdk#the-style-object */
  style={{ fontSize: '16px' }}
  hoverStyle={{ backgroundColor: '#FFF' }}
  disabledStyle={{ backgroundColor: '#D8D8D8' }}
/>
```

### `MessagingElement`

A component for the messaging placement.

```jsx
import { MessagingElement } from '@purple-dot/purple-dot-react';

<MessagingElement
  // The SKU of the product that determines what messaging is shown
  sku="SKU123"
  // Used if there are multiple instances of the same element on the page
  instanceId="2"
  // A callback that fires when the messaging element starts showing
  onLoad={() => {}}
/>
```

### Minimum Requirements

The minimum supported version of React is v16.8.
