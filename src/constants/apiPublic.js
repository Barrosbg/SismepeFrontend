import axios from 'axios'
import consts from './index'
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: consts.API_URL
})

api.defaults.timeout = 30000;

api.interceptors.response.use(
    response => {       
        
        return response;
    }, error => {       
        if(error.response){
            if(error.response.status >= 500){
                toast.error('Ocorreu um problema durante a solicitação!');
            }

            if(error.response.status >= 400 && error.response.status < 500){
                if(error.response.status === 404){
                    toast.error('O sistema está tentanto acessar um recurso que está fora do ar ou não existe!');
                } else if(error.response.status === 403){
                    toast.error('Você não tem permissão para acessar esse recurso!');
                } else {
                    if(error.response.data && error.response.data.errors){
                        error.response.data.errors.map((e) => {
                            toast.error(e.message)
                        })
                    } else if(error.response.data && error.response.data.length){
                        error.response.data.map((e) => {
                            toast.error(e.message)
                        })
                    } else {
                        toast.error(error.response.data.message);
                    }
                }
            }
        } else {
            toast.error('Problema ao tentar acessar o serviço!');
        }

        throw error;

    }
);

export default api;