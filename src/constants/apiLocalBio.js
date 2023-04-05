import axios from 'axios'
import { toast } from 'react-toastify';
import consts from './index'

const api = axios.create({
    baseURL: consts.API_BIOMETRIA_LOCAL_URL,
    timeout: 30000
});

api.interceptors.response.use(
    response => {
        if(response.status === 401) {
            toast.error('Não autorizado!');
        }
        
        return response;
    }, error => {
        if(error.response){
            toast.error(error.response.data);
        } else {
            toast.error('Verifique se o aplicativo do leitor biométrico foi iniciado!');
        }

        throw error;
    }
);

export default api;