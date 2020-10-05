import { PurpleDot, PriceElement, ButtonElement, MessagingElement } from '@purple-dot/purple-dot-react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

const App = () => (
  <PurpleDot apiKey="test-api-key">
    <PriceElement sku="test-sku" />
    <ButtonElement sku="test-sku" />
    <MessagingElement sku="test-sku" />
  </PurpleDot>
);

ReactDOM.render(<App />, document.getElementById('app'));
