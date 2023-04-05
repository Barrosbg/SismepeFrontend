import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'

export const filtrarPaciente = async (value) => {
    if (value.length) {
      let matricula = "";
      let nome = "";

      if (isNaN(value)) {
        nome = value;
      } else {
        matricula = value;
      }
      return new Promise((resolve, reject) => {
        api.get(`/paciente/filtro?paciente=${nome}&matricula=${matricula}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular"));
            console.log(response.data.content)
          } else {
            resolve([]);
          }
        })
      })
    } else {
      return [];
    }
  };

 export const salvarExame = async (payload) =>{
     console.log(payload)
     return new Promise((resolve)=>{
         api.post(`/exameTransfusional`, payload).then(response=>{
            if (response.status === 201) {
                resolve(response);
              } else {
                resolve(null);
              }
         })
     })
 }
 export const atualizarExame = async (id,payload) =>{
     console.log(payload)
     return new Promise((resolve)=>{
         api.put(`/exameTransfusional/atualizar/${id}`, payload).then(response=>{
                resolve(response);
         })
     })
 }
 export const deletarExame = async (id) =>{
    
     return new Promise((resolve)=>{
         api.delete(`/exameTransfusional/exluir/${id}`).then(response=>{
          console.log(response)
           resolve(response)
         })
     })
 }

 export const buscarTodosExames = async (page) =>{
    
     return new Promise((resolve)=>{
         api.get(`/exameTransfusional?page=${page ? page : 0}`).then(response=>{
             console.log(response)
             if(response.status === 200){
                  resolve(response)
             }else{
                resolve(null)
             }
         })
     })
 }
 export const buscarExames = async (id) =>{
    
     return new Promise((resolve)=>{
         api.get(`/exameTransfusional/${id}`).then(response=>{
             console.log(response)
             if(response.status === 200){
                  resolve(response)
             }else{
                resolve(null)
             }
         })
     })
 }

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
            resolve(response.data.content.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular"));
            console.log(response.data)
          } else {
            resolve(null);
          }
        })
      })
    } else {
      return [];
    }
  };

  export const ListarPrestador = async (prestador) => {
    let nome = '';
    let numConselho = '';
    let esp = ''
    if (prestador && prestador.length) {
      if (isNaN(prestador)) {
        nome = prestador;
        return new Promise((resolve) => {
          api.get(`/prestador/filtro?nome=${nome}`).then(response => {
            if (response.status === 200) {
                console.log(response.data.content)
              resolve(response.data.content)
            } else {
              resolve([]);
            }
          })
        })
      } else {
        numConselho = prestador
        return new Promise((resolve) => {
          api.get(`/prestador/filtro?numeroConselho=${numConselho}`).then(response => {
            if (response.status === 200) {
                console.log(response.data.content)
              resolve(response.data.content)
            } else {
              resolve([]);
            }
          })
        })
      }


    } else {
      return [];
    }

  };

  export const toDateString = (date) => {
    return new Date(date + " GMT+00:00").toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

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
      if (response.status === 200) {
        window.open(downloadUrl);
        return response.status;
      } else {
        return -1;
      }
    })
  
  
  }
  

  export const imprimirExameAgenciaTransfusional = async (id) => {
    let url = `${consts.API_URL}/exameTransfusional/exibirExame/${id}/pdf`;
    return downloadFile(url, 'GET', 'pdf');
  
  }