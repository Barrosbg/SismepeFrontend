import { Button, Collapse, Container, Card, CardContent, Box, TextField, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { toast } from "react-toastify";
import { BuscarPessoa } from "./action";
import { BuscarPrestador } from "./action";
import { saveCadastroTransfusional } from "./action";
import { atualizarCadastroTransfusional } from "./action";
import { BuscarPessoaPorId } from "./action";
import { BuscarSolicitacoesPorId } from "./action"
import {BuscarPrestadorPorId} from "./action";
import moment from 'moment';
import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'
import DateInput from '../../components/general/dateInput';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TelaResultadoExameHemacias from "./Telas/TelaResultadoExameHemacias";
import TelaResultadoConcentradoPlaquetas from "./Telas/TelaResultadoConcentradoPlaquetas"
import TelaResultadoPlasmaEaCrioprecipitado from "./Telas/TelaResultadoPlasmaEaCrioprecipitado"
import TelaResultadoCrio from "./Telas/TelaResultadoCrio"
import { useHistory, useParams } from 'react-route
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../../actions/geral/actions';
import DialogHeaderFooter from "../../../components/general/dialogHeaderFooter";
import withOkAndCancel from '../../../components/hocs/withOkAndCancel';

const Modal = withOkAndCancel(DialogHeaderFooter);
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),

    },
    container: {
        display: "flex",
        flexDirection: "row",
        margin: "dense"
    },
    formPessoa: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    formButton: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
}));
const ModalAtualizacaoTransfusional= (props) => {

    
    const [pessoa, setPessoa] = useState(null);
    const [modalOpen,setModalOpen] = useState(props.setModalOpen)

    const closeFunction = () => {
        //setModalOpen(false)
        props.closeFunction(false)
        //return modalOpen
    }

    let valorAtualizar = props.match.params.id

    useEffect(async () => {
        
        if (valorAtualizar != null) {
            setAtualizarCadstro(true)
            
            
            setNomeBotao(true)
            setCorBotao(true)
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let atualizar = await BuscarSolicitacoesPorId(valorAtualizar)
            
        let atualizarPrestado = await BuscarPrestadorPorId(atualizar.cdMedico)
           
            setTesteAtualizar(atualizar)
            console.log(atualizar)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            handleChangeLimparCampos()

            //////////////////////////OK/////////////////////////////
            
            setCodCadastro(valorAtualizar)
            setMatricula(atualizar.cdPessoa.matricula)
            setCdPessoa(atualizar.cdPessoa.id)
            setCdOrgao(atualizar.cdOrgao)
            setNomeCompleto(atualizar.cdPessoa.nome)
            setNomeMae(atualizar.cdPessoa.nomeMae)
            setDataNascimento(atualizar.cdPessoa.dataNascimento)
            setIdade(atualizar.idade)
            setSexo(atualizar.cdPessoa.sexo)
            setNumeroRg(atualizar.cdPessoa.rg)
            setTelefone(atualizar.cdPessoa.telefone)

            ////////////////////////OK///////////////////////////////
            setNumeroSolicitacao(atualizar.numeroSolicitacao)
            setPeso(atualizar.peso)
            setCns(atualizar.cns)
            setNumeroRegistro(atualizar.nemroRegistro)
            setSetor(atualizar.setor)
            setTelefoneSetor(atualizar.telefoneSetor)
            setDiagnostico(atualizar.diagnostico)

            ///////////////////////OK////////////////////////
            setAntTrans(atualizar.antecedenteTransf)
            setAntTransCh(atualizar.antecedenteTransfCh)
            setAntTransCp(atualizar.antecedenteTransfCp)
            setAntTransPfc(atualizar.antecedenteTransfPfc)
            setAntTransOutros(atualizar.antecedenteTransfOutros)

            ////////////////////////OK///////////////////////
            setAntGest(atualizar.antecedenteGestGesta)
            setAntGestPara(atualizar.antecedenteGestPara)
            setAntGestAborto(atualizar.antecedenteGestAborto)
            
            ///////////////////////OK////////////////////////
            setReacTrans(atualizar.reacaoTransf)
            setReacoesTransfusionaisTipo(atualizar.reacaoTransfTipo)
            setReacoesTransfusionaisData(atualizar.reacaoTransfData)

            /////////////////////////OK////////////////////////
            setUsaSangFeno(atualizar.sangueFenotipado)
            setUsaSangueFenotipadoQuais(atualizar.sangueFenotipadoTipos)

            ////////////////////////OK////////////////////////////
            setTipoHemo(atualizar.hemocompTipo)

           setDados(valorAtualizar)
           setTela(atualizar.hemocompTipo)

            ///////////////////////OK///////////////////////////
            carregarCompExterno(atualizar.hemocompTipo)

            //////////////////////////ok/////////////////////////////
            setMedida(atualizar.hemocompMedida)
            setQuantidade(atualizar.hemocompQuantidade)
            setDesleucocitados(atualizar.hemocompDesleucocitado)
            setFiltrado(atualizar.hemocompFiltrado)
            setLavado(atualizar.hemocompLavado)
            setFenotipado(atualizar.hemocompFenotipado)
            setIrradiado(atualizar.hemocompIrradiado)
            setDataResult(atualizar.exame_data)
            setResultHb(atualizar.exameHb)
            setResultHt(atualizar.exameHt)
            setResultPlaquetas(atualizar.examePlaquetas)
            setResultIrradiado(atualizar.exameInr)
            
            /////////////////////OK////////////////////////
            atualizar.transfusaoTipo == "programada"? setHabilitaDataHoraProgramada(false): setHabilitaDataHoraProgramada(true)
            setTipoTrans(atualizar.transfusaoTipo)
            setTipoTransfusaoProgramadaData(atualizar.transfusaoData)
            setHoraTransProgramada(atualizar.transfusaoHora)
            setIdMedico(atualizar.cdMedico)
            setNomeMedico(atualizarPrestado.nome)
            setDataSolicitacao(atualizar.dtSolicitacao)
            setSituacao(atualizar.situacao)
            setusuario(props.usuario.id);
           props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            // handleChangeLimparCampos();
        }

    }, [])

    const [dados, setDados] = useState('')
    const [tela, setTela] = useState('')

    const [paramTelas, setParamTelas] = useState('')
    const [atualizarCadastro, setAtualizarCadstro] = useState(false);
    const [testeAtualizar, setTesteAtualizar] = useState('');
    const [codCadastro, setCodCadastro] = useState('');
    let salvarHistory = useHistory();

    // const [modalOpen, setModalOpen] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    //////////////////////////////Dados Pessoais////////////////////////////////////
    const [matricula, setMatricula] = useState(0);
    const [cdPessoa, setCdPessoa] = useState(0);//carrega na
    const [cdOrgao, setCdOrgao] = useState(22);
    const [sequencial, setSequencial] = useState(0);
    // const [dadosPessoa, setDadosPessoa] = useState('');
    // const [dadosMaeERg, setDadosMaeERg] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [numeroRg, setNumeroRg] = useState('');
    const [telefone, setTelefone] = useState('');

    //////////////////////////////Dados Complementares//////////////////////////////
    const [numeroSolicitacao, setNumeroSolicitacao] = useState('');
    const [peso, setPeso] = useState(0);
    const [cns, setCns] = useState('');
    const [numeroRegistro, setNumeroRegistro] = useState('');
    const [setor, setSetor] = useState('');
    const [telefoneSetor, setTelefoneSetor] = useState('');
    const [idade, setIdade] = useState(0);
    // const [todosSetores, setTodosSetores] = useState('');

    const [diagnostico, setDiagnostico] = useState('');

    ///////////////////////////Antecedentes Transfusionais//////////////////////////

    const [checkTransfusional, setCheckTransfusional] = useState('');
    // console.log("Valor do Check "+checkTransfusional)
    const [antTrans, setAntTrans] = useState('');
    const [antTransCh, setAntTransCh] = useState(false);
    const [antTransCp, setAntTransCp] = useState(false);
    const [antTransPfc, setAntTransPfc] = useState(false);
    const [antTransOutros, setAntTransOutros] = useState(false);

    ///////////////////////////Antecedentes Gestacionais////////////////////////////
    const [checkGestacional, setCheckGestacional] = useState('');
    const [antGest, setAntGest] = useState('');
    const [antGestPara, setAntGestPara] = useState(false);
    const [antGestAborto, setAntGestAborto] = useState(false);

    /////////////////////////////Reações Transfusionais/////////////////////////////
    const [textReacoes, setTextReacoes] = useState('');
    const [reacTrans, setReacTrans] = useState('');
    const [reacoesTransfusionaisTipo, setReacoesTransfusionaisTipo] = useState('');
    const [reacoesTransfusionaisData, setReacoesTransfusionaisData] = useState('');

    /////////////////////////////Usa Sangue Fenótipado//////////////////////////////
    const [textFenotipado, setTextFenotipado] = useState('');
    const [usaSangFeno, setUsaSangFeno] = useState('')
    const [usaSangueFenotipadoQuais, setUsaSangueFenotipadoQuais] = useState('');

    //////////////////////////Hemocomponentes Solicitados///////////////////////////
    const [telaResultadoCh, setTelaResultadoCh] = useState('');
    const [telaResultadoCp, setTelaResultadoCp] = useState('');
    const [telaResultadoPfc, setTelaResultadoPfc] = useState('');
    const [telaResultadoCrio, setTelaResultadoCrio] = useState('');
    const [tipoHemo, setTipoHemo] = useState('');
    
    function carregarCompExterno (valor) {
        
        if (valor == "CH") {
            setTelaResultadoCh(true)
        }else if (valor == "CP") {
            setTelaResultadoCp(true)
        }else if (valor == "PFC") {
            setTelaResultadoPfc(true)
        }else{
            setTelaResultadoCrio(true)
        }
        
    }
    //////////////////////////Componente Externos///////////////////////////////////
    const [medida, setMedida] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [desleucocitados, setDesleucocitados] = useState('');
    const [filtrado, setFiltrado] = useState('');
    const [lavado, setLavado] = useState('');
    const [fenotipado, setFenotipado] = useState('');
    const [irradiado, setIrradiado] = useState('');
    const [dataResult, setDataResult] = useState('');
    const [resultHb, setResultHb] = useState('');
    const [resultHt, setResultHt] = useState('');
    const [resultPlaquetas, setResultPlaquetas] = useState('');
    const [resultIrradiado, setResultIrradiado] = useState('');

    ////////////////////////////////Tipo Transfusão/////////////////////////////////
    const [tipoTrans, setTipoTrans] = useState('');
    const [tipoTransfusaoProgramadaData, setTipoTransfusaoProgramadaData] = useState('');
    const [tipoTransfusaoProgramadaHora, setTipoTransfusaoProgramadaHora] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [idMedico, setIdMedico] = useState(0);
    const [dataSolicitacao, setDataSolicitacao] = useState('');
    const [situacao, setSituacao] = useState('');
    const [habilitaDataHoraProgramada, setHabilitaDataHoraProgramada] = useState(true);
    const [horaTransProgramada, setHoraTransProgramada] = useState("");

    /////////////////////////////////////Outros//////////////////////////////////////
    const [usuario, setusuario] = useState('');
    // setusuario(props.usuario.id)
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [busca, setBusca] = useState(null);
    const [buscaSetor, setBuscaSetor] = useState(null)
    const [pessoaPId, setPessoaPId] = useState(null)
    const [numRG, setNumRG] = useState(null)
    const [porSetor, setPorSetor] = useState(null);
    const [porPessoa, setPorPessoa] = useState(null);
    // const [pessoa, setPessoa] = useState(null);
    const [dataCadastro, setDataCadastro] = useState(null);
    const [mostrarSetor, setMostrarSetor] = useState(true)
    const [mostrarPorPessoa, setMostrarPorPessoa] = useState(true)
    const [listaSetor, setListaSetor] = useState([])

    /////////////////////////botão Salvar/Atualizar////////////////////////////////////
    const [nomeBotao, setNomeBotao] = useState(false);
    const [corBotao, setCorBotao] = useState(false);
    function direcionarSalvar() {
        salvarHistory.push('/CadastroTransfusional/CadastroSolicitacaoTransfusional')
    }

    //////////////////////////////Handle Dados Pessoais/////////////////////////////////
    const handleChangeSetCdPessoa = (event) => {
        setCdPessoa(event.target.value);
    };
    const handleChangeSetCdOrgao = (event) => {
        setCdOrgao(event.target.value);
    };
    const handleChangeMatricula = (event) => {
        setMatricula(event.target.value);
    };
    const handleChangeNomeCompleto = (event) => {
        setNomeCompleto(event.target.value);
    };
    const handleChangeNomeMae = (event) => {
        setNomeMae(event.target.value);
    };
    const handleDataNascimento = (event) => {
        setDataNascimento(event.target.value);
    };
    const handleChangeSexo = (event) => {
        setSexo(event.target.value);
    };
    const handleChangeNumeroRg = (event) => {
        setNumeroRg(event.target.value);
    };
    const handleChangeTelefone = (event) => {
        setTelefone(event.target.value);
    };

    /////Preenche os Campos com os dados de pessoa, pessoa_dependente e pessoa_titular/////
    //gerar um alerta que faltam campos a serem preenchidos
    const changePrestador = (e) => {/////////////////////////////////
        setNomeMedico('')
        setNomeMedico(e.nome);
        setIdMedico(e.id);
    }
    const changePessoa = async (e) => {
        //console.log(props.usuario.id)
        setNumeroRg('');
        setNomeMae('');
        setTelefone('');
        setDataNascimento('');
        setIdade(0);
        if (e.id) {
            console.log(e.id)

            let res = await BuscarPessoaPorId(e.id)
            // console.log(res.nome)
            setNomeMae(res.nomeMae)
            setNumeroRg(res.rg)
            setTelefone(res.telefone)
            setCdPessoa(res.id)
            // console.log("AQUI "+res)
        }
        setNomeCompleto(e.nome);
        setSexo(e.sexo);
        setMatricula(e.matricula);
        setDataNascimento(moment(e.dataNascimento).format('DD/MM/yyyy'));
        setIdade(e.idade);
        setSequencial(e.sequencial);
    }

    ///////////////////////////Handle Dados Complementares/////////////////////////////////
    const handleChangeNumeroSolicitacao = (event) => {
        setNumeroSolicitacao(event.target.value);
    };
    const handleChangePeso = (event) => {
        setPeso(event.target.value);
    };
    const handleChangeCns = (event) => {
        setCns(event.target.value);
    };
    const handleChangeNumeroRegistro = (event) => {
        setNumeroRegistro(event.target.value);
    };
    const handleChangeSetor = (event) => {
        setSetor(event.target.value);
    };
    const handleChangeTelefoneSetor = (event) => {
        setTelefoneSetor(event.target.value);
    };
    const handleChangeDiagnostico = (event) => {
        setDiagnostico(event.target.value);
    };

    ////////////////////////Handle Antecedentes Transfusionais/////////////OK/////////////
    const handleChangeOpcaoRadioAntecedentesTansfuncionais = (e) => {
        if (e.target.value == "nao") {
            setAntTransCh(false);
            setAntTransCp(false);
            setAntTransPfc(false);
            setAntTransOutros(false);
            setAntTrans(false);//Habilita os checks
        } else {
            setAntTrans(true);//Habilita os checks
        }
    }
    // pegando valores dos checks antecedentes transfusionais
    const handleChangeAntTransCh = (e) => {
        setAntTransCh(e.target.checked);
    }
    const handleChangeAntTransCp = (e) => {
        setAntTransCp(e.target.checked);
    }
    const handleChangeAntTransPfc = (e) => {
        setAntTransPfc(e.target.checked);
    }
    const handleChangeAntTransOutros = (e) => {
        setAntTransOutros(e.target.checked);
    }

    /////////////////////////Handle Antecedentes Gestacionais//////////////OK///////////
    const handleChangeRadioAntecedentesGestacionais = (e) => {
        if (e.target.value == "nao") {
            setAntGestPara(false);
            setAntGestAborto(false);
            setCheckGestacional(true);//desabilito o checkBox
            setAntGest(false);//valor passado

        } else {
            setAntGest(true);//valor passado
        }
    }
    const handleChangeAntGestPara = (e) => {
        setAntGestPara(e.target.checked);
    }
    const handleChangeAntGestAborto = (e) => {
        setAntGestAborto(e.target.checked);
    }

    ///////////////////////Handle Reações Transfusionais//////////////////////////////
    //console.log(reacoesTransfusionaisData);
    const handleChangeRadioReacoesTransfusionais = (e) => {
        if (e.target.value == "nao") {
            setTextReacoes(true);
            setReacTrans(false);
            setReacoesTransfusionaisTipo('');
            setReacoesTransfusionaisData(null);

        } else {
            setTextReacoes(false);
            setReacTrans(true);
        }
    }
    const handleChangeReacoesTransfusionaisTipo = (event) => {
        setReacoesTransfusionaisTipo(event.target.value);
    };

    /////////////////////////Handle Usa Sangue Fenótipado/////////////////////////////
    const handleChangeRadioUsaSangueFenotipado = (e) => {
        if (e.target.value == "nao") {
            setTextFenotipado(true);
            setUsaSangFeno(false);
            setUsaSangueFenotipadoQuais('');
        } else {
            setTextFenotipado(false);
            setUsaSangFeno(true)
        }
    }
    const handleChangeUsaSangueFenotipadoQuais = (event) => {
        setUsaSangueFenotipadoQuais(event.target.value);
    };

    /////////////////////////Carregamento de Telas/Componentes////////////////////////
    // const [marcarRadio, setMarcarRadio]
    const handleChangeOpcaoRadio = (event) => {

        let valor = (event.target.value)

        if (valor == "CH") {
            setTelaResultadoCh(true);
            setTipoHemo(event.target.value);
            setParamTelas(valorAtualizar)
        } else {
            setTelaResultadoCh(false)
            setParamTelas('')
        }
        if (valor == "CP") {
            setTelaResultadoCp(true)
            setTipoHemo(event.target.value);
        } else {
            setTelaResultadoCp(false)
        }
        if (valor == "PFC") {
            setTelaResultadoPfc(true)
            setTipoHemo(event.target.value);
        } else {
            setTelaResultadoPfc(false)
        }
        if (valor == "CRIO") {
            setTelaResultadoCrio(true)
            setTipoHemo(event.target.value);
        } else {
            setTelaResultadoCrio(false)
        }
    };

    /////////////////////////////Handle Transfusao////////////////////////////////////
    const handleChangeTipoProgramada = (e) => {

        if (e.target.value != "programada") {
            setHabilitaDataHoraProgramada(true);
            setHoraTransProgramada('');
            setTipoTransfusaoProgramadaData(null);
        } else {
            setHabilitaDataHoraProgramada(false);
        }
        if (e.target.value == "programada") {
            setTipoTrans(e.target.value);
        }
        if (e.target.value == "naoUrgente") {
            setTipoTrans(e.target.value);
        }
        if (e.target.value == "urgente") {
            setTipoTrans(e.target.value);
        }
        if (e.target.value == "extremaUrgencia") {
            setTipoTrans(e.target.value);
        }
    }
    const handleChangeTipoTransfusaoProgramadaHora = (event) => {
        setTipoTransfusaoProgramadaHora(event.target.value);
    };
    const handleChangeNomeMedico = (event) => {
        setNomeMedico(event.target.value);
    };
    const handleChangeSituacao = (event) => {
        setSituacao(event.target.value);
        //console.log(event.target.value);
    };
    const hendlechangeHoraTransProgramada = (e) => {
        setHoraTransProgramada(e.target.value);
        //console.log(e.target.value);
    };

    ///////////////////////////////////salvar no Banco////////////////////////////////

    const handleSalvarTranfusional = async () => {

        if (matricula != "" && cdPessoa != "" && cdOrgao != "" && idMedico != "" && dataSolicitacao != "") {
            const payload = {

                matricula: matricula,
                cdPessoa: cdPessoa,
                cdOrgao: cdOrgao,
                numeroSolicitacao: numeroSolicitacao,
                idade: idade,
                peso: peso,
                sequencial: sequencial,
                cns: cns,
                setor: setor,
                telefoneSetor: telefoneSetor,
                nemroRegistro: numeroRegistro,
                diagnostico: diagnostico,
                antecedenteTransf: antTrans,
                antecedenteTransfCh: antTransCh,
                antecedenteTransfCp: antTransCp,
                antecedenteTransfPfc: antTransPfc,
                antecedenteTransfOutros: antTransOutros,
                antecedenteGestGesta: antGest,
                antecedenteGestPara: antGestPara,
                antecedenteGestAborto: antGestAborto,
                reacaoTransf: reacTrans,
                reacaoTransfTipo: reacoesTransfusionaisTipo,
                reacaoTransfData: reacoesTransfusionaisData,
                sangueFenotipado: usaSangFeno,
                sangueFenotipadoTipos: usaSangueFenotipadoQuais,
                hemocompTipo: tipoHemo,

                hemocompMedida: medida,
                hemocompQuantidade: quantidade,
                hemocompDesleucocitado: desleucocitados,
                hemocompFiltrado: filtrado,
                hemocompLavado: lavado,
                hemocompFenotipado: fenotipado,
                hemocompIrradiado: irradiado,
                exame_data: dataResult,
                exameHb: resultHb,
                exameHt: resultHt,
                examePlaquetas: resultPlaquetas,
                exameInr: resultIrradiado,

                transfusaoTipo: tipoTrans,
                transfusaoData: tipoTransfusaoProgramadaData,
                transfusaoHora: horaTransProgramada,
                dtSolicitacao: dataSolicitacao,
                situacao: situacao,
                cdMedico: idMedico,
                dtCadastro: moment().format(),////////////
                cdUsuario: props.usuario.id,
            }
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await saveCadastroTransfusional(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            // console.log(response.status)
            // console.log(response)
            if (response.status === 201) {
                toast.success("Cadastro Salvo com sucesso!")
                // handleChangeLimparCampos()
                direcionarSalvar()

            } else {
                toast.error("Problema ao salvar")
            }
        } else {
            toast.warn("Todos os campos com * devem ser preenchidos")
        }
    };

    ////////////////////////////////Atualizar////////////////////////////////////////
    const handleAtualizarTranfusional = async () => {

        if (matricula != "" && cdPessoa != "" && cdOrgao != "") {
            const payload = {

                matricula: matricula,
                cdPessoa: cdPessoa,
                cdOrgao: cdOrgao,
                numeroSolicitacao: numeroSolicitacao,
                idade: idade,
                peso: peso,
                sequencial: sequencial,
                cns: cns,
                setor: setor,
                telefoneSetor: telefoneSetor,
                nemroRegistro: numeroRegistro,
                diagnostico: diagnostico,
                antecedenteTransf: antTrans,
                antecedenteTransfCh: antTransCh,
                antecedenteTransfCp: antTransCp,
                antecedenteTransfPfc: antTransPfc,
                antecedenteTransfOutros: antTransOutros,
                antecedenteGestGesta: antGest,
                antecedenteGestPara: antGestPara,
                antecedenteGestAborto: antGestAborto,
                reacaoTransf: reacTrans,
                reacaoTransfTipo: reacoesTransfusionaisTipo,
                reacaoTransfData: reacoesTransfusionaisData,
                sangueFenotipado: usaSangFeno,
                sangueFenotipadoTipos: usaSangueFenotipadoQuais,
                hemocompTipo: tipoHemo,

                hemocompMedida: medida,
                hemocompQuantidade: quantidade,
                hemocompDesleucocitado: desleucocitados,
                hemocompFiltrado: filtrado,
                hemocompLavado: lavado,
                hemocompFenotipado: fenotipado,
                hemocompIrradiado: irradiado,
                exame_data: dataResult,
                exameHb: resultHb,
                exameHt: resultHt,
                examePlaquetas: resultPlaquetas,
                exameInr: resultIrradiado,

                transfusaoTipo: tipoTrans,
                transfusaoData: tipoTransfusaoProgramadaData,
                transfusaoHora: horaTransProgramada,
                dtSolicitacao: dataSolicitacao,
                situacao: situacao,
                cdMedico: idMedico,
                dtCadastro: moment().format(),////////////
                cdUsuario: props.usuario.id,
            }
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await atualizarCadastroTransfusional(id, payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            // console.log(response.status)
            // console.log(response)
            if (response.status === 200) {
                toast.success("Cadastro Atualizado com sucesso!")
                // handleChangeLimparCampos()
                direcionarSalvar()

            } else {
                toast.error("Problema ao Atualizar")
            }
        } else {
            toast.warn("Todos os campos com * devem ser preenchidos")
        }
    };

    ////////////////////////////////Limpar campos/////////////////////////////////////
    const handleChangeLimparCampos = (event) => {
        document.getElementById("testandoFuncao").reset();

        setMatricula('');
        setNomeCompleto('');
        setNomeMae('');
        setDataNascimento('');
        setIdade('');
        setSexo('');
        setNumeroRg('');
        setTelefone('');
        setSetor('');
        setTelefoneSetor('');
        setNumeroSolicitacao('');
        setPeso(0);
        setCns('');
        setNumeroRegistro('');
        setDiagnostico('');
        document.getElementById("formCheckAntTrans").reset();
        document.getElementById("formCheckAntGest").reset();
        setReacoesTransfusionaisTipo('');
        setReacoesTransfusionaisData(null);
        setUsaSangueFenotipadoQuais('');
        setTipoTransfusaoProgramadaData(null);
        setHoraTransProgramada('');
        setNomeMedico('');
        setDataSolicitacao(null);
        setSituacao('');
    };

    /////////////////////////dados vindos de outros Componentes//////////////////////////
    const dadosCh = (e) => {

        if (telaResultadoCh) {

            setMedida(e.medida);
            setQuantidade(e.quantidade);
            setDesleucocitados(e.checkDesleucocitados);
            setFiltrado(e.checkFiltrado);
            setLavado(e.checkLavado);
            setFenotipado(e.checkFenotipado);
            setIrradiado(e.checkIrradiado);
            setDataResult(e.resultData);
            setResultHb(e.exameHb);
            setResultHt(e.exameHt);
            setResultPlaquetas(e.examePlaquetas);
            setResultIrradiado(e.exameInr);

        } if (telaResultadoCp) {

            setMedida(e.medida);
            setQuantidade(e.quantidade);
            setFiltrado(e.checkFiltrado);
            setIrradiado(e.checkIrradiado);
            setDataResult(e.resultData);
            setResultHb(e.exameHb);
            setResultHt(e.exameHt);
            setResultPlaquetas(e.examePlaquetas);
            setResultIrradiado(e.exameInr);

        } else {

            setMedida(e.medida);
            setQuantidade(e.quantidade);
            setDataResult(e.resultData);
            setResultHb(e.exameHb);
            setResultHt(e.exameHt);
            setResultPlaquetas(e.examePlaquetas);
            setResultIrradiado(e.exameInr);
        }
    }

    const [checarNao, setChecarNao] = useState(true);
    const [checarSim, setChecarSim] = useState(false);
    const [valorVindo, setValorVindo] = useState(null)

    

    return(

        <Modal
            isOpen
            handleClose={() => props.closeFunction(false)}
            title="Teste"
            cancelAction={() =>closeFunction()}
            okLabel="Teste"
            //okAction={() => handleSave()}
        >  
            <Container>
            {/* ////////////////////////////Testes////////////////////////////// */}
        
            <div className="Spacer"></div>

            {/* //////////////////////////Dados Pessoais////////////////////////// */}
            <Card>
                <CardContent>
                    Dados Pessoais
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={11} md={4}>
                            <div>
                                <TextFieldAutocomplete id="Matricula"
                                    value={pessoa} label="Matricula"
                                    actionFilter={BuscarPessoa}
                                    actionChangeOption={changePessoa}
                                    getOptionLabel={(option) => option.matricula + '-' + option.nome}
                                    filterOptions={(options, object) => options.filter((item) =>
                                        item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase())
                                        || item.matricula.toString().includes(object.inputValue))} />
                            </div>
                        </Grid>
                        <Grid item xs={11} md={2} mt={-1}>
                            <TextField
                                required
                                label="Mátricula"
                                id="outlined-start-adornment"
                                value={matricula}
                                onChange={handleChangeMatricula}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={5} mt={-1}>
                            <TextField
                                required
                                label="Nome Completo"
                                id="outlined-start-adornment"
                                value={nomeCompleto}
                                onChange={handleChangeNomeCompleto}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={4.5} >
                            <TextField
                                label="Nome da mãe"
                                id="outlined-start-adornment"
                                value={nomeMae}
                                onChange={handleChangeNomeMae}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={1.7} >
                            <TextField
                                label="Data Nascimento"
                                id="outlined-start-adornment"
                                value={dataNascimento}
                                onChange={setDataNascimento}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={1} >
                            <TextField
                                label="Idade"
                                id="outlined-start-adornment"
                                value={idade}
                                onChange={setIdade}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={0.8} >
                            <TextField
                                label="Sexo"
                                id="outlined-start-adornment"
                                value={sexo}
                                onChange={handleChangeSexo}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={1.4} >
                            <TextField
                                label="Número RG"
                                id="outlined-start-adornment"
                                value={numeroRg}
                                onChange={handleChangeNumeroRg}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={11} md={1.6} >
                            <TextField
                                label="Telefone"
                                id="outlined-start-adornment"
                                value={telefone}
                                onChange={setTelefone}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div className="Spacer"></div>

            {/* ///////////////////////Dados Complementares//////////////////////// */}
            <Card>
                <CardContent>Dados da Complementares
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={2} >
                            <TextField
                                required
                                label="N Solicitação"
                                id="outlined-start-adornment"
                                value={numeroSolicitacao}
                                onChange={handleChangeNumeroSolicitacao}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={0.7} >
                            <TextField
                                label="Peso"
                                id="outlined-start-adornment"
                                value={peso}
                                onChange={handleChangePeso}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={2.9} >
                            <TextField
                                label="CNS"
                                id="outlined-start-adornment"
                                value={cns}
                                onChange={handleChangeCns}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={1.7} >
                            <TextField
                                label="N Registro"
                                id="outlined-start-adornment"
                                value={numeroRegistro}
                                onChange={handleChangeNumeroRegistro}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                label="Setor"
                                id="outlined-start-adornment"
                                value={setor}
                                onChange={handleChangeSetor}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={1.7} >
                            <TextField
                                label="Fone Setor"
                                id="outlined-start-adornment"
                                value={telefoneSetor}
                                onChange={handleChangeTelefoneSetor}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={11} >
                            <TextField
                                label="Diagnóstico"
                                id="outlined-start-adornment"
                                value={diagnostico}
                                multiline minRows={3}
                                onChange={handleChangeDiagnostico}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div className="Spacer"></div>Histórico Transfusional:
            <div className="Spacer"></div>

            <form id="testandoFuncao">
                {/* ///////////////////Antecedentes Transfusionais/////////////OK//////// */}
                <Card>
                    <CardContent>Antecedentes Transfusionais
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={6} md={2} >
                                <div>
                                    <input
                                        type="radio"
                                        value={"nao"}
                                        name="Antecedentes-Transfusionais"
                                        onChange={''}
                                        checked={!antTrans ? true : false}
                                        onClick={handleChangeOpcaoRadioAntecedentesTansfuncionais}
                                    /> Não
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        value={"sim"}
                                        name="Antecedentes-Transfusionais" 
                                        onChange={''}
                                        checked={antTrans ? true : false}
                                        onClick={handleChangeOpcaoRadioAntecedentesTansfuncionais}
                                    /> Sim
                                </div>
                            </Grid>
                            <Grid item xs={6} md={4} >
                                Quais
                                <form id="formCheckAntTrans">
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="AntecedentesQuaisCH"
                                            value="CH"
                                            checked = {antTransCh? true : false}
                                            disabled={!antTrans ? true : false}
                                            onChange={handleChangeAntTransCh}
                                        />CH
                                        <input
                                            type="checkbox"
                                            name="AntecedentesQuaisCP"
                                            value="CP"
                                            checked = {antTransCp? true : false}
                                            disabled={!antTrans ? true : false}
                                            onChange={handleChangeAntTransCp}
                                        />CP
                                        <input
                                            type="checkbox"
                                            name="AntecedentesQuaisPFC"
                                            value="PFC"
                                            checked = {antTransPfc? true : false}
                                            disabled={!antTrans ? true : false}
                                            onChange={handleChangeAntTransPfc}
                                        />PFC
                                        <input
                                            type="checkbox"
                                            name="AntecedentesQuaisOUTROS"
                                            value="OUTROS"
                                            checked = {antTransOutros? true : false}
                                            disabled={!antTrans ? true : false}
                                            onChange={handleChangeAntTransOutros}
                                        />Outros
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <div className="Spacer"></div>

                {/* /////////////////////Antecedentes Gestacionais//////////////OK/////// */}
                <Card>
                    <CardContent>
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={6} md={2} >
                                Antecedentes Gestacionais
                                <div>
                                    <input
                                        type="radio"
                                        value="nao"
                                        name="Antecedentes-Gestacionais"
                                        checked={!antGest ? true : false}
                                        onClick={handleChangeRadioAntecedentesGestacionais}
                                    /> Não
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value="sim"
                                        name="Antecedentes-Gestacionais"
                                        checked={antGest ? true : false}
                                        onClick={handleChangeRadioAntecedentesGestacionais}
                                    /> Sim
                                </div>
                            </Grid>
                            <Grid item xs={6} md={4} >
                                Quais
                                <form id="formCheckAntGest">
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="para"
                                            value="para"
                                            disabled={!antGest? true: false}
                                            checked = {antGestPara ? true : false}
                                            onChange={handleChangeAntGestPara}
                                        />Para
                                        <input
                                            type="checkbox"
                                            name="aborto"
                                            value="aborto"
                                            disabled={!antGest? true : false}
                                            checked={antGestAborto ? true : false}
                                            onChange={handleChangeAntGestAborto}
                                        />Aborto
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <div className="Spacer"></div>

                {/* ///////////////////////Rações Transfusionais///////////////OK/////// */}
                <Card>
                    <CardContent>
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={12} md={1.5} >
                                Reações Transfusionais
                                <div>
                                    <input
                                        type="radio"
                                        value="nao"
                                        name="reacao-transfusional"
                                        checked={!reacTrans ? true : false}
                                        onClick={handleChangeRadioReacoesTransfusionais}
                                    /> Não
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value="sim"
                                        name="reacao-transfusional"
                                        checked={reacTrans ? true : false}
                                        onClick={handleChangeRadioReacoesTransfusionais}
                                    />Sim
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2} mt={4}>
                                <TextField
                                    label="Tipo?"
                                    id="outlined-start-adornment"
                                    value={reacoesTransfusionaisTipo}
                                    onChange={handleChangeReacoesTransfusionaisTipo}
                                    multiline minRows={2}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    disabled={!reacTrans ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} md={1.8} mt={5}>
                                <DateInput
                                    label="Data"
                                    value={reacoesTransfusionaisData}
                                    handleDateChange={(newDate) => setReacoesTransfusionaisData(newDate)}
                                    disabled={!reacTrans ? true : false}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <div className="Spacer"></div>

                {/* ///////////////////////Usa Sangue Fenótipado////////////////////// */}
                <Card>
                    <CardContent>
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={12} md={1.5} >
                                Usa Sangue Fenótipado
                                <div>
                                    <input
                                        type="radio"
                                        value="nao"
                                        name="Sangue-Fenótipado"
                                        checked={!usaSangFeno ? true : false}
                                        onClick={handleChangeRadioUsaSangueFenotipado}
                                    />Não
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value="sim"
                                        name="Sangue-Fenótipado"
                                        checked={usaSangFeno ? true : false}
                                        onClick={handleChangeRadioUsaSangueFenotipado}
                                    />Sim
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4.5} mt={4}>
                                <TextField
                                    label="Quais Fenótipos?"
                                    id="outlined-start-adornment"
                                    value={usaSangueFenotipadoQuais}
                                    onChange={handleChangeUsaSangueFenotipadoQuais}
                                    multiline minRows={3}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    disabled={!usaSangFeno ? true : false}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <div className="Spacer"></div>
                {/* //////////////////////Radio dos Hemocomponentes//////////////////// */}
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Hemocomponentes Solicitados em Unidade ou Volume
                    </AccordionSummary>

                    <Card>
                        <CardContent>
                            <Grid container spacing={5} margin="dense" >
                                <Grid item xs={12} md={3} >
                                    <div className="radios">
                                        <input
                                            type="radio"
                                            value={"CH"}
                                            name="Hemocomponentes-solicitados"
                                            checked={tipoHemo == 'CH' ? true : false}
                                            onClick={handleChangeOpcaoRadio}
                                        /> Concentrado de Hemácias
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3} >
                                    <div className="radios">
                                        <input
                                            type="radio"
                                            value={"CP"}
                                            name="Hemocomponentes-solicitados"
                                            checked={tipoHemo == 'CP' ? true : false}
                                            onClick={handleChangeOpcaoRadio}
                                        /> Concentrado de Plaquetas
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3} >
                                    <div className="radios">
                                        <input
                                            type="radio"
                                            value={"PFC"}
                                            name="Hemocomponentes-solicitados"
                                            checked={tipoHemo == 'PFC' ? true : false}
                                            onClick={handleChangeOpcaoRadio}
                                        /> Plasma Fresco Congelado
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3} >
                                    <div className="radios">
                                        <input
                                            type="radio"
                                            value={"CRIO"}
                                            name="Hemocomponentes-solicitados"
                                            checked={tipoHemo == 'CRIO' ? true : false}
                                            onClick={handleChangeOpcaoRadio}
                                        /> Crioprecipitado
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className="Spacer"></div>
                    {console.log(dados+" - "+ tela)}
                    <Card>
                        <CardContent>
                            {telaResultadoCh && <TelaResultadoExameHemacias dadosCh={(e) => dadosCh(e)} dados={dados} tela={tela} />}
                            {telaResultadoCp && < TelaResultadoConcentradoPlaquetas dadosCh={(e) => dadosCh(e)} dados={dados} tela={tela}/>}
                            {telaResultadoPfc && < TelaResultadoPlasmaEaCrioprecipitado dadosCh={(e) => dadosCh(e)} dados={dados} tela={tela}/>}
                            {telaResultadoCrio && < TelaResultadoCrio dadosCh={(e) => dadosCh(e)} dados={dados} tela={tela}/>}
                        </CardContent>
                    </Card>
                </Accordion>

                <div className="Spacer"></div>Tipo Transfusão

                {/* /////////////////////////////Transfusão//////////////////////////// */}
                <Card>
                    <CardContent>
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={12} md={2.1} >
                                <div >
                                    <input
                                        type="radio"
                                        value={"naoUrgente"}
                                        name="TipoTransfusao"
                                        checked={tipoTrans == "naoUrgente"? true : false}
                                        onClick={handleChangeTipoProgramada}
                                    /> Não Urgente
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value={"programada"}
                                        name="TipoTransfusao"
                                        checked={tipoTrans == "programada"? true : false}
                                        onClick={handleChangeTipoProgramada}
                                    /> Programada
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2} >
                                <div>
                                    <input
                                        type="radio"
                                        value={"urgente"}
                                        name="TipoTransfusao"
                                        checked={tipoTrans == "urgente"? true : false}
                                        onClick={handleChangeTipoProgramada}
                                    /> Urgente
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value={"extremaUrgencia"}
                                        name="TipoTransfusao"
                                        checked={tipoTrans == "extremaUrgencia"? true : false}
                                        onClick={handleChangeTipoProgramada}
                                    /> Extrema Urgência
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2} mt={-1}>
                                <div>
                                    <DateInput
                                        label="Data"
                                        value={tipoTransfusaoProgramadaData}
                                        handleDateChange={(newDate) => setTipoTransfusaoProgramadaData(newDate)}
                                        disabled={habilitaDataHoraProgramada}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="time"
                                        label="Hora"
                                        type="time"
                                        defaultValue="07:30"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        sx={{ width: 180, }}
                                        value={horaTransProgramada}
                                        onChange={hendlechangeHoraTransProgramada}
                                        margin="dense"
                                        variant="outlined"
                                        size="small"
                                        disabled={habilitaDataHoraProgramada}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2} >

                            </Grid>
                            <Grid item xs={12} md={4.1} mt={0}>
                                <TextFieldAutocomplete id="Matricula"
                                    value={pessoa} label="Nome do Médico"
                                    actionFilter={BuscarPrestador}
                                    actionChangeOption={changePrestador}
                                    getOptionLabel={(option) => option.nome}
                                    filterOptions={(options, object) => options.filter((item) =>
                                        item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()))}
                                />
                            </Grid>
                            <Grid item xs={12} md={3.5} mt={-1}>
                                <TextField
                                    label="Nome do Médico"
                                    id="outlined-start-adornment"
                                    value={nomeMedico}
                                    onChange={handleChangeNomeMedico}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} md={2} mt={0}>
                                <DateInput
                                    label="Data"
                                    value={dataSolicitacao}
                                    handleDateChange={(newDate) => setDataSolicitacao(newDate)}
                                // disabled={dataSolicitacao} 
                                />
                            </Grid>
                            <Grid item xs={12} md={2} mt={-1}>
                                <TextField
                                    label="Situação"
                                    id="outlined-start-adornment"
                                    value={situacao}
                                    onChange={handleChangeSituacao}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
            <div className="Spacer"></div>

            {/* ////////////////////////////Botões////////////////////////////////// */}
            <Card>
                <CardContent>
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="secondary" fullWidth onClick={direcionarSalvar}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           
                            <Button variant="contained" color={corBotao? "info" : "success"} fullWidth onClick={atualizarCadastro? handleAtualizarTranfusional : handleSalvarTranfusional}>
                            {nomeBotao? "Atualizar" : "Salvar"}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Container>
        </Modal>
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAtualizacaoTransfusional)