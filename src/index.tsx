import * as React from 'react';
import { render } from 'react-dom';
import GameOfLife from './game';

render(
  <GameOfLife size={10} />,
  document.getElementById('root'),
);
