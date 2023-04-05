import api from '../../constants/api';
import apiPublic from '../../constants/apiPublic';
import axios from 'axios';
import consts from '../../constants/index';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

export function fetchBackdrop(type, payload) {
  return (dispatch) => {
    dispatch({ type: type, payload: payload });
  }
};

export const getGrupoMenusUsuario = () => {
  const request = api.get("/grupo-menu");
  return {
    type: 'GRUPO_MENU_FETCHED',
    payload: request,
  };
};


export function login(values) {
  return submit(values, `${consts.API_URL}/login`);
}
export function signup(values) {
  return submit(values, `${consts.API_URL}/signup`);
}

function submit(values, url) {
  return (dispatch) => {
    axios
      .post(url, values)
      .then((resp) => {
        let token = resp.headers.authorization;
        token = token.replace('Bearer ', '');
        let decoded = jwtDecode(token);
        decoded = { ...decoded, token: token };
        dispatch([{ type: 'USER_FETCHED', payload: decoded }]);
      })
      .catch((e) => {
        let status = e.response ? e.response.status : null;
        if (status === 403) {
          toast.error('Não autorizado!');
        } else {
          toast.error('Houve um problema na comunicação, contate o administrador do sistema!');
        }
      });
  };
}

export function logout() {
  return dispatch => {
    dispatch({ type: 'TOKEN_VALIDATED', payload: false })
    dispatch({ type: 'GRUPO_MENU_FETCHED', payload: false })
  }
}

export async function validateToken(token) {
  return (dispatch) => {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      new Promise((resolve, reject) => {
        axios
          .post(`${consts.API_URL}/auth/validateToken`, null, config)
          .then((resp) => {
            dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data });
          })
          .catch((e) => dispatch({ type: 'TOKEN_VALIDATED', payload: false }));
      });
    } else {
      dispatch({ type: 'TOKEN_VALIDATED', payload: false });
    }
  };
}

export async function forgotPassword(data) {
  let { email, cpf } = data;
  cpf = cpf && cpf.toString().replace(/\D/g, "");
  return new Promise((resolve, reject) => {
    apiPublic.post(`/usuario/recuperar-senha`, {
      email: email,
      cpf: cpf
    })
      .then((resp) => {
        if (resp.status === 204) {
          toast.success("Enviamos um link de redefinição de senha para o e-mail. Por favor, verifique sua caixa de mensagens!");
          resolve(true);
        } else {
          resolve(false);
        }

      })
      .catch((e) => resolve(false));
  });

}

export async function validateTokenResetPassword(token) {
  return new Promise((resolve, reject) => {
    apiPublic.get(`/usuario/validar-token/${token}`)
      .then((resp) => {
        resolve(resp.status === 200 ? true : false);
      })
      .catch(() => {
        resolve(false);
      });
  });

}

export async function resetPassword(data) {
  return new Promise((resolve, reject) => {
    apiPublic.post(`/usuario/resetar-senha`, data)
      .then((resp) => {
        if (resp.status === 204) {
          toast.success("Sua senha foi atualizada com sucesso!");
          resolve(true);
        } else {
          resolve(true);
        }

      })
      .catch((e) => resolve(false));;
  });

}


export function fetchMenu(type, payload) {
  return (dispatch) => {
    dispatch({ type: type, payload: payload });
  }
};

export function changeModal(title, body, width, labelConfirm, labelCancel) {
  return (dispatch) => {
    dispatch({ type: 'MODAL_FETCHED', payload: { title: title, body: body, width: width, labelConfirm: labelConfirm, labelCancel: labelCancel } });
  }
};

export function openModal() {
  return (dispatch) => {
    dispatch({ type: 'MODAL_OPEN', payload: true });
  }
};

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: 'MODAL_OPEN', payload: false });
  }
};

export function confirmModal() {
  return (dispatch) => {
    dispatch({ type: 'MODAL_CONFIRM', payload: true });
    dispatch({ type: 'MODAL_OPEN', payload: false });
  }
};

export function resetConfirmModal() {
  return (dispatch) => {
    dispatch({ type: 'MODAL_CONFIRM', payload: false });
  }
};


export const prestadorHistoricoAtendimentos = async (prestadorId, periodo) => {
  return new Promise((resolve, reject) => {
    api.get(`/it-agenda-central/estatisticas/atendimentos?prestador=${prestadorId}&periodo=${periodo}`).then(response => {
      resolve(response.status === 200 ? response.data : null);
    })
  })
};

export const pacienteHistoricoAtendimentos = async (pacienteId, periodo) => {
  return new Promise((resolve, reject) => {
    api.get(`/it-agenda-central/estatisticas/atendimentos?paciente=${pacienteId}&periodo=${periodo}`).then(response => {
      resolve(response.status === 200 ? response.data : null);
    })
  })
};
