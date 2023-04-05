import consts from '../../constants/index'
const INITIAL_STATE = {
    open: false,
    text: 'Carregando...'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BACKDROP_FETCHED':
      return { ...state, open: action.payload };
    default:
      return state;
  }
};
