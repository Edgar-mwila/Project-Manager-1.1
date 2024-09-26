// src/index.tsx
import * as React from 'react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/index.ts'
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
`;

const root = createRoot(document.body);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);