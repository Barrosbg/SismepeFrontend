import axios from "axios";
import api from "../../constants/api";
import consts from '../../constants/index'


////////////////////////////////////////////
// export const BuscarPessoa = async (value) => {
//     if (value.length) {
//       let matricula = "";
//       let nome = "";

//       if (isNaN(value)) {
//         nome = value;
//       } else {
//         matricula = value;
//       }
//       return new Promise((resolve, reject) => {
//         api.get(`/pessoa/filtro?nome=${nome}&matricula=${matricula}`).then(response => {
//           if (response.status === 200) {
//             resolve(response.data.content.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular"));
//             console.log(response.data)
//           } else {
//             resolve(null);
//           }
//         })
//       })
//     } else {
//       return [];
//     }
//   };
///////////////////////////////

export const buscarTodosOsVeiculos = () => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/veiculos`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response.data : []);
        })
      }
    )
  };
export const buscarVeiculosEstacionados= (payload) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/registros/TotalEstacionados`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response.data : []);
        })
      }
    )
  };
export const buscarVeiculosPelaPlaca = (placa) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/veiculos/${placa}`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response: []);
        })
      }
    )
  };
export const buscarVeiculoPorId = (id) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/veiculos/cadastro/${id}`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response: []);
        })
      }
    )
  };
export const atualizarVeiculos = (id,payload) => {
    return new Promise(
      (resolve, reject) => {
        api.put(`/veiculos/atualizar/${id}`,payload).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response: []);
        })
      }
    )
  };
export const inativarCadastro = (id) => {
    return new Promise(
      (resolve, reject) => {
        api.put(`/veiculos/inativar/${id}`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response: []);
        })
      }
    )
  };
  
export const BuscarCadastroPorPessoa = (nome) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/veiculos/filtro?nome=${nome}`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response.data: []);
        })
      }
    )
  };
  
export const buscarSetor = () => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/veiculos/listarSetor`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response: []);
        })
      }
    )
  };

export const buscarPorPlacaVeicolosComEntrada = (placa) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/registros/${placa}`).then(response => {
          resolve(response.status === 200 ? response: response);
        })
      }
    )
  };
export const adicionarTotalVeiculosEstacionados = (payload) => {
    return new Promise(
      (resolve, reject) => {
        api.post(`/totalVeiculosNoPatio`, payload).then(response => {
          resolve(response.status === 201 ? response: response.status);
        })
      }
    )
  };
export const BuscarTotalVeiculosEstacionados = (payload) => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/totalVeiculosNoPatio`).then(response => {
          resolve(response.status === 200 ? response.data: response.status);
        })
      }
    )
  };

  export const cadastrarVeiculo = (payload) => {
    return new Promise((resolve, reject) => {
      api.post('/veiculos', payload).then(response => {
        resolve(response.status === 201 ? response : null);
      })
    })
  }

  export const registrarEntradaDeveiculo = (payload) => {
    return new Promise((resolve, reject) => {
      api.post('/registros', payload).then(response => {
        resolve(response.status === 201 ? response : null);
      })
    })
  }
  export const registrarSaidaDeveiculo = (id,payload) => {
    return new Promise((resolve, reject) => {
      api.put(`/registros/registrosaida/${id}`, payload).then(response => {
        resolve(response.status === 200 ? response : null);
      })
    })
  }

  export const buscarTodosRegistrosDeEntradaESaida = () => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/registros`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response : []);
        })
      }
    )
  };
  export const buscarTodosRegistrosDeEntrada = () => {
    return new Promise(
      (resolve, reject) => {
        api.get(`/registros/situacaoEntrada`).then(response => {
            console.log(response)
          resolve(response.status === 200 ? response : []);
        })
      }
    )
  };



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

export const imprimirIdentificacaoPorSetor = async (setor) => {
  let url = `${consts.API_URL}/veiculos/listaSetor/${setor}/pdf`;
  return downloadFile(url, 'GET', 'pdf');

}
export const  imprimirIdentificacaoPorNome = async (nome) => {
  let url = `${consts.API_URL}/veiculos/listaPorNome/${nome}/pdf`;
  return downloadFile(url, 'GET', 'pdf');

}