import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './app';

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js', { scope: './' }).then(reg => {
      console.log(reg);
    });
  });
}
