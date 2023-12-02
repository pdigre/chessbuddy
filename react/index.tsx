import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './src/App';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
