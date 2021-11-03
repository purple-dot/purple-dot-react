import {
  PurpleDot, PriceElement, ButtonElement, PreorderStatus,
} from '@purple-dot/purple-dot-react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

// API Key is for Demo sandbox store
const App = () => (
  <PurpleDot apiKey="b351faa2-8693-4c09-b814-759beed90d0b">
    { window.location.href.includes('/pre-order-status') ? (
      <PreorderStatus email="test@email.com" />
    ) : (
      <>
        <PriceElement sku="test-sku" />
        <ButtonElement
          sku="test-sku"
          lineItemProperties={[{ name: 'Foo', value: 'Bar' }]}
        />
      </>
    )}
  </PurpleDot>
);

ReactDOM.render(<App />, document.getElementById('app'));
