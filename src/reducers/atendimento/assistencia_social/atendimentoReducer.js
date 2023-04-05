const INITIAL_STATE = {
    data: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ATENDIMENTO_FETCHED':
        if(action.error){
          return { ...state, data: [] };
        } else {
          return { ...state, data: action.payload.data };
        }
      case 'ATENDIMENTO_CLEAR':
        return { ...state, data: [] };
      default:
        return state;
    }
  };
  