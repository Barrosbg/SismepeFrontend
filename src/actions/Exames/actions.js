import api from '../../constants/api'
import consts from '../../constants/index'

export const BuscarPaciente = async (value) => {
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
          resolve(response.data.content);
        } else {
          resolve([]);
        }
      })
    })
  } else {
    return [];
  }
};

export const filtrarPessoaTitular = async (id) => {
  if (id) {
    return new Promise((resolve, reject) => {
      api.get(`/pessoa/${id}`).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(null);
        }
      })
    })
  } else {
    return [];
  }
};
export const ListaProcedimentos = async (props) => {
  let descricao = "";
  let especificacao = "";

  if (isNaN(props)) {
    descricao = props;
  } else {
    especificacao = props;
  }
  if (props && props.length) {
    return new Promise((resolve) => {
      api.get(`/procedimento-sismepe?descricao=${descricao}&especificacao=${especificacao}`).then(response => {
        console.log(response.status)
        if (response.status === 200) {
          resolve(response.data.content)
          console.log(response.data.content)
        } else {
          resolve([])
        }
      })
    })
  } else {
    return [];
  }
}

export const SalvarSolicitacao = (props) => {


  return new Promise((resolve) => {
    api.post(`/solicitacao-exame-interno`, props).then(response => {
      if (response.status === 201) {
        resolve(response)
      } else {
        resolve([])
      }
    })
  })

}

export const CarregarPacientesPorPrestador = async (id) => {

  return new Promise((resolve, reject) => {
    api.get(`/solicitacao-procedimento-externo/prestador?direction=DESC`).then(response => {
      if (response.status === 200) {
        resolve(response.data);

      } else {
        resolve([]);
      }
    })
  })

};

export const CarregarPacientesPorId = async (id) => {

  return new Promise((resolve, reject) => {
    api.get(`/solicitacao-exame-interno/prestador?paciente=${id}&direction=DESC`).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve([]);
      }
    })
  })

};
export const filtrarSolicitacoes = async (id, data, pages, linesPerPage) => {
  let page = pages == undefined ? '' : pages
  let linesPerPages = linesPerPage == undefined ? "" : linesPerPage
  return new Promise((resolve, reject) => {
    api.get(`/solicitacao-exame-interno/prestador?paciente=${id}&dataCadastro=${data}&page=${page}&linesPerPage=${linesPerPages}&direction=DESC`).then(response => {
      console.log(response)
      if (response.status === 200) {
        resolve(response.data)
      } else {
        resolve([]);
      }
    })
  })

};

import axios from 'axios';

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

export const imprimirSolicitacaoExames = async (id) => {
  let url = `${consts.API_URL}/solicitacao-exame-interno/${id}/pdf`;
  return downloadFile(url, 'GET', 'pdf');

}