const initialState = {
  mode: 'home',
  category: '',
};

const pageModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_ITEMS':
      return { ...action.payload };
    case 'ORDERS':
      return { ...state, mode: 'orders' };
    default:
      return state;
  }
};

export default pageModeReducer;
