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

```jsx
const App = () => (
  <PurpleDot apiKey="87d9920c-c9d4-4a17-9b77-cfd71a2d4f1a">
    <Page />
  </PurpleDot>
)
```

Next, you can use the `PreorderButton` and `PreorderCheckout` components and
`usePurpleDot` hook to integrate Purple Dot into your storefront.

### Product Page Example

```jsx
import React, { useEffect, useState } from 'react';
import { PurpleDot, usePurpleDot, PreorderButton } from '@purple-dot/purple-dot-react';

const ProductPage = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const availability = usePurpleDot({
    productId: product.id,
    selectedVariantId,
    fetchAvailability,
  });

  return (
    <div class="product-page">
      // Render a pre-order or an add to cart button depending on availability
      {availability.isFulfilled && availability.data.selectedVariant.availability === 'PRE_ORDER' ? (
        <PreorderButton
          availability={availability}
          onClick={(item) => addToCart(item)}
          renderButton={(props) => <button {...props} />}
        />
      ) : (
        <button id="add-to-cart">Add to Cart</button>
      )}
      
      // Exanple: render a pre-order badge if the product is available on pre-order
      {availability.isFulfilled && availability.data.product.availability === 'PRE_ORDER' ? (
        <Badge>Pre-order</Badge>
      ) : null}

    </div>
  );
}

async function fetchAvailability({ productId }) {
  // Get Shopify inventory quantity for a product and its variants
  return {
    id: 1,
    inventory_quantity: 3,
    variants: [{
      id: 1,
      inventory_quantity: 1,
    }, {
      id: 2,
      inventory_quantity: 0,
    }, {
      id: 3,
      inventory_quantity: 2,
    }],
  };
}

function addToCart({ id, properties }) {
  // Handle adding a variant to cart
}
```

### Checkout Example

On the cart page or inside a floating cart:

```jsx
import { usePurpleDotCheckout } from '@purple-dot/purple-dot-react';

const CartPage = ({ cart }) => {
  const { preorderCheckout } = usePurpleDotCheckout({ cart });
  
  return (
    <div class="cart-page">
      <button
        href={preorderCheckout ? '/pre-order-checkout' : '/checkout'}
      >
        Checkout now
      </button>
    </div>
  );
}
```

On a pre-order checkout page:

```jsx
import { usePurpleDotCheckout } from '@purple-dot/purple-dot-react';

const CartPage = ({ cart }) => {
  const { PreorderCheckout } = usePurpleDotCheckout({ cart });
  
  return <PreorderCheckout cart={cart} />;
}
```

### Collection page example

## Documentation

### `PurpleDot`

A context provider that configures the library. Must be a parent of all other
components.

```jsx
import { PurpleDot } from '@purple-dot/purple-dot-react';

<PurpleDot
  /* Your public API key, available in Purple Dot */
  apiKey="87d9920c-c9d4-4a17-9b77-cfd71a2d4f1a"
/>
```

### `usePurpleDot`

A hook that returns pre-order availability data for a product and an optional
selected variant.

```jsx
import { usePurpleDot } from '@purple-dot/purple-dot-react';

const {
  /* True if the async requests finished and data is available */
  isFulfilled,
  /* True if there was an error loading the data */
  isError,
  /* True if the async requests are in progress and data is not yet loaded */
  isPending,
  data: {
    product: {
      id,
      /* (IN_STOCK|PRE_ORDER|SOLD_OUT) whether the product is available in-stock,
          on pre-order or fully sold out */
      availability,
    },
    /* selectedVariant is only set if a variant is selected */
    selectedVariant: {
      id,
      /* (IN_STOCK|PRE_ORDER|SOLD_OUT) whether the variant is available in-stock,
         on pre-order or fully sold out */
      availability,
    }
  }
} = usePurpleDot({
  /* Product ID https://shopify.dev/docs/themes/liquid/reference/objects/product#product-id */
  productId,
  /* (Optional) The currently selected variant ID */
  selectedVariantId,
  /* A function that takes a productId and returns a promise with the in-stock
     inventory quantities for the product. The returned data should follow this structure:
     
     {
       id: 1, // The product ID
       inventory_quantity: 100 // The total in-stock inventory for the product
       variants: [{
           id: 1, // The variant ID
           inventory_quantity: 50, // The total in-stock inventory for the variant
       }, {
           id: 2,
           inventory_quantity: 50,
       }]
     }
     
     IMPORTANT: Function must be memoized to prevent infinite render loops,
     see https://docs.react-async.com/api/options#promisefn. */
  fetchAvailability,
});
```

### `PreorderButton`

A component that renders a pre-order call to action with an expected ship dates label.

```jsx
import { PreorderButton, usePurpleDot } from '@purple-dot/purple-dot-react';

const availability = usePurpleDot({ productId, selectedVariantId, fetchAvailability });

<ButtonElement
  /* Handle the pre-order button being clicked by adding a variant with
     the given ID and properties to the cart. */
  onClick={({ id, properties }) => { /* Add to cart */ }}
  /* The availability object returned by the usePurpleDot() hook */
  availability={availability}
  /* A function that renderes a styled <button> element with the passed in props */
  renderButton={(props) => <Button {...props} />}
/>
```

### `PreorderSelfService`

A component for dispaying the self-serivce pre-order management portal.

```jsx
import { PreorderSelfService } from '@purple-dot/purple-dot-react';

<PreorderSelfService
  onPreorderCancelled={() => {}}
  onArrangeReturnClicked={() => {}}
/>
```

### Minimum Requirements

The minimum supported version of React is v16.8.
