import { combineReducers } from 'redux';
import pageModeReducer from './pageModeReducer';
import cartModeReducer from './cartModeReducer';

const rootReducer = combineReducers({
  pageMode: pageModeReducer,
});

export default rootReducer;
