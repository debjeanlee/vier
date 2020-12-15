import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/service.scss';

ReactDOM.render(
  <BrowserRouter basename="/service">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
