import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './Game.js';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  );
}