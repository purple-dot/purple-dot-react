# Purple Dot React Library 

The Purple Dot React Library allows merchants to integrate Purple Dot into a React project.

For more info on Purple Dot visit <https://www.getpurpledot.com>.

## Installation
---

```bash
npm install @purple-dot/purple-dot-react@2.0.0
```

## Minimum Requirements
---

React v16.8 or higher.

## Features
---

This library works with your React components to provide the following:  

- Displaying a Pre-order button if there is only pre-order stock left for the variant

- Showing a Purple Dot checkout iframe if the shoppers cart contains a pre-order item

- Adding a Manage Pre-orders iframe to a specified page

- Showing or hiding elements if a product is on pre-order

The current 2.0.0-beta.1 version supports Purple Dot's Combined Bag product only, where shoppers can check out with in-stock and pre-order line items using the same cart. Support for our Express checkout and Multi Bag checkout is coming soon.

## Getting started
---

### Product configuration
In order to make some variant(s) of a product available to pre-order:

1. In Shopify, for each relevant variant set the in stock availability level to 0.
2. In the Purple Dot Portal, create a Waitlist for that product. This is where you will define how many units will become available to pre-order and when you expect to fulfill the collected pre-orders. Press `Get Help` > `Managing Your Waitlists` > `How do I set up a Waitlist?` if you need help with this step.

Please note: when a new Waitlist is created, the Purple Dot backend will automatically tick the `Continue selling when out of stock` option for each product variant with some pre-order stock on said Waitlist. This is required for Purple Dot to correctly integrate into your Online Store. However this will make those variant(s) available to buy across all your sales channels so consider if you need to temporarily remove any other sales channels.

### Adding the context provider
To get started with the integration you will need your Purple Dot Api Key. This can be found in the Purple Dot Portal at the bottom of the Integration page. If you do not have access to the portal, please contact us at <support@getpurpledot.com> to get set up.

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

The code below shows the changes necessary to your Product Detail Page to start showing the Pre-order button. 

There are 3 integration points you will need to provide:

1. A `fetchAvailability` function: This function will need to return the in stock availability levels of the product and its variants.

- NOTE - 
     The function must be memoized to prevent infinite render loops,
     see https://docs.react-async.com/api/options#promisefn.

2. A `renderButton` function: This function renders 
either the Add to Cart Button or the Preorder Button depending on the in stock availability of the selected product variant

3. An `onClick` function: When the Add to Cart / Pre-order is clicked this function will receive the id of the added variant as well as the line item properties necessary to add.

- NOTE: These line item properties **must** be added to the cart in order for the checkout to recognize that the item is on pre-order.


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


### Showing the Purple Dot Checkout Iframe to the Cart Page

Add the following code to your cart page and pass the current state of the cart 
to `usePurpleDotCheckout`. If pre-order items are detected in the cart then Purple Dot's checkout iframe will be displayed over the contents of the cart page. 


```jsx
import { usePurpleDotCheckout } from '@purple-dot/purple-dot-react';

const CartPage = ({ cart }) => {
  const { PreorderCheckout } = usePurpleDotCheckout({ cart });
  
  return <PreorderCheckout cart={cart} />;
}
```

### Adding a Manage Pre-orders Iframe

Add the following code to a new page that shoppers will use to manage their pre-orders. We recommend the `/manage-pre-orders` path.

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
  /* Product ID https://shopify.dev/api/liquid/objects#product-id */
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

A component for displaying the self-service pre-order management portal.

```jsx
import { PreorderSelfService } from '@purple-dot/purple-dot-react';

<PreorderSelfService
  onPreorderCancelled={() => {}}
  onArrangeReturnClicked={() => {}}
/>
```
