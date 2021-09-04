import React from 'react';
import { render } from 'react-dom';
import './styles/index.scss';
import App from './App';
import { StoreProvider } from './context/store-provider';

render((
  <StoreProvider>
    <App />
  </StoreProvider>
), document.getElementById('root'));
