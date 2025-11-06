import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './assets/styles/globals.css';

/**
 * @entry main
 * @summary Application entry point that initializes React and renders the root App component
 * @type application-entry
 * @category core
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
