import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'
import { id } from 'date-fns/esm/locale/id/index.js';

export const saveEquipamento = async (payload) => {
      return new Promise((resolve, reject) => {
        api.post(`/equipamento/save/equip`,payload).then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
      })
  };
export const saveLancamento = async (payload) => {
      return new Promise((resolve, reject) => {
        api.post(`/equipamento/save/lancamento`,payload).then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
      })
  };
 export const buscarEquipamento = async (id) =>{
   
      return new Promise((resolve)=>{
        api.get(`/equipamento/filtro/NumeroSerie/${id}`).then(response=>{
            if(response.status === 200){
                resolve([response.data]);
            }else{
                resolve([]);
            }
        })
      })
 }
 export const buscarEquipamentoNumSerieAndLAncamento = async (id) =>{
   
      return new Promise((resolve)=>{
        api.get(`/equipamento/filtro/NumeroSerieComLancamentos/${id}`).then(response=>{
            if(response.status === 200){
                console.log(response)
                resolve([response.data]);
            }else{
                resolve([]);
            }
        })
      })
 }
 export const buscarSetor = async () =>{
   
      return new Promise((resolve)=>{
        api.get(`/equipamento/filtro/todososSetores`).then(response=>{
            if(response.status === 200){
                resolve(response.data);
                console.log(response)
            }else{
                resolve([]);
            }
        })
      })
 }
 export const buscarTodosEquipamentos = async () =>{
   
      return new Promise((resolve)=>{
        api.get(`/equipamento/todosEquipamentos`).then(response=>{
            if(response.status === 200){
                resolve(response);
                console.log(response)
            }else{
                resolve([]);
            }
        })
      })
 }


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
            console.log(response)
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
            console.log(response) 
          } else {
            resolve(null);
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

    export const saveCadastroTransfusional = async (payload) => {
      return new Promise((resolve, reject) => {
        api.post(`/transfusional-solicitacoes/save`,payload).then(response => {
          console.log(response.status)
          if (response.status === 201) {
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
