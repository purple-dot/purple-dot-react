import PurpleDot, { PurpleDotContext, usePurpleDot } from './components/PurpleDotContext';
import makeComponent from './components/makeElement';

const PriceElement = makeComponent('price');
const ButtonElement = makeComponent('button');

export {
  PurpleDot,
  PurpleDotContext,
  usePurpleDot,
  PriceElement,
  ButtonElement,
};
