import api from '../../../constants/api';
import { situacaoAtendimentoToEnum } from '../../../services/enums';

/*

ACTIONS DE PACIENTE

 */

export const filtrarPaciente = async (value) => {
  if(value.length){    
    let matricula = "";
    let nome = "";

    if(isNaN(value)){
      nome = value;
    } else {
      matricula = value;
    }
    return new Promise((resolve, reject) => {
      api.get(`/paciente/filtro?paciente=${nome}&matricula=${matricula}`).then(response => {

        if(response.status === 200){
          resolve(response.data.content);
          console.log(response.data.content)
        } else {
          resolve([]);
        }

        resolve(response.status === 200 ? response.data.content : []);

      })
    })
  } else {
      return [];
  }
};


export const pacienteById = async (id) => {
  
    return new Promise((resolve, reject) => {
      api.get(`/paciente/${id}`).then(response => {
        resolve(response.status === 200 ? response.data : null);
      })
    }) 
};

/*

ACTIONS DE PESSOA

 */

export const filtrarPessoa = async (value) => {
  if(value.length){    
    let filtro = `cpf=${value}`;  
    return new Promise((resolve, reject) => {
      api.get(`/pessoa/filtro?${filtro}`).then(response => {
        resolve(response.status === 200 ? response.data.content : []);
      })
    })
  } else {
      return [];
  }
};

export const filtrarPessoaMatriculaNome = async (value) => {
  if(value.length){    
    let matricula = "";
    let nome = "";

    if(isNaN(value)){
      nome = value;
    } else {
      matricula = value;
    }
    return new Promise((resolve, reject) => {
      api.get(`/pessoa/filtro?nome=${nome}&matricula=${matricula}`).then(response => {
        resolve(response.status === 200 ? response.data.content : []);
      })
    })
  } else {
      return [];
  }
};

export const cadastrarPessoa = async (pessoa) => {
    
  return new Promise((resolve, reject) => {
    api.post(`/pessoa`, pessoa).then(response => {
      resolve(response.status === 201 ? response.data : null);
    })
  })
};

export const pessoaById = async (id) => {
  return new Promise((resolve, reject) => {
    api.get(`/pessoa/${id}`).then(response => {
      resolve(response.status === 200 ? response.data : null);
    })
  }) 
};


/*

ACTIONS DE PRESTADOR

 */

export const filtrarPrestador = (value) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/prestador/filtro?nome=${value}&esp=125`).then( response => {          
          resolve(response.status === 200 ? response.data.content : []);
        })
      }
    )  
};



/*

ACTIONS DE AGENDA E AGENDAMENTO

 */


export const editarAgendamento = (agendamento) => {
  
  return new Promise(
    (resolve, reject) => {
      api.put(`/agendamento/${id}`, agendamento).then( response => {
        resolve(response.status === 200 ? response.data : null);
      })
    }
  )
  
};

export const atualizarAgendamento = (agendamento, paciente, situacao, situacaoAtendimento) => {
  
  return new Promise(
    (resolve, reject) => {
      api.put(`/it-agenda-central/${agendamento}`, {
        idPaciente: paciente,
        situacaoAgendamento: situacao,
        situacaoAtendimento: situacaoAtendimento
      }).then( response => {
          resolve(response);

      })
    }
  )
  
};


export const listarAgendamentos = async (data, agendamento, especialidade, prestador, paciente, situacao, situacaoAtend, page, linesPerPage, direction) => {

  if(agendamento){
    return new Promise((resolve, reject) => {
      api.get(
          `/it-agenda-central/${agendamento}`
      ).then((response => {
        if(response.status === 200 && response.data){
          resolve({
            content: [{
              atendimentoId: response.data.atendimento ? response.data.atendimento.id : null,
              dataAgendamento: response.data.agendaCentral.dataAgendamento.split(' ')[0],
              especialidade: response.data.agendaCentral.especialidade.descricao,
              horaInicial: response.data.agendaCentral.horaInicial.split(' ')[1],
              id: response.data.id,
              idPaciente: response.data.paciente.id,
              matriculaPaciente: response.data.paciente.pessoa.matricula,
              nomePaciente: response.data.paciente.pessoa.nome,
              nomePrestador: response.data.agendaCentral.prestador.nome,
              permiteEncaixe: response.data.agendaCentral.permiteEncaixe,
              situacaoAgendamento: response.data.situacao,
              situacaoAtendimento: response.data.atendimento ? response.data.atendimento.situacao : null,
            }],
            empty: false,
            totalElements: 1,
            totalPages: 1,
            pageable:{
              pageNumber: 0,
              pageSize: 1,
            },
          });
        } else {
          resolve({empty: true});
        }
      }));
    })
  } else {

    let params = `?data=${data}`;
    params += prestador ? `&prestador=${prestador.id}` : '';
    params += especialidade ? `&esp=${especialidade}` : '';
    params += paciente ? `&paciente=${paciente.id}` : '';
    params += page ? `&page=${page}` : '';
    params += situacao && situacao.length ? `&situacao=${situacao.join(',')}` : '';
    params += situacaoAtend && situacaoAtend.length ? `&situacaoAtend=${situacaoAtend.join(',')}` : '';
    params += linesPerPage ? `&linesPerPage=${linesPerPage}` : '&linesPerPage=20';
    params += direction ? `&direction=${direction}` : '';

    return new Promise((resolve, reject) => {
      api.get(
          `/it-agenda-central/filtro${params}`
      ).then((response => {
        if(response.status === 200){
          resolve(response.data);
        } else {
          resolve({empty: true});
        }
      }));
    })
  }

};


export const agendasLivres = async (especialidade, prestador, page, linesPerPage) => {

    let params = `?esp=${especialidade}`;
    params += prestador ? `&prestador=${prestador.id}` : '';
    params += page ? `&page=${page}` : '';
    params += linesPerPage ? `&linesPerPage=${linesPerPage}` : '&linesPerPage=20';

    return new Promise((resolve, reject) => {
      api.get(
          `/it-agenda-central/disp${params}`
      ).then((response => {
        resolve(response.status === 200 ? response.data : null);
      }));
    })

};


/*

ACTIONS DE ATENDIMENTO

 */


export const atendimentoById = async (id) => {
  return new Promise((resolve, reject) => {
    api.get(
        `/atendimento/${id}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);
    }));
  })
}

