import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'
import { id } from 'date-fns/esm/locale/id/index.js';


 ///////////////////////////////////////////////////////////////////////////////////////////

 export const BuscarPessoa = async (value) => {
    if (value.length) {
      let matricula = "";
      let nome = "";

      if (isNaN(value)) {
        nome = value;
      } else {
        matricula = value;
      }
      return new Promise((resolve, reject) => {
        api.get(`/pessoa/filtro?nome=${nome}&matricula=${matricula}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content);
            // console.log(response)
          } else {
            resolve(null);
          }
        })
      })
    } else {
      return [];
    }
  };

  export const BuscarPrestador = async (nome) => {
      return new Promise((resolve) => {
        api.get(`prestador/filtro?nome=${nome}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content);
            // console.log(response) 
          } else {
            resolve(null);
          }
        })
      })
    };

     export const BuscarPrestadorPorId = async (id) => {
      return new Promise((resolve) => {
        api.get(`/prestador/${id}`).then(response => {
          if (response.status === 200) {
            resolve(response.data);
            // console.log("response "+response) 
          } else {
            resolve([]);
          }
        })
      })
    };
 
   export const BuscarPessoaPorId = async (id) => {
      return new Promise((resolve) => {
        api.get(`/pessoa/${id}`).then(response => {
          if (response.status === 200) {
            resolve(response.data);
            // console.log(response) 
          } else {
            resolve([]);
          }
        })
      })
    };

   export const BuscarNovaFichaPdf = async (id) => {
      let url = `${consts.API_URL}/transfusional-solicitacoes/fichatransfusional/${id}/pdf`;
      console.log(url)
      return downloadFile(url, 'GET', 'pdf');
    };

  // import axios from 'axios';

  function downloadFile(url, method, extension) {
  const token = JSON.parse(localStorage.getItem('_sismepe_user')).token;
   return axios.request({
      url,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      responseType: 'blob'
    }).then(response => {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      if(response.status === 200){
        window.open(downloadUrl);
        // console.log("Retorno 1")
        return response.status;
      }else{
        return -1;
      }
    })
  }

  export const BuscarFichaPdf = async (id) => {
      let url = `${consts.API_URL}/transfusional-solicitacoes/fichatransfusional/${id}/pdf`;
      console.log(url)
      return downloadFile(url, 'GET', 'pdf');
    };

    export const BuscarMinhaFichaPdf = async (id) => {
      let url = `${consts.API_URL}/jms/ficha-inspecao/${id}/pdf`;
      console.log(url)
      return downloadFile(url, 'GET', 'pdf');
    };


    export const BuscarSolicitacoesPorId = async (id) => {
      return new Promise((resolve) => {
        api.get(`/transfusional-solicitacoes/${id}`).then(response => {
          if (response.status === 200) {
            resolve(response.data);
            // console.log("Solicitações "+response) 
          } else {
            resolve([]);
          }
        })
      })
    };

    export const saveCadastroTransfusional = async (payload) => {
      return new Promise((resolve, reject) => {
        api.post(`/transfusional-solicitacoes/save`,payload).then(response => {
          // console.log(response.status)
          if (response.status === 201) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
      })
    };

    export const atualizarCadastroTransfusional = async (id, payload) => {
      return new Promise((resolve, reject) => {
        api.put(`/transfusional-solicitacoes/${id}`,payload).then(response => {
          // console.log(response.status)
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
      })
    };

  export const buscarTodasSolicitacoes = async (numPage, numTotal) => {
      return new Promise((resolve) => {
        api.get(`/transfusional-solicitacoes/page/${numPage}/${numTotal}`).then(response => {
          if (response.status === 200) {
            resolve(response.data);
            
          } else {
            resolve(null);
          }
        })
      })
    };

     