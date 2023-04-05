import api from '../../constants/api'
import consts from  '../../constants/index'
export const ListarLicenca = async (lista, pages, linesPerPage) => {
  let matricula = lista.matricula
  let corporacao = lista.corporacao
  let page = pages == undefined ? 0 : pages
  let linesPerPages = linesPerPage == undefined ? '' : linesPerPage
  if (matricula) {
    return new Promise((resolve) => {
      api.get(`/licenca/filtro?matricula=${matricula}&corporacarao=${corporacao}&page=${page}&linesPerPage=${linesPerPages}&direction=DESC`).then(response => {
        if (response.status === 200) {
          resolve(response.data);
          console.log(response.data)
        } else {
          resolve([]);
        }
      })
    })
  } else {
    return [];
  }
};

export const filtrargestor = async (pessoa, ome) => {
  let matricula = pessoa.matricula
  let corporacao = ome.id


  // let page = pages == undefined ? 0 : pages
  // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage
  if (matricula) {
    return new Promise((resolve) => {
      api.get(`/pessoa/titulares/filtro?matricula=${matricula}&ome=${corporacao}`).then(response => {
        if (response.status === 200) {
          resolve(response.data.content);
          console.log(response.data)
        } else {
          resolve([]);
        }
      })
    })
  } else {
    return [];
  }
};
export const ExibirGestores = async () => {

  // let page = pages == undefined ? 0 : pages
  // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage

  return new Promise((resolve) => {
    api.get(`/pessoa/titulares/filtro?perfil=18`).then(response => {
      if (response.status === 200) {
        resolve(response.data.content);

      } else {
        resolve([]);
      }
    })
  })

};



