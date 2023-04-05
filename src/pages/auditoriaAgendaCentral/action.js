import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'



export const buscarTodasAsEscalas = async (page = 0) =>{
    return new Promise(
        (resolve,response)=>{
            api.get(`/auditoriaAgendaCentral/escalaCentralAmb?page=${page}`).then(response=>{
                if(response.status === 200){
                    resolve(response.data)
                }else {
                    resolve([]);
                }
            })
        }
    )
}

export const buscarUsuario = async (id) =>{
    return new Promise(
        (resolve)=>{
            api.get(`/usuario/Buscar-por-id/${id}`).then(response =>{
                if(response.status === 200){
                    resolve(response.data)
                }else {
                    resolve([]);
                }
            })
        }
    )
}

export const buscarEscalasPorId = async (id) =>{
    return new Promise(
        (resolve,response)=>{
            api.get(`/auditoriaAgendaCentral/escalaCentralAmb/${id}`).then(response=>{
                if(response.status === 200){
                    resolve(response.data)
                }else {
                    resolve([]);
                }
            })
        }
    )
}

export const buscarAgendaModificada= async (id) =>{
    return new Promise(
        (resolve,response)=>{
            api.get(`/auditoriaAgendaCentral/agendaModificada/${id}`).then(response=>{
                if(response.status === 200){
                    resolve(response.data)
                }else {
                    resolve([]);
                }
            })
        }
    )
}

export const buscarAgendasPorPrestador= async (id) =>{
    return new Promise(
        (resolve,response)=>{
            api.get(`/auditoriaAgendaCentral/prestador?prestadorId=${id}`).then(response=>{
                console.log(response.status)
                if(response.status === 200){
                    resolve(response)
                }else {
                    resolve([]);
                }
            })
        }
    )
}
export const buscarPrestador= async (id) =>{
    return new Promise(
        (resolve,response)=>{
            api.get(`/auditoriaAgendaCentral/prestador/${id}`).then(response=>{
                if(response.status === 200){
                    resolve(response.data)
                }else {
                    resolve([]);
                }
            })
        }
    )
}