import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './view/main/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js', { scope: './' }).then(reg => {
      console.log(reg);
    });
  });
}
