import {
  PurpleDot,
  PreorderButton,
  PreorderCheckout,
  PreorderSelfService,
  usePurpleDot,
  usePurpleDotCheckout,
} from '@purple-dot/purple-dot-react';
import React, { useState, useEffect } from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

// API Key is for Demo sandbox store
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <PurpleDot apiKey="b351faa2-8693-4c09-b814-759beed90d0b">
      <Pages cartItems={cartItems} setCartItems={setCartItems} />
    </PurpleDot>
  );
};

const Pages = ({ cartItems, setCartItems }) => {
  function getPage() {
    if (window.location.hash === '#/product') {
      return 'PRODUCT';
    } if (window.location.hash === '#/pre-order-checkout') {
      return 'CHECKOUT';
    } if (window.location.hash === '#/manage-pre-orders') {
      return 'MANAGE_PRE_ORDERS';
    }
  }

  const [page, setPage] = useState();
  useEffect(() => {
    setInterval(() => {
      const newPage = getPage();
      if (newPage !== page) {
        setPage(newPage);
      }
    }, 50);
  }, []);

  if (page === 'PRODUCT') {
    return (<ProductPage cartItems={cartItems} setCartItems={setCartItems} />);
  } if (page === 'CHECKOUT') {
    return <CheckoutPage cartItems={cartItems} />;
  }
  return <SelfServicePage />;
};

const ProductPage = ({ cartItems, setCartItems }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const availability = usePurpleDot({
    productId: 6572435406980,
    selectedVariantId,
    fetchAvailability,
  });

  return (
    <div>
      <select
        id="variant-select"
        name="variant"
        onChange={(e) => {
          setSelectedVariantId(e.target.value);
        }}
      >
        <option />
        <option>39361930592388</option>
        <option>39361930657924</option>
      </select>
      <p>
        Availability data:
        {' '}
        {JSON.stringify(availability)}
      </p>
      <PreorderButton
        onClick={(item) => {
          setCartItems((prevCartItems) => [...prevCartItems, item]);
        }}
        availability={availability}
        renderButton={(props) => <button id="pre-order-btn" {...props} />}
      />
    </div>
  );
};

const CheckoutPage = ({ cartItems }) => {
  const cart = { items: cartItems };
  const { preorderCheckout } = usePurpleDotCheckout({ cart });

  return (
    <>
      {preorderCheckout && <PreorderCheckout cart={cart} />}
    </>
  );
};

const SelfServicePage = () => (
  <PreorderSelfService />
);

const fetchAvailability = async ({ productId }) => ({
  id: 6572435406980,
  inventory_quantity: 1,
  variants: [{
    id: 39361930592388,
    inventory_quantity: 1,
  }],
});

ReactDOM.render(<App />, document.getElementById('app'));
