import { filtrarPessoaMatriculaNome } from "../actions/atendimento/assistencia_social/actions";
import CustomChip from "../components/general/customChip";
import { checkPermission } from "./checkPermissions";
import { moneyWithMask, moneyWithDecimalDigits, dateBrToUs, timeIsGreaterOrEqual } from "./general";

export function formatarListaAtendimentos (lista, usuario, dataServidor, atender, cancelar) {
    let atendimentos = [];
    let permConsulta = checkPermission('/atendimento/assistencia-social/consulta');
    if(lista.data.length && dataServidor){
        let data = dataServidor.split(' ')[0];
        lista.data.map((item, index) => {
            let options = [];
            let situacao = "";
            
            if(permConsulta && usuario.prestador && usuario.prestador.id === item.idPrestador && item.situacaoAtendimento === 1){
                situacao = 'Aguardando';
                if(data >= dateBrToUs(item.dataAgendamento)){
                    options.push({title: 'atender', description: 'Realizar atendimento', color: 'BgGreen', action: () => atender(item)});
                }
            }

            else if(permConsulta && usuario.prestador && usuario.prestador.id === item.idPrestador && item.situacaoAtendimento === 2){
                situacao = 'Em atendimento';
                if(data >= dateBrToUs(item.dataAgendamento)){
                    options.push({title: 'retomar', description: 'Retomar atendimento', color: 'BgGreen', action: () => atender(item)});
                    options.push({title: 'cancelar', description: 'Cancelar atendimento', color: 'BgRed', action: () => cancelar(item, 1)});
                }
            }

            else if(permConsulta && usuario.prestador && usuario.prestador.id === item.idPrestador && (item.situacaoAtendimento === 3 || item.situacaoAtendimento === 4)){
                situacao = item.situacaoAtendimento === 3 ? 
                'Cancelado'
                : 
                'Finalizado';
                if(data >= dateBrToUs(item.dataAgendamento)){
                    options.push({title: 'ativar', description: 'Habilitar atendimento', color: 'BgGreen', action: () => cancelar(item, 2)});
                } 
            }

            atendimentos.push([
                item.id,
                item.nomePaciente,
                item.matriculaPaciente,
                item.dataAgendamento,
                item.horaInicial,
                <CustomChip status={situacao}/>,
                options
            ])
        })
    }
    return atendimentos
}

export function formatarListaAgendamentos (lista, usuario, dataServidor, atender, editar, cancelar, chegada, cancelarChegada) {
    let agendamentos = [];
    let permConsulta = checkPermission('/atendimento/assistencia-social/consulta');
    if(lista.data.length && dataServidor){
        let data = dataServidor.split(' ')[0];
        let hora = dataServidor.split(' ')[1];
        lista.data.map((item, index) => {
            let options = [];
            let situacao = "";
            if(item.situacaoAgendamento === 'Agendado'){
                if (item.atendimentoId){
                    if(item.situacaoAtendimento === 1 && data === dateBrToUs(item.dataAgendamento)){
                        if(permConsulta && usuario.prestador && usuario.prestador.id === item.idPrestador){
                            options.push({title: 'atender', description: 'Realizar atendimento', color: 'BgGreen', action: () => atender(item)});
                            options.push({title: 'saida', description: 'Cancelar chegada do paciente', color: 'BgRed', action: () => cancelarChegada(item)});
                        } 
                        situacao = 'Aguardando';        
                    } else {
                        situacao = 'Aguardando'; 
                    }
                    
                    if(item.situacaoAtendimento === 2){
                        situacao = 'Em atendimento';
                    }

                    if(item.situacaoAtendimento === 3){
                        situacao = 'Cancelado';
                    }

                    if(item.situacaoAtendimento === 4){
                        situacao = 'Realizado';
                    }
                } else {
                    if(data === dateBrToUs(item.dataAgendamento)){
                        options.push({title: 'chegada', description: 'Confirmar chegada do paciente', color: 'BgPrimary', action: () => chegada(item)});
                        options.push({title: 'cancelar_final', description: 'Cancelar agendamento', color: 'BgRed', action: () => cancelar(item)});
                    }
                    situacao = item.situacaoAgendamento;
                }
            } else {
                situacao = item.situacaoAgendamento;
            }
                agendamentos.push([
                    item.id,
                    item.nomePaciente,
                    item.matriculaPaciente,
                    item.dataAgendamento.split(" ")[0],
                    item.horaInicial,
                    item.nomePrestador,
                    <CustomChip status={situacao}/>,
                    options
                ]);
            
            
        })
    }
    return agendamentos
}


export function formatarListaAssistenciaSocial (lista, editar, deletar) {
    let assistenciaSocialLista = [];
    lista.map((item) => {
      assistenciaSocialLista.push([
        { size: 2, value: item.atendimentoId },
        { size: 2, value: item.dataInclusao },
        { size: 2, value: item.situacaoClinica },
        { size: 2, value: item.providenciaTomada },
        { size: 2, value: item.statusSituacao },
        { size: 2, isAction: true, actions: [{ colorButton: 'BgPrimary', icon: 'editar', event: () => { editar(item) } }, { colorButton: 'BgRed', icon: 'deletar', event: () => { deletar(item) },  align: 'right'  } ] },
                                                   
      ]);
    });

    return assistenciaSocialLista;
}

export function formatarListaReferenciaFamiliar (lista, editar, deletar) {
    let referenciaFamiliar = [];
    lista.map((item) => {
        if(item.situacao === 'S'){
            referenciaFamiliar.push([
                { size: 4, value: item.nome },
                { size: 3, value: item.parentesco && item.parentesco.descricao ? item.parentesco.descricao : 'Não informado' },
                { size: 3, value: moneyWithMask(moneyWithDecimalDigits(item.renda)) },
                { size: 1, isAction: true, actions: [{ colorButton: 'BgPrimary', icon: 'editar', event: () => { editar(item) }, align: 'right' }, { colorButton: 'BgRed', icon: 'deletar', event: () => { deletar(item) },  align: 'right'  }] },
                                                        
            ]);
        }
    });

    return referenciaFamiliar;
}

export function formatarListaResponsaveis (lista, editar, deletar) {
    let responsaveis = [];
    lista.map((item) => {
        if(item.ativo === 'S'){
            responsaveis.push([
                { size: 6, value: item.responsavelNome },
                { size: 3, value: item.parentescoDescricao },
                { size: 3, isAction: true, actions: [{ colorButton: 'BgPrimary', icon: 'editar', event: () => { editar(item) }, align: 'right' }, { colorButton: 'BgRed', icon: 'deletar', event: () => { deletar(item) },  align: 'right'  }] },
                                                           
              ]);
        }
    });

    return responsaveis;
}

export function formatarListaEvolucoes (lista, editar, deletar) {
    let evolucoes = [];
    lista.map((item) => {
        evolucoes.push([            
            { size: 3, value: item.dataInclusao},
            { size: 8, value: item.descricao},            
            { size: 1, isAction: true, actions: [{ colorButton: 'BgPrimary', icon: 'editar', event: () => { editar(item) } }, { colorButton: 'BgRed', icon: 'deletar', event: () => { deletar(item) },  align: 'right'  } ] },
                                                   
        ]);
    });

    return evolucoes;
}

export async function filtrarPessoasTitulares(filtro) {
    let lista = await filtrarPessoaMatriculaNome(filtro);

    return lista.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaTitular");
}

export async function filtrarPessoasDependentesPorMatricula(filtro) {
    let lista = await filtrarPessoaMatriculaNome(filtro);
    return lista.filter((pessoa) => pessoa.tipoBeneficiario === "PessoaDependente");
}