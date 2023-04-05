import axios from "axios";
import api from "../../constants/api";


export const filtrarFichaPorId = (id) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/solicitacao-exame-interno/${id}`).then(response => {
          resolve(response.status === 200 ? response : []);
        })
      }
    )
  };
  