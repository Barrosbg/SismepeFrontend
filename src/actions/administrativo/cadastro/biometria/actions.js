import { equals } from 'rambda';
import { toast } from 'react-toastify';
import api from '../../../../constants/api';
import api_biometria from '../../../../constants/apiLocalBio';

/**
 * Adiciona arquivo de foto codificado como base64
 * @param {string} base64 Base64 do arquivo de imagem
 * @returns 
 */
export const addFoto = (base64) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_FOTO', payload: base64 });
  }
}

/**
 * Reseta a foto da store
 * @returns 
 */
export const resetFoto = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_FOTO' });
  }
}

/**
 * Bloqueia o clique nos círculos dos dedos
 * @param {boolean} bool true ou false
 * @returns 
 */
export const blockClick = (bool) => {
  return (dispatch) => {
    dispatch({ type: 'BLOCK_CLICK', payload: bool });
  }
}

export const buscarPessoas = (matricula) => {
  return (dispatch) => {
    api.get(`/pessoa/${matricula}`).then((response) => {
      dispatch({ type: 'GET_FROM_MATRICULA', payload: response.data });
    });
  }
}

export const selecionaPessoa = (pessoa) => {
  return (dispatch) => {
    dispatch({ type: 'SELECIONA_PESSOA', payload: pessoa });
  }
}

export const resetPessoa = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_PESSOA' });
  }
}

export const adicionaMatricula = (matricula) => {
  return (dispatch) => {
    dispatch({ type: 'ADICIONA_MATRICULA', payload: matricula });
  }
}

export const changeFieldEndereco = (field, value) => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_FIELD_ENDERECO', payload: { field: field, value: value } });
  }
}

export const getInfo = (cdPessoa) => {
  return (dispatch) => {
    api.get(`/pessoa/${cdPessoa}`).then((response) => {
      const p = {
        nome: response.data.nome,
        cpf: response.data.cpf,
        sexo: response.data.sexo,
        dataNascimento: response.data.dataNascimento,
        posto: response.data.posto.nome,
        telefone: response.data.telefone,
        cadastroAtualizado: response.data.cadastroAtualizado,
      }

      dispatch({ type: 'GET_INFO', payload: p });
    });
  }
}

export const setTelefone = (telefone) => {
  return (dispatch) => {
    dispatch({type: 'MUDAR_TELEFONE', payload: telefone});
  }
}

/**
 * Salva impressões digitais no banco de dados
 * @param {Array} hashes hashes dos quatro dedos
 * @param {number} cdPessoa id da pessoa (CD_PESSOA) em que a digital deve ser salva
 * @returns {Promise} Promise da inserção no banco
 */
export const salvarBiometria = (hashes, cdPessoa) => {
  return new Promise((resolve, reject) => {
    const algumDedoPreenchido = hashes.some((dig) => dig.hash !== "");

    if (cdPessoa == "") {
      reject(new Error('Você deve selecionar uma pessoa'));
    } else if (!algumDedoPreenchido) {
      reject(new Error('Pelo menos uma impressão digital deve ser fornecida'));
    } else {
      api.post("/biometria/nova", { cdPessoa: cdPessoa, digitais: hashes })
        .then((response) => { resolve(response); })
        .catch((e) => { reject(e); });
    }
  }).then(() => toast.success('Digitais cadastradas')).catch((e) => toast.error(e.message));
}

export const isDigitalDirty = async (hashes, cdPessoa) => {
  const digitais = await api.post('/biometria/digitais', { cdPessoa: cdPessoa });

  const digs = digitais?.data.map((digital) => { return { index: digital.cdIdentificadorDedo, hash: digital.dsBiometriaHash } });

  if (!digitais || digitais.data.length === 0) {
    return false;
  }

  return !equals(hashes, digs);
}


export const validarDigital = async (pessoaId) => {
  let digitais = [];
  const digs = await api.post('/biometria/digitais', { cdPessoa: (pessoaId) });

  digs.data?.map((dig) => {
    digitais.push(dig.dsBiometriaHash);
  });

  return new Promise((resolve, reject) => {
    api_biometria.post('/digital/validar', { digitais_usr: digitais })
      .then(() => {
        resolve({ status: true, message: "Digital válida!" });
      })
      .catch((error) => { 
        if(error.response){
          resolve({ status: false, message: "Digital inválida!" }); 
        } else {
          resolve({ status: false, message: "Verifique se o aplicativo do leitor biométrico foi iniciado!" });
        }      
      
      });
  })
}

export const getPessoa = (cdPessoa) => {
	return new Promise((resolve, reject) => {
    api.get(`/pessoa/${cdPessoa}/dto`).then((response) => {
			resolve(response.data);
    });
	});
}

export const getBase64FromUrl = (url) => {
  return new Promise((resolve, reject) => {
    api.post('/minio/download-by-url', {url: url, bucket: "minio"}).then((response) => {
      resolve(response.data);
    });
  });
}
