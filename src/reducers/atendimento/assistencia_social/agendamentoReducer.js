const INITIAL_STATE = {
    data: [],
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 0,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'AGENDAMENTO_FETCHED':
        if(action.error){
          return { ...state, data: [] };
        } else {
          const { data } = action.payload;
          return { ...state, 
            data: data.content, 
            totalElements: data.totalElements, 
            totalPages: data.totalPages, 
            pageNumber: data.pageable.pageNumber,
            pageSize: data.pageable.pageSize
          };
        }
      case 'AGENDAMENTO_CLEAR':
        return { ...state, INITIAL_STATE };
      default:
        return state;
    }
  };
  