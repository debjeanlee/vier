import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/kitchen.scss';

ReactDOM.render(
  <BrowserRouter basename="/kitchen">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
