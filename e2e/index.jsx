import { PurpleDot, PriceElement } from '@purple-dot/purple-dot-react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

const App = () => (
  <PurpleDot apiKey="test-api-key">
    <PriceElement sku="test-sku" />
  </PurpleDot>
);

ReactDOM.render(<App />, document.getElementById('app'));
