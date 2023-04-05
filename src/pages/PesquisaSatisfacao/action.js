import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'

export const buscaBeneficiarioCpf = (cpf) => {
  return new Promise(
    (resolve, reject) => {
      api.get(`/pessoa/filtro?cpf=${cpf}`).then(response => {
          console.log(response)
        resolve(response.status === 200 ? response: []);
      })
    }
  )
}

export const buscaPesquisaSatisfacaoAtendimento = (atendimento) => {
  return new Promise(
    (resolve, reject) => {
      api.get(`/pesquisaDeSatisfacao/codigo-atendimento/${atendimento}`).then(response => {
          console.log(response)
        resolve(response.status === 200 ? response: []);
      })
    }
  )
}
export const buscaPesquisaExpirada= (atendimento) => {
  return new Promise(
    (resolve, reject) => {
      api.get(`/pesquisaDeSatisfacao/pesquisaExpirada/${atendimento}`).then(response => {
          console.log(response)
        resolve(response.status === 200 ? response: []);
      })
    }
  )
}
export const buscaPesquisaRespondida = (atendimento) => {
  return new Promise(
    (resolve, reject) => {
      api.get(`/pesquisaDeSatisfacao/pesquisaRespondida/${atendimento}`).then(response => {
        resolve(response.status === 200 ? response: []);
      })
    }
  )
}


export const insertPesquisaSatisfacao = (payload) => {
  return new Promise((resolve, reject) => {
    api.post('/pesquisaDeSatisfacao', payload).then(response => {
      console.log(response)
      resolve(response.status === 201 ? response : null);
    })
  })
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