import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store.js';
import  {fetchPico2Readings}  from './actions/pico-2-actions.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.getState = store.getState;
window.dispatch = store.dispatch;
window.getPicoData = () => store.dispatch(fetchPico2Readings());

root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