export const atualizarAtendimento = async (atendimento) => {
  return new Promise((resolve, reject) => {
    api.put(
        `/atendimento/${atendimento.id}`,
        atendimento
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })
}


export const listarAtendimentos = async (data, agendamento, prestador, paciente, situacao, page, linesPerPage, direction) => {
  if(agendamento){
    return new Promise((resolve, reject) => {
      api.get(
          `/it-agenda-central/${agendamento}`
      ).then((response => {
        if(response.status === 200 && response.data.atendimento){
          resolve({
            content: [{
              atendimentoId: response.data.atendimento ? response.data.atendimento.id : null,
              dataAgendamento: response.data.agendaCentral.dataAgendamento.split(' ')[0],
              especialidade: response.data.agendaCentral.especialidade.descricao,
              horaInicial: response.data.agendaCentral.horaInicial.split(' ')[1],
              id: response.data.id,
              idPaciente: response.data.paciente.id,
              matriculaPaciente: response.data.paciente.pessoa.matricula,
              nomePaciente: response.data.paciente.pessoa.nome,
              idPrestador: response.data.agendaCentral.prestador.id,
              nomePrestador: response.data.agendaCentral.prestador.nome,
              permiteEncaixe: response.data.agendaCentral.permiteEncaixe,
              situacaoAgendamento: response.data.situacao,
              situacaoAtendimento: response.data.atendimento ? situacaoAtendimentoToEnum(response.data.atendimento.situacao) : null,
            }],
            empty: false,
            totalElements: 1,
            totalPages: 1,
            pageable:{
              pageNumber: 0,
              pageSize: 1,
            },
          });
        } else {
          resolve({empty: true});
        }
      })).catch(error => {
        console.log(error);
      });
    })
  } else {

    let params = situacao && situacao.length ? `?situacaoAtend=${situacao.join(',')}` : '?situacaoAtend=1';
    params += `&data=${data}`;
    params += prestador && prestador.id ? `&prestador=${prestador.id}`: '';
    params += paciente ? `&paciente=${paciente.id}` : '';
    params += page ? `&page=${page}` : '';
    params += linesPerPage ? `&linesPerPage=${linesPerPage}` : '&linesPerPage=20';
    params += direction ? `&direction=${direction}` : '';

    return new Promise((resolve, reject) => {
      api.get(
          `/it-agenda-central/filtro${params}`
      ).then((response => {
        resolve(response.status === 200 ? response.data : null);
      }));
    })
  }

};


export const assistenciaSocialListarPorPaciente = async (pacienteId, page, linesPerPage) => {

  let params = `?id=${pacienteId}&direction=DESC`;
  params += page !== null ? `&page=${page}` : '';  
  params += linesPerPage ? `&linesPerPage=${linesPerPage}` : '';

  return new Promise((resolve, reject) => {
    api.get(
      `/assistencia-social/paciente${params}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);
    }));
  })

};

export const evolucoesAssistenciaSocial = async (assistenciaId) => {

  let params = `?id=${assistenciaId}`;

  return new Promise((resolve, reject) => {
    api.get(
        `/assistencia-social-evolucao/ass${params}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);
    }));
  })

};


