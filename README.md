# Purple Dot React Library 

The Purple Dot React Library allows merchants to integrate Purple Dot into a React project.

For more info on Purple Dot visit [https://www.getpurpledot.com](https://www.getpurpledot.com)

## Installation
---

```bash
npm install @purple-dot/purple-dot-react
```

## Minimum Requirements
---

React v16.8 or higher.

## Features
---

The Purple Dot React Library currently only supports Purple Dot's Combined Checkout method. In this checkout method the Purple Dot backend will set the `enable oversell` option on products with a waitlist making them appear as available to buy. This library then works with your React components to provide the following:  

- Displaying a Pre-order button if there is only pre-order stock left for the variant 

- Showing a Purple Dot checkout iframe if the shoppers cart contains a pre-order item

- Adding a Manage Pre-orders iframe to a specified page

- Showing or hidding elements if a product is on pre-order 


## Getting started
---

To get started you'll need your integration's Api Key. This can be found in the Purple Dot Merchant Portal at the bottom of the Integration Page. If you do not have access to the merchant portal. Contact us to get set up.

Once you have your Api Key, you will need to wrap your App in the `PurpleDot` component. This must be at or very close to the top of your component tree to make sure that all relevant components are children. 

```jsx
import { PurpleDot } from '@purple-dot/purple-dot-react';

...

const App = () => (
  <PurpleDot apiKey="<API-KEY>">
    <ExampleRouter>
      ...
    </ExampleRouter>
  </PurpleDot>
)
```

### Displaying a Pre-order button on the product page

The code below shows the changes necessary to your Product Display Page to start showing the Pre-order button. 

There are 3 integration points you will need to provide:

1. A `fetchAvailability` function: This function will need to return the in stock availability of the product and its variants.

- NOTE - 
     The function must be memoized to prevent infinite render loops,
     see https://docs.react-async.com/api/options#promisefn.

2. A `renderButton` function: This function renders 
either the Add to Cart Button or the Preorder Button depending on the availability of the product

3. An `onClick` function: When the Add to Cart / Pre-order is clicked this function will receive the id of the added variant as well as the line item properties necessary to add.

- NOTE: These line item properties **must** be added to the cart in order for the checkout to recognise that the item is on pre-order.


```jsx
import React, { useEffect, useState } from 'react';
import { usePurpleDot, PreorderButton } from '@purple-dot/purple-dot-react';

const ProductPage = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const availability = usePurpleDot({
    productId: product.id,
    selectedVariantId,
    fetchAvailability,
  });

  return (
    <div class="product-page">
        <PreorderButton
          availability={availability}
          onClick={({ id, properties }) => addToCart({ id, properties })}
          renderButton={(props) => <button {...props} />}
        />
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


### Showing a Purple Dot Checkout Iframe to the Cart Page

Add the following code to your cart page and pass the current state of the cart 
to `usePurpleDotCheckout`. If pre-order items are detected in the cart. Purple Dot's combined checkout iframe will be displayed over the contents of the cart page. 


```jsx
import { usePurpleDotCheckout } from '@purple-dot/purple-dot-react';

const CartPage = ({ cart }) => {
  const { PreorderCheckout } = usePurpleDotCheckout({ cart });
  
  return <PreorderCheckout cart={cart} />;
}
```

### Adding a Manage Pre-orders Iframe

Add the following code to a new page which shoppers will use to manage their pre-orders. We recommend the `/manage-pre-orders` path.

```jsx
import { PreorderSelfService } from '@purple-dot/purple-dot-react';

<PreorderSelfService
  onPreorderCancelled={() => {}}
  onArrangeReturnClicked={() => {}}
/>
```


## Reference
---

### `PurpleDot`

A context provider that configures the library. Must be a parent of all other
components.

```jsx
import { PurpleDot } from '@purple-dot/purple-dot-react';

<PurpleDot
  /* Your public API key, available in Purple Dot */
  apiKey="<API-KEY>"
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