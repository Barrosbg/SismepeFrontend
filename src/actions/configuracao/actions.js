import api from '../../constants/api';

export const usuarioDetalhes = () => {
  const request = api.get("/usuario");
  return {
    type: 'USUARIO_FETCHED',
    payload: request,
  };
};

export const usuarioLogado = async () => {
  return new Promise(
    (resolve, reject) => {
      api.get("/usuario").then( response => {
        resolve(response.data);
      })
    }
  )  
};

export const dataServidor = async () => {
  return new Promise(
    (resolve, reject) => {
      api.get("/usuario/data-atual").then( response => {
        resolve(response.data);
      })
    }
  )  
};


export const alterarAcesso = async (usuario, tipo) => {
  return new Promise((resolve, reject) => {
    api.post(
        `/usuario/alterar-acesso?tipo=${tipo}`,
        usuario
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })
}
