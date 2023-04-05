const INITIAL_STATE = {
    open: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MENU_FETCHED':
      return { ...state, open: action.payload };

    default:
      return state;
  }
};
