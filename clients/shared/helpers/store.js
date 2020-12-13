import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = (rootReducer) => createStore(rootReducer, applyMiddleware(thunk));

export default store;
