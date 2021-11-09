import {
  PurpleDot, PriceElement, ButtonElement, CartButtonElement, PreorderStatus,
} from '@purple-dot/purple-dot-react';
import React, { useState } from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

// API Key is for Demo sandbox store
const App = () => {
  const [cartButtonVisible, setCartButtonVisible] = useState(true);

  return (
    <PurpleDot apiKey="b351faa2-8693-4c09-b814-759beed90d0b" enableCart>
      { window.location.href.includes('/pre-order-status') ? (
        <PreorderStatus email="test@email.com" />
      ) : (
        <>
          <div className="cart-button-container" style={{ display: cartButtonVisible ? 'block' : 'none' }}>
            <CartButtonElement
              onVisibilityChanged={({ showing }) => setCartButtonVisible(showing)}
            />
          </div>

          <PriceElement sku="test-sku" />
          <ButtonElement
            sku="test-sku"
            lineItemProperties={[{ name: 'Foo', value: 'Bar' }]}
          />
        </>
      )}
    </PurpleDot>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
