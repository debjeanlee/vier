import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '../shared/helpers/store';
import rootReducer from './reducers/rootReducer';

ReactDOM.render(
  <Provider store={store(rootReducer)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
