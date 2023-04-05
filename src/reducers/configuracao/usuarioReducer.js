
const INITIAL_STATE = {
    id: null,
    pessoa: null,
    login: "",
    ativo: "",
    perfis: [],
    nivelAcesso: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USUARIO_FETCHED':
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};
