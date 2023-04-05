import axios from "axios";
import api from "../../constants/api";

const mapTipoExame = {
  "E": "Eletivo",
  "U": "Urgente"
}

export const filtrarPrestador = (value) => {
  const reNum = /[0-9]+/;

  const filtro = reNum.test(value) ? '?numeroConselho=' + value : '?nome=' + value;

  if (value.length) {
    return new Promise(
      (resolve, reject) => {
        api.get(`/prestador/filtro${filtro}`).then(response => {
          resolve(response.status === 200 ? response.data.content : []);
        })
      }
    )
  }
};

export const filtrarCid = (value) => {
  const reId = /[a-zA-Z]\d+/;

  const filtro = reId.test(value) ? "?id=" + value : "?descricao=" + value;

  return new Promise(
    (resolve, reject) => {
      api.get(`/cid/filtro${filtro}`).then(response => {
        resolve(response.status === 200 ? response.data.content : []);
      })
    }
  )
};

export const getSolicitacoesPendentes = (page = 0, prestador = '', paciente = '', dataCadastro = '') => {
  const requestString = `/solicitacao-procedimento-externo?prestador=${prestador}&paciente=${paciente}${dataCadastro ? '&dataCadastro=' + dataCadastro : ''}&page=${page}&linesPerPage=10&orderBy=dataCadastro&direction=DESC`;
  return new Promise(
    (resolve, reject) => {
      api.get(requestString).then(response => {
        resolve(response.status === 200 ? response.data : []);
      })
    }
  )
};

export const getAutorizacaoFromSolicitacao = (idAutorizacao) => {
  const requestString = `/aut-procedimento-externo/solicitacao/${idAutorizacao}`;
  return new Promise(
    (resolve, reject) => {
      api.get(requestString).then(response => {
        resolve(response.status === 200 ? response.data : []);
      })
    }
  )
};

export const revalidaAutorizacao = (idAutorizacao, novaData) => {
  const requestString = `/aut-procedimento-externo/${idAutorizacao}/revalidar`;

  const dataFormatada = novaData.toISOString().slice(0,19).replace('T',' ');

  const payload = {
    dataValidade: dataFormatada,
  }

  return new Promise(
    (resolve, reject) => {
      api.post(requestString, payload).then(response => {
        resolve(response.status === 201 ? response.data : []);
      })
    }
  )
};

export const filtrarEmpresa = async (value) => {
  if (value.length) {
    const reNumero = /\d+/;

    const filtro = reNumero.test(value) ? "?cnpj=" + value : "?nome=" + value;

    return new Promise((resolve, reject) => {
      api.get(`/empresa${filtro}`).then(response => {
        resolve(response.status === 200 ? response.data.content : []);
      })
    })
  } else {
    return [];
  }
};

export const cadastrarAutorizacao = (autorizacao) => {
  return new Promise((resolve, reject) => {
    api.post(`/aut-procedimento-externo`, autorizacao).then(response => {
      resolve(response.status === 201 ? response.data : null);
    })
  })
}

export const cadastrarProcedimentosEAutorizacoes = (payload) => {
  return new Promise((resolve, reject) => {
    api.post('/solicitacao-procedimento-externo/autorizacao', payload).then(response => {
      resolve(response.status === 201 ? response : null);
    })
  })
}

export const getProcedimentosEmpresas = (idSolicitacao) => {
  return new Promise((resolve, reject) => {
    api.get('/aut-procedimento-externo/solicitacao/' + idSolicitacao).then(response => {
      resolve(response.status === 200 ? response.data : []);

    })
  })
}

export const updateProcedimentosEmpresas = (idAutorizacao, novaAutorizacao) => {
  return new Promise((resolve, reject) => {
    api.put('/aut-procedimento-externo/' + idAutorizacao, novaAutorizacao).then(response => {
      resolve(response.status === 204 ? true : false);
    })
  })
}

export async function downloadFile(url, method, extension) {
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
  }).catch(error => {
    return -1;
  })
}

export const toDateString = (date) => {
  return new Date(date + " GMT+00:00").toLocaleString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export const toYYYYMMDD = (date) => {
  return date ? new Date(date).toISOString().slice(0, 10) : '';
}

export const exameRepr = (abrev) => {
  const exame = mapTipoExame[abrev];

  return exame ? exame : abrev;
}

export const listaProcedimentos = async (value) => {
  if (value?.length) {
    const reNum = /[0-9]+/;
    const filtro = reNum.test(value) ? '?especificacao=' + value : '?descricao=' + value;
    return new Promise((resolve) => {
      api.get(`/procedimento-sismepe${filtro}`).then(response => {
        if (response.status === 200) {
          resolve(response.data.content)
        } else {
          resolve([])
        }
      })
    })
  } else {
    return [];
  }
}