export const FichaJmsPdf = async (id) => {
  console.log(id)
  let url = `${consts.API_URL}/jms/ficha-inspecao/${id}/pdf`;
  return downloadFile(url, 'GET', 'pdf');
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
      if(response.status === 200){
        window.open(downloadUrl);
        console.log("Retorno 1")
        return response.status;
      }else{
        return -1;
      }
    })
    
 
}
  export const buscarFichaPorIdTitular = async (id) => {

    // let page = pages == undefined ? 0 : pages
    // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage
   console.log(id)
    return new Promise((resolve) => {
      api.get(`/jms/ficha-inspecao/titular/${id}`).then(response => {
        if (response.status === 200) {
          resolve(response.data);
          console.log(response)
        } else {
          resolve(null);
          console.log("Entrei else")
         
        }
      })
    })

  };
  export const buscarFichaPorId = async (id) => {

    // let page = pages == undefined ? 0 : pages
    // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage
   console.log(id)
    return new Promise((resolve) => {
      api.get(`/jms/ficha-inspecao/${id}`).then(response => {
        if (response.status === 200) {
          resolve(response.data);

        } else {
          resolve(null);
        }
      })
    })

  };
  export const buscarFichasJMS = async () => {

    // let page = pages == undefined ? 0 : pages
    // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage

    return new Promise((resolve) => {
      api.get(`/jms/ficha-inspecao`).then(response => {
        if (response.status === 200) {
          resolve(response);

        } else {
          resolve([]);
        }
      })
    })

  };
  export const SalvarFichaJms = async (ficha) => {

    // let page = pages == undefined ? 0 : pages
    // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage

    return new Promise((resolve) => {
      api.post(`/jms/ficha-inspecao`, ficha
      ).then(response => {
        if (response.status === 201) {
          resolve(response.status);

        } else {
          resolve(null);
        }
      })
    })

  };
  export const AtualizarFichaJms = async (id, ficha) => {
   console.log(id, ficha)
    // let page = pages == undefined ? 0 : pages
    // let linesPerPages = linesPerPage == undefined ? '' : linesPerPage

    return new Promise((resolve) => {
      api.put(`/jms/ficha-inspecao/${id}`, ficha
      ).then(response => {
        console.log(response.status)
        if (response.status === 204) {
          resolve(response.status);

        } else {
          resolve(null);
        }
      })
    })

  };




  export const AdicionarLicenca = async (pessoa) => {
    let usuarioId = pessoa.usuarioId

    console.log(usuarioId, pessoa)

    if (usuarioId) {
      return new Promise((resolve) => {
        api.put(`/usuario/${usuarioId}/adicionar-perfil`,
          { id: 18 }
        ).then(response => {
          if (response.status === 204) {
            resolve(true);
            console.log(true)
          } else {
            console.log(false)
            resolve(false);
          }
        })
      })
    } else {
      return [];
    }
  };

  export const RemoverLicenca = async (usuarioId) => {


    console.log(usuarioId)

    if (usuarioId) {
      return new Promise((resolve) => {
        api.put(`/usuario/${usuarioId}/remover-perfil`,
          { id: 18 }
        ).then(response => {
          if (response.status === 204) {
            resolve(true);
          } else {

            resolve(false);
          }
        })
      })
    } else {
      return [];
    }
  };


  export const AtualizarOme = async (ome, pessoa) => {
    let omeId = ome.id

    console.log(omeId)

    if (ome && pessoa) {
      return new Promise((resolve) => {
        api.put(`/pessoa/titular/atualizar-ome`, {
          pessoaId: pessoa.pessoaId,
          matricula: pessoa.matricula,
          digito: pessoa.digito,
          corporacao: pessoa.corporacao,
          omeId: omeId
        }



        ).then(response => {
          console.log(response)
          if (response.status === 204) {
            resolve(true);
            console.log(true)
          } else {
            console.log(false)
            resolve(false);
          }
        })
      })
    } else {
      return [];
    }
  };





  export const ListarPrestador = async (prestador) => {
    let nome = '';
    let numConselho = '';
    let esp = ''
    if (prestador && prestador.length) {
      if (isNaN(prestador)) {
        nome = prestador;
        return new Promise((resolve) => {
          api.get(`/prestador/filtro?nome=${nome}`).then(response => {
            if (response.status === 200) {
              
              resolve(response.data.content)
            } else {
              resolve([]);
            }
          })
        })
      } else {
        numConselho = prestador
        return new Promise((resolve) => {
          api.get(`/prestador/filtro?numeroConselho=${numConselho}`).then(response => {
            if (response.status === 200) {
              resolve(response.data.content)
            } else {
              resolve([]);
            }
          })
        })
      }


    } else {
      return [];
    }

  };

  export const ListarParecer = async (parecer) => {

    if (parecer) {
      console.log(parecer)
      return new Promise((resolve) => {
        api.get(`/parecer/filtro?parecer=${parecer}`).then(response => {
          if (response.status === 200) {
            resolve(response.data)

          } else {

            resolve([]);
          }
        })
      })

    } else {
      return [];
    }

  };
  export const ListarComorbidades = () => {

    return new Promise((resolve) => {
      api.get(`/comorbidades`).then(response => {
        if (response.status === 200) {
          resolve(response.data)

        } else {

          resolve([]);
        }
      })
    })
  };
  export const ListarUf = () => {

    return new Promise((resolve) => {
      api.get(`/uf`).then(response => {
        if (response.status === 200) {
          resolve(response.data)

        } else {

          resolve([]);
        }
      })
    })
  };

  export const ListarConselho = async (conselho) => {
    let sigla = ''
    let uf = ''
    let descricao = ''
    if (conselho && conselho.length) {
      if (conselho.length <= 2) {
        uf = conselho
      } else if (conselho.length >= 3 && conselho.length <= 8) {
        sigla = conselho
      } else {
        descricao = conselho
      }
      return new Promise((resolve) => {
        api.get(`/conselho/filtro?descricao=${descricao}&sigla=${sigla}&uf=${uf}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content)
            console.log(response.data.content)
          } else {
            console.log("response.data")
            resolve([]);
          }
        })
      })

    } else {
      return [];
    }

  };


  export const listarPorOme = () => {
    return new Promise((resolve) => {
      api.get(`/licenca/relatorio/militares-afastados-por-ome`).then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          resolve(null)
        }
      })
    })
  }

  export const listarPorDiasIniterruptos = () => {
    return new Promise((resolve) => {
      api.get(`/licenca/relatorio/dias-ininterruptos`).then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          resolve(null)
        }
      })
    })
  }
  export const listarPorCid = (opcao, pages, linesPerPage) => {
  
    console.log(opcao)
    return new Promise((resolve) => {
      api.get(`/licenca/relatorio/militares-afastados-por-cid?cid=${opcao.id}`).then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          resolve([])
        }
      })
    })
  }

  export const ListarCid = async (cid) => {
    if (cid && cid.length) {
      let id = '';
      let descricao = '';
      const regex = /[0-9]/;

      if (regex.test(cid)) {
        id = cid
      } else {
        descricao = cid
      }
      return new Promise((resolve) => {
        api.get(`/cid/filtro?id=${id}&descricao=${descricao}`).then(response => {
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


  export const filtrarPessoa = async (value) => {
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
            resolve(response.data.content.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular"));
            console.log(response.data.content)
          } else {
            resolve([]);
          }
        })
      })
    } else {
      return [];
    }
  };
  export const BuscarPessoa = async (value) => {
    if (value.length) {
      let matricula = "";
      let nome = "";

      if (isNaN(value)) {
        nome = value;
      } else {
        matricula = value;
      }
      return new Promise((resolve, reject) => {
        api.get(`/pessoa/filtro?nome=${nome}&matricula=${matricula}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular"));
            console.log(response.data.content)
          } else {
            resolve(null);
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
  export const filtrarGestoresTitulares = async (matricula, ome) => {
    if (matricula) {
      return new Promise((resolve, reject) => {
        api.get(`/pessoa/titulares/filtro?matricula=${matricula}`).then(response => {
          if (response.status === 200) {
            resolve(response.data.content);
            console.log(response.data.content)
          } else {
            resolve([]);
          }
        })
      })
    } else {
      return [];
    }
  };



  export const listaOme = async (ome) => {

    if (ome && ome.length) {
      return new Promise((resolve) => {
        api.get(`/ome/filtro?descricao=${ome}`).then(response => {
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

  export const listarRelatoriosPorOmePdf = async (parecer) => {
    let parecerInfo = parecer.parecer.id
    let url = `${consts.API_URL}/licenca/relatorio/licenca-ome/pdf?cdOme=${parecer.ome}&tipoParecer=${parecerInfo}&dataIni=${parecer.dataIni}&dataFim=${parecer.dataFim}&qtdDias=${parecer.qtdDias}`;
    return downloadFile(url, 'GET', 'pdf');
    // console.log(parecer)
    // if (parecer) {
    //   return new Promise((resolve) => {
    //     api.get(`/licenca/relatorio/licenca-ome/pdf?cdOme=${parecer.ome}&tipoParecer=${parecerInfo}&dataIni=${parecer.dataIni}&dataFim=${parecer.dataFim}&qtdDias=${parecer.qtdDias}`).then(response => {
    //        console.log(response)
    //       if (response.status === 200) {
    //         resolve(response)

    //       } else {
    //         resolve(null)
    //       }
    //     })
    //   })
    // } else {
    //   return []
    // }
  }

  export const listarRelatoriosPorDataPdf = async (listaporData) => {
    
    let url = `${consts.API_URL}/licenca/relatorio/licenca-data/pdf?cdOme=${listaporData.batalhao}&qtdDias=${listaporData.qtdDias}&dataIni=${listaporData.dataInicio}&matricula=${listaporData.matricula}`;
    return downloadFile(url, 'GET', 'pdf');
  }
  export const RelatoriosAfastadosPorDiasIniterruptosPdf = async () => {
    
    let url = `${consts.API_URL}/licenca/relatorio/dias-ininterruptos/pdf`;
    return downloadFile(url, 'GET', 'pdf');
  }
  export const RelatoriosAfastadosPorOmePdf = async () => {
    
    let url = `${consts.API_URL}/licenca/relatorio/militares-afastados-por-ome/pdf`;
    return downloadFile(url, 'GET', 'pdf');
  }
  export const RelatoriosAfastadosPorCidPdf = async (cid) => {
    console.log(cid)
    let url = `${consts.API_URL}/licenca/relatorio/militares-afastados-por-cid/pdf?${cid}`;
    return downloadFile(url, 'GET', 'pdf');
  }


  export const listarMilitaresAtendidosPorPrestador = async (lista) => {
    // let parecerInfo = parecer.parecer.id
    console.log(lista)
    let page = lista.page ? lista.page : ''
    let linesPerPage = lista.linesPerPage ? lista.linesPerPage : ''
    if (lista) {
      return new Promise((resolve) => {
        api.get(`/licenca/relatorio/militar-por-prestador?prestador=${lista.prestador}&dataIni=${lista.dataIni}&dataFim=${lista.dataFim}&conselho=${lista.conselho}&page=${page}&linesPerPage=${linesPerPage}`).then(response => {
          if (response.status === 200) {
            resolve(response.data)
            console.log(response.data)
          } else {
            resolve(null)
          }
        })
      })
    } else {
      return []
    }
  }

  export const listarRelatoriosPorData = async (listaporData) => {
    //  let parecerInfo = parecer.parecer.id
    // console.log(parecerInfo)
    let page = listaporData.page ? listaporData.page : ''
    let linesPerPage = listaporData.linesPerPage ? listaporData.linesPerPage : ''
    if (listaporData) {
      return new Promise((resolve) => {
        api.get(`/licenca/relatorio/licenca-data?cdOme=${listaporData.batalhao}&qtdDias=${listaporData.qtdDias}&dataIni=${listaporData.dataInicio}&matricula=${listaporData.matricula}&page=${page}&linesPerPage=${linesPerPage}`).then(response => {
          if (response.status === 200) {
            resolve(response.data)
            console.log(response.data)
          } else {
            resolve([])
          }
        })
      })
    } else {
      return []
    }
  }

  export const listarRelatoriosPorOme = async (parecer) => {
    console.log(parecer)
    let batalhao = parecer.batalhao === null ? '' : parecer.batalhao.id
    let parecerInfo = parecer.parecer == null ? '' : parecer.parecer.id
    let page = parecer.page ? parecer.page : ''
    let linesPerPage = parecer.linesPerPage ? parecer.linesPerPage : ''
    if (parecer) {
      return new Promise((resolve) => {
        api.get(`/licenca/relatorio/licenca-ome?cdOme=${batalhao}&tipoParecer=${parecerInfo}&dataIni=${parecer.dataIni}&dataFim=${parecer.dataFim}&qtdDias=${parecer.qtdDias}&page=${page}&linesPerPage=${linesPerPage}`).then(response => {
          if (response.status === 200) {
            resolve(response.data)
             console.log(response.data)

          } else {
            resolve([])
          }
        })
      })
    } else {
      return []
    }
  }


  export const listarRelatorioDispensaPorPrestador = (data) => {
    console.log(data)
    let url = `${consts.API_URL}/licenca/relatorio/militar-por-prestador/pdf?prestador=${data.prestador}&conselho=${data.conselho}&dataIni=${data.dataIni}&dataFim=${data.dataFim}`;
    return downloadFile(url, 'GET', 'pdf');
    // if (data) {
    //   return new Promise((resolve, reject) => {
    //     api.get(`/licenca/relatorio/militar-por-prestador/pds?prestador=${data.prestador.nome}&conselho=${data.prestador.conselho}&dataIni=${dataIni}&dataFim=${dataFim}`).then(response => {
    //       if (response.status == 200) {
    //         resolve(response.data)
    //       } else {
    //         resolve(null)
    //       }
    //     })
    //   })
    // } else {
    //   return []
    // }
  }

  // export const listarRelatorioPorCid = (cid) =>{

  //   if(cid){
  //     return new Promise((resolve,reject) =>{
  //        api.get(`/licenca/relatorio/militares-afastados-por-cid?cid=${cid.cid}`).then(response =>{
  //          if(response.status == 200){
  //            resolve(response.data)
  //          }else{
  //            resolve(null)
  //          }
  //        })
  //     })
  //   }else{
  //     return []
  //   }
  // }
  export const cadastrarLicenca = (dataInicio, qtdDias, pessoa, prestador, parecer, usuarioCadastro, ome, cids) => {

    return new Promise(
      (resolve, reject) => {
        api.post('/licenca', {
          dataInicio: dataInicio,
          qtdDias: qtdDias,
          pessoa: { id: pessoa },
          prestador: { id: prestador },
          parecer: { id: parecer },
          omeCadastro: { id: ome },
          usuarioCadastro: { id: usuarioCadastro },
          cids: cids

        }).then(response => {
          if (response.status === 201) {
            resolve(response);
            console.log(response)
          } else {
            console.log(response)
            resolve([]);
          }
        })
      }
    )

  };
  export const AtualizarLicenca = (licencaId, dtInicio, qtdDias, prestador, parecer, usuarioCadastro, cid) => {

    return new Promise(
      (resolve, reject) => {
        api.patch(`/licenca/${licencaId}`, {
          "qtdDias": qtdDias,
          "dataInicio": dtInicio,
          "prestador": { "id": prestador },
          "parecer": { "id": parecer },
          "usuarioCadastro": { "id": usuarioCadastro },
          "cids": [{ "id": cid }]

        }).then(response => {
          if (response.status === 200) {
            resolve(response);

          } else {

            resolve([]);
          }
        })
      }
    )
  };