export const referenciaFamiliarPaciente = async (pacienteId) => {

  let params = `?pac=${pacienteId}`;

  return new Promise((resolve, reject) => {
    api.get(
        `/referencia-familiar/paciente${params}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);
    }));
  })

};

export const habitacaoPaciente = async (pacienteId) => {

  let params = `?pac=${pacienteId}`;

  return new Promise((resolve, reject) => {
    api.get(
        `/habitacao/paciente${params}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);
    }));
  })

};

export const salvarHabitacaoPaciente = async (habitacao) => {

  return new Promise((resolve, reject) => {
    api.post(
        `/habitacao`,
        habitacao
    ).then((response => {
      resolve(response.status === 201 ? true : false);
    }));
  })

};

export const atualizarHabitacaoPaciente = async (habitacao) => {

  return new Promise((resolve, reject) => {
    api.put(
        `/habitacao/${habitacao.id}`,
        habitacao
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })

};

export const salvarReferenciaFamiliarPaciente = async (referenciaFamiliar) => {

  return new Promise((resolve, reject) => {
    api.post(
        `/referencia-familiar`,
        referenciaFamiliar
    ).then((response => {
      resolve(response.status === 201 ? true : false);
    }));
  })

};

export const atualizarReferenciaFamiliarPaciente = async (referenciaFamiliar) => {

  return new Promise((resolve, reject) => {
    api.put(
        `/referencia-familiar/${referenciaFamiliar.id}`,
        referenciaFamiliar
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })

};

export const salvarAssistenciaSocial = async (assistencia) => {

  return new Promise((resolve, reject) => {
    api.post(
        `/assistencia-social`,
        assistencia
    ).then((response => {
      resolve(response.status === 201 ? true : false);
    }));
  })

};


export const atualizarAssistenciaSocial = async (assistencia) => {

  return new Promise((resolve, reject) => {
    api.put(
        `/assistencia-social/${assistencia.id}`,
        assistencia
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })

};


export const salvarEvolucaoAssistenciaSocial = async (evolucao) => {

  return new Promise((resolve, reject) => {
    api.post(
        `/assistencia-social-evolucao`,
        evolucao
    ).then((response => {
      resolve(response.status === 201 ? true : false);
    }));
  })
};


export const atualizarEvolucaoAssistenciaSocial = async (evolucao) => {

  return new Promise((resolve, reject) => {
    api.put(
        `/assistencia-social-evolucao/${evolucao.id}`,
        evolucao
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })
};


export const listarEvolucaoPorAssistenciaSocial = async (assistenciaId, page, linesPerPage) => {

  let params = `?assId=${assistenciaId}`;
  params += page !== null ? `&page=${page}` : '';  
  params += linesPerPage ? `&linesPerPage=${linesPerPage}` : '';

  return new Promise((resolve, reject) => {
    api.get(
      `/assistencia-social-evolucao/ass${params}`        
    ).then((response => {
      resolve(response.status === 200 ? response.data : null);     
    }));
  })

};

export const listarResponsaveisPaciente = async (pacienteId) => {

  return new Promise((resolve, reject) => {
    api.get(
      `/paciente-responsavel/paciente?id=${pacienteId}`
    ).then((response => {
      resolve(response.status === 200 ? response.data : []);
    }));
  })

};

export const salvarResponsavelPaciente = async (responsavel) => {

  return new Promise((resolve, reject) => {
    api.post(
        `/paciente-responsavel`,
        responsavel
    ).then((response => {
      resolve(response.status === 201 ? true : false);
    }));
  })

};

export const atualizarResponsavelPaciente = async (responsavel) => {

  return new Promise((resolve, reject) => {
    api.put(
        `/paciente-responsavel/${responsavel.pacienteId}/${responsavel.responsavelId}`,
        responsavel
    ).then((response => {
      resolve(response.status === 204 ? true : false);
    }));
  })

};