import { Button, Collapse, Container, Card, CardContent, Box, TextField, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { toast } from "react-toastify";
import { BuscarPessoa} from "./action";
// import { CheckBox, CheckBoxOutlineBlank, Clear, Group } from "@mui/icons-material";
// import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
// import TelaResultadoExameHemacias from "./Telas/TelaResultadoExameHemacias";
// import TelaResultadoConcentradoPlaquetas from './Telas/TelaResultadoConcentradoPlaquetas';
// import TelaResultadoPlasmaEaCrioprecipitado from "./Telas/TelaResultadoPlasmaEaCrioprecipitado";

import { BuscarPrestador } from "./action";
import { saveCadastroTransfusional } from "./action";
import { BuscarPessoaPorId } from "./action";

// import Autocomplete from '@mui/material/Autocomplete';

import moment from 'moment';
import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'

import DateInput from '../../components/general/dateInput';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ModalPlasmaCrio from "./Telas/ModalPlasmaCrio";
// import ModalConcentradoHemacias from "./Telas/ModalConcentradoHemacias";
import ModalConcentradoPlaquetas from "./Telas/ModalConcentradoPlaquetas";
import withOkAndCancel from './../../components/hocs/withOkAndCancel';
import TelaResultadoExameHemacias from "./Telas/TelaResultadoExameHemacias";
import TelaResultadoConcentradoPlaquetas from "./Telas/TelaResultadoConcentradoPlaquetas"
import TelaResultadoPlasmaEaCrioprecipitado from "./Telas/TelaResultadoPlasmaEaCrioprecipitado"


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

const GerarIdentificacao = (props) => {
    

    const [modalOpen, setModalOpen] = useState(false);

    //////////////////////////////Dados Pessoais////////////////////////////////////
    const [matricula, setMatricula] = useState(0);
    const [cdPessoa, setCdPessoa] = useState(0);//carrega na
    const [cdOrgao, setCdOrgao] = useState(22);
    const[sequencial, setSequencial] = useState(0);
    const [dadosPessoa, setDadosPessoa] = useState('');
    const [dadosMaeERg, setDadosMaeERg] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState ('');
    const [numeroRg, setNumeroRg] = useState('');
    const [telefone, setTelefone] = useState('');

    //////////////////////////////Dados Complementares//////////////////////////////
    const [numeroSolicitacao, setNumeroSolicitacao] = useState();
    const [peso, setPeso] = useState(0);
    const [cns, setCns] = useState('');
    const [numeroRegistro, setNumeroRegistro] = useState('');
    const [setor, setSetor] = useState('');
    const [telefoneSetor, setTelefoneSetor] = useState('');
    const [idade, setIdade] = useState(0);
    // const [todosSetores, setTodosSetores] = useState('');
    
    const [diagnostico, setDiagnostico] = useState('');

    ///////////////////////////Antecedentes Transfusionais//////////////////////////
    const [checkTransfusional, setCheckTransfusional] = useState(true);
    const [antTrans, setAntTrans] = useState('');
    const [antTransCh, setAntTransCh] = useState(false);
    const [antTransCp, setAntTransCp] = useState(false);
    const [antTransPfc, setAntTransPfc] = useState(false);
    const [antTransOutros, setAntTransOutros] = useState(false);

    ///////////////////////////Antecedentes Gestacionais////////////////////////////
    const [checkGestacional, setCheckGestacional] = useState(true);
    const [antGest, setAntGest] = useState('');
    const [antGestPara, setAntGestPara] = useState(false);
    const [antGestAborto, setAntGestAborto] = useState(false);

    /////////////////////////////Reações Transfusionais/////////////////////////////
    const [textReacoes, setTextReacoes] = useState(true);
    const [reacTrans, setReacTrans] = useState('');
    const [reacoesTransfusionaisTipo, setReacoesTransfusionaisTipo] = useState('');
    const [reacoesTransfusionaisData, setReacoesTransfusionaisData] = useState('');

    /////////////////////////////Usa Sangue Fenótipado//////////////////////////////
    const [textFenotipado, setTextFenotipado] = useState(true);
    const [usaSangFeno, setUsaSangFeno] = useState('')
    const [usaSangueFenotipadoQuais, setUsaSangueFenotipadoQuais] = useState('');

    //////////////////////////Hemocomponentes Solicitados///////////////////////////
    const [telaResultadoCh, setTelaResultadoCh] = useState('');
    const [telaResultadoCp, setTelaResultadoCp] = useState('');
    const [telaResultadoPfc, setTelaResultadoPfc] = useState('');
    const [telaResultadoCrio, setTelaResultadoCrio] = useState('');
    const [tipoHemo, setTipoHemo] = useState('');

    ////////////////////////////////Tipo Transfusão/////////////////////////////////
    const [tipoTrans, setTipoTrans] = useState('');
    const [tipoTransfusaoProgramadaData, setTipoTransfusaoProgramadaData] = useState('');
    const [tipoTransfusaoProgramadaHora, setTipoTransfusaoProgramadaHora] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [idMedico, setIdMedico] = useState('');
    const [dataSolicitacao, setDataSolicitacao] = useState('');
    const [situacao, setSituacao] = useState('');
    const[habilitaDataHoraProgramada, setHabilitaDataHoraProgramada] = useState(true);
    const [horaTransProgramada, setHoraTransProgramada] = useState("");
    
    /////////////////////////////////////Outros//////////////////////////////////////
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [busca, setBusca] = useState(null);
    const [buscaSetor, setBuscaSetor] = useState(null)
    

    const [pessoaPId, setPessoaPId] = useState(null)
    const [numRG, setNumRG] = useState(null)
    const [porSetor, setPorSetor] = useState(null);
    const [porPessoa, setPorPessoa] = useState(null);
    const [pessoa, setPessoa] = useState(null);
    const [dataCadastro, setDataCadastro] = useState(null);
    const [mostrarSetor, setMostrarSetor] = useState(true)
    const [mostrarPorPessoa, setMostrarPorPessoa] = useState(true)
    const [listaSetor, setListaSetor] = useState([])

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
    const changePrestador = (e) => {
        setNomeMedico('')
        setNomeMedico(e.nome);
        setIdMedico(e.id);
    }
    const changePessoa = async (e) =>{
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

    ////////////////////////Handle Antecedentes Transfusionais////////////////////////////
    const handleChangeOpcaoRadioAntecedentesTansfuncionais = (e) =>{
        if (e.target.value == "nao") {
            setCheckTransfusional(true);
            setAntTrans(false);
            document.getElementById("formCheckAntTrans").reset();
            
        }else{
            setCheckTransfusional(false);
            setAntTrans(true);
            //console.log("Sim");
        }
    }
    // pegando valores dos checks antecedentes transfusionais
    const handleChangeAntTransCh= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntTransCh(e.target.checked);
        }else{
            setAntTransCh(e.target.checked);
            console.log(e.target.checked);
        }
    }
    const handleChangeAntTransCp= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntTransCp(e.target.checked);
        }else{
            setAntTransCp(e.target.checked);
            console.log(e.target.checked);
        }
    }
    const handleChangeAntTransPfc= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntTransPfc(e.target.checked);
        }else{
            setAntTransPfc(e.target.checked);
            console.log(e.target.checked);
        }
    }
    const handleChangeAntTransOutros= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntTransOutros(e.target.checked);
        }else{
            setAntTransOutros(e.target.checked);
            console.log(e.target.checked);
        }
    }

    /////////////////////////Handle Antecedentes Gestacionais/////////////////////////
    const handleChangeRadioAntecedentesGestacionais = (e) =>{
        if (e.target.value == "nao") {
            setCheckGestacional(true);
            setAntGest(false);
            document.getElementById("formCheckAntGest").reset();
            
        }else{
            setCheckGestacional(false);
            setAntGest(true);
            
        }
    }
    const handleChangeAntGestPara= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntGestPara(e.target.checked);
        }else{
            setAntGestPara(e.target.checked);
            console.log(e.target.checked);
        }
    }
    const handleChangeAntGestAborto= (e) =>{
        if (e.target.checked == true) {  
            console.log(e.target.checked);
            setAntGestAborto(e.target.checked);
        }else{
            setAntGestAborto(e.target.checked);
            console.log(e.target.checked);
        }
    }

    ///////////////////////Handle Reações Transfusionais//////////////////////////////
    //console.log(reacoesTransfusionaisData);
    const handleChangeRadioReacoesTransfusionais = (e) =>{
        if (e.target.value == "nao") {
            setTextReacoes(true);
            setReacTrans(false);
            setReacoesTransfusionaisTipo('');
            setReacoesTransfusionaisData(null);

        }else{
            setTextReacoes(false);
            setReacTrans(true);   
        }
    }
    const handleChangeReacoesTransfusionaisTipo = (event) => {
        setReacoesTransfusionaisTipo(event.target.value);
    };

    /////////////////////////Handle Usa Sangue Fenótipado/////////////////////////////
    const handleChangeRadioUsaSangueFenotipado = (e) =>{
        if (e.target.value == "nao") {
            setTextFenotipado(true);
            setUsaSangFeno(false);
            setUsaSangueFenotipadoQuais('');
        }else{
            setTextFenotipado(false);
            setUsaSangFeno(true)
        }
    }
    const handleChangeUsaSangueFenotipadoQuais = (event) => {
        setUsaSangueFenotipadoQuais(event.target.value);
    };

    /////////////////////////Carregamento de Telas/Componentes////////////////////////
    const handleChangeOpcaoRadio = (event) => {

        let valor = (event.target.value)

        if(valor == "CH"){
            setTelaResultadoCh(true);
            setTipoHemo(event.target.value);
            // document.getElementById("formRadios").reset();
        }else{
            setTelaResultadoCh(false)
        }
        if(valor == "CP"){
            setTelaResultadoCp(true)
            setTipoHemo(event.target.value);
            //  document.getElementById("formRadios").reset();
        }else{
            setTelaResultadoCp(false)
        }
        if(valor == "PFC"){
            setTelaResultadoPfc(true)
            setTipoHemo(event.target.value);
            //  document.getElementById("formRadios").reset();
        }else{
            setTelaResultadoPfc(false)
        }
        if(valor == "CRIO"){
            setTelaResultadoCrio(true)
            setTipoHemo(event.target.value);
             //document.getElementById("formRadios").reset();
        }else{
            setTelaResultadoCrio(false)
        }
    };

    /////////////////////////////Handle Transfusao////////////////////////////////////
    const handleChangeTipoProgramada = (e) =>{
        if (e.target.value != "programada") {
            setHabilitaDataHoraProgramada(true);
            setHoraTransProgramada('');
            setTipoTransfusaoProgramadaData(null);
        }else{
            setHabilitaDataHoraProgramada(false); 
        }
         if(e.target.value == "programada"){
            setTipoTrans(e.target.value);
        }
        if(e.target.value == "naoUrgente"){
            setTipoTrans(e.target.value);
        }
        if(e.target.value == "urgente"){
            setTipoTrans(e.target.value);
        }
        if(e.target.value == "extremaUrgencia"){
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
        console.log(reacoesTransfusionaisData);
        
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
                transfusaoTipo: tipoTrans,
                transfusaoData: tipoTransfusaoProgramadaData,
                transfusaoHora: horaTransProgramada,
                dtSolicitacao: dataSolicitacao,
                situacao: situacao,
                cdMedico: idMedico,
                dtCadastro: moment().format(),
            
            }
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await saveCadastroTransfusional(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(response.status)
            console.log(response)
            if(response.status === 201){
                toast.success("Cadastro Salvo com sucesso!")
                handleChangeLimparCampos()
            }else{
                toast.error("Problema ao salvar")
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

        setNumeroSolicitacao('');
        setPeso(0);
        setCns('');
        setNumeroRegistro('');
        // setSetor('');
        // setTelefoneSetor('');
        setDiagnostico('');

        document.getElementById("formRadios").reset();
        document.getElementById("formCheckAntTrans").reset();
        document.getElementById("formCheckAntGest").reset();

        
      
        setReacoesTransfusionaisTipo('');
        setReacoesTransfusionaisData(null);

        setUsaSangueFenotipadoQuais('');

        // setHemocomponentesSolicitadosMedida('');
        // setHemocomponentesSolicitadosQuantidade('');
        // setHemocomponentesSolicitadosResultData('');
        // setHemocomponentesSolicitadosResultHb('');
        // setHemocomponentesSolicitadosResultHt('');
        // setHemocomponentesSolicitadosResultPlaquetas('');
        // setHemocomponentesSolicitadosResultInr('');

        setTipoTransfusaoProgramadaData(null);
        setHoraTransProgramada('');
        //setTipoTransfusaoProgramadaHora('');
        setNomeMedico('');
        setDataSolicitacao(null);
        setSituacao('');
    };

    ///////////////////////////////////////Outros/////////////////////////////////////
    const changeSetor = (e) =>{
       console.log(e)
    } 

    const changebuscarIdentificacao = async () => {

            if (porSetor !== null) {
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let ident = await imprimirIdentificacaoPorSetor(porSetor)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
            }else{
                toast.warn("Selecione um setor antes de pesquisar")
            }
    }
    const [codPessoa, setCodPessoa] = useState(null);
    const [prestadorPessoa, setPrestadorPessoa] = useState(null);

    
    ///////////////////////////////Para Testes///////////////////////////////
    const closeFunction = (e) => {
        setTelaResultadoCh(false);
        setTelaResultadoCp(false);
        setTelaResultadoPfc(false);
        setTelaResultadoCrio(false);
        
    }

    const [hemocomponentesSolicitadosMedida, setHemocomponentesSolicitadosMedida] = useState('');
    const [hemocomponentesSolicitadosQuantidade, setHemocomponentesSolicitadosQuantidade] = useState('');
    const [hemocomponentesSolicitadosResultData, setHemocomponentesSolicitadosResultData] = useState('');
    const [hemocomponentesSolicitadosResultHb, setHemocomponentesSolicitadosResultHb] = useState('');
    const [hemocomponentesSolicitadosResultHt, setHemocomponentesSolicitadosResultHt] = useState('');
    const [hemocomponentesSolicitadosResultPlaquetas, setHemocomponentesSolicitadosResultPlaquetas] = useState('');
    const [hemocomponentesSolicitadosResultInr, setHemocomponentesSolicitadosResultInr] = useState('');
    const [checkDesleucocitados, setCheckDesleucocitados] = useState('');
    const [checkFiltrado, setCheckFiltrado] = useState('');
    const [checkLavado, setCheckLavado] = useState('');
    const [checkFenotipado, setCheckFenotipado] = useState('');
    const [checkIrradiado, setCheckIrradiado] = useState('');
    const [checkFiltradoCp, setCheckFiltradoCp] = useState('');
    const [checkIrradiadoCp, setCheckIrradiadoCp] = useState('');

    const handleChangeHemocomponentesSolicitadosMedida = (event) => {
        setHemocomponentesSolicitadosMedida (event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosQuantidade = (event) => {
        setHemocomponentesSolicitadosQuantidade(event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosResultHb = (event) => {
        setHemocomponentesSolicitadosResultHb(event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosResultHt = (event) => {
        setHemocomponentesSolicitadosResultHt(event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosResultPlaquetas = (event) => {
        setHemocomponentesSolicitadosResultPlaquetas(event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosResultInr = (event) => {
        setHemocomponentesSolicitadosResultInr(event.target.value);
    };

    const handleChangeCheckDesleucocitados = (event) => {
        setCheckDesleucocitados(event.target.checked);
    };
    const handleChangeCheckFiltrado = (event) => {
        setCheckFiltrado(event.target.checked);
    };
    const handleChangeCheckLavado = (event) => {
        setCheckLavado(event.target.checked);
    };
    const handleChangeCheckFenotipado = (event) => {
        setCheckFenotipado(event.target.checked);
    };
    const handleChangeCheckIrradiado = (event) => {
        setCheckIrradiado(event.target.checked);
    };
    const handleChangeCheckFiltradoCp = (event) => {
        setCheckFiltradoCp(event.target.checked);
    };
    const handleChangeCheckIrradiadoCp = (event) => {
        setCheckIrradiadoCp(event.target.checked);
        console.log(event.target.value)
    };

    return (

        <Container>
             {/* ////////////////////////////Testes////////////////////////////// */}
            <Card>
                {/* <CardContent>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardContent> */}
            </Card>

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
                        
            <div className="Spacer"></div>Hisórico Transfusional

        <form id="testandoFuncao">
            {/* ///////////////////Antecedentes Transfusionais///////////////////// */}
            <Card>
                <CardContent>
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={6} md={2} >
                            Antecedentes Transfusionais
                            <div>
                                <input 
                                    type="radio" 
                                    value={"nao"} 
                                    name="Antecedentes-Transfusionais"
                                    onChange={handleChangeOpcaoRadioAntecedentesTansfuncionais}
                                    
                                /> Não
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    value={"sim"}
                                    name="Antecedentes-Transfusionais" 
                                    onChange={handleChangeOpcaoRadioAntecedentesTansfuncionais}
                                   
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
                                        disabled={checkTransfusional}
                                        onChange={handleChangeAntTransCh}
                                    />CH
                                    <input 
                                        type="checkbox"  
                                        name="AntecedentesQuaisCP" 
                                        value="CP"
                                        disabled={checkTransfusional} 
                                        onChange={handleChangeAntTransCp}
                                    />CP
                                    <input 
                                        type="checkbox"  
                                        name="AntecedentesQuaisPFC" 
                                        value="PFC"
                                        disabled={checkTransfusional}
                                        onChange={handleChangeAntTransPfc}
                                    />PFC
                                    <input 
                                        type="checkbox"  
                                        name="AntecedentesQuaisOUTROS" 
                                        value="OUTROS"
                                        disabled={checkTransfusional}
                                        onChange={handleChangeAntTransOutros}
                                    />Outros
                                </div>
                            </form>    
                        </Grid>
                    </Grid>    
                </CardContent>        
            </Card>

            <div className="Spacer"></div>

            {/* /////////////////////Antecedentes Gestacionais///////////////////// */}
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
                                onChange={handleChangeRadioAntecedentesGestacionais}
                                
                                /> Não
                            </div>
                            <div>
                                <input 
                                type="radio" 
                                value="sim" 
                                name="Antecedentes-Gestacionais"
                                onChange={handleChangeRadioAntecedentesGestacionais}
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
                                        disabled={checkGestacional}
                                        onChange={handleChangeAntGestPara}
                                    />Para
                                    <input 
                                        type="checkbox" 
                                        name="aborto" 
                                        value="aborto"
                                        disabled={checkGestacional}
                                        onChange={handleChangeAntGestAborto}
                                    />Aborto
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div className="Spacer"></div> 

             {/* ///////////////////////Rações Transfusionais////////////////////// */}
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
                                    onChange={handleChangeRadioReacoesTransfusionais}
                                /> Não
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    value="sim" 
                                    name="reacao-transfusional"
                                    onChange={handleChangeRadioReacoesTransfusionais}
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
                                disabled={textReacoes}
                            />
                        </Grid>
                        <Grid item xs={12} md={1.8} mt={5}>
                            <DateInput 
                                label="Data" 
                                value={reacoesTransfusionaisData}
                                //handleDateChange={setReacoesTransfusionaisData}
                                handleDateChange={(newDate) => setReacoesTransfusionaisData(newDate)}
                                disabled={textReacoes} 
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
                                    onChange={handleChangeRadioUsaSangueFenotipado}
                                />Não
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    value="sim" 
                                    name="Sangue-Fenótipado"
                                    onChange={handleChangeRadioUsaSangueFenotipado}
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
                                disabled={textFenotipado}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div className="Spacer"></div>

            {/* <Card>
                <CardContent> */}
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        Hemocomponentes Solicitados em Unidade ou Volume
                        </AccordionSummary>
                         {/* //////////////////////Radio dos Hemocomponentes//////////////////// */}
                        <Card>
                            <CardContent>
                                <Grid container spacing={5} margin="dense" >
                                    <Grid item xs={12} md={3} >
                                        <div className="radios">
                                            <input 
                                            type="radio" 
                                            value={"CH"} 
                                            name="Hemocomponentes-solicitados"
                                            onClick={handleChangeOpcaoRadio}
                                            onChange={''}
                                            /> Concentrado de Hemácias
                                        </div>
                                        </Grid>
                                        <Grid item xs={12} md={3} >
                                            <div className="radios">
                                                <input 
                                                type="radio" 
                                                value={"CP"}
                                                name="Hemocomponentes-solicitados"
                                                onClick={handleChangeOpcaoRadio}
                                                onChange={''}
                                                /> Concentrado de Plaquetas
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={3} >
                                            <div className="radios">        
                                                <input 
                                                type="radio" 
                                                value={"PFC"} 
                                                name="Hemocomponentes-solicitados"
                                                onClick={handleChangeOpcaoRadio}
                                                onChange={''}
                                                /> Plasma Fresco Congelado
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={3} >
                                            <div className="radios">
                                                <input 
                                                type="radio" 
                                                value={"CRIO"}
                                                name="Hemocomponentes-solicitados"
                                                onClick={handleChangeOpcaoRadio}
                                                onChange={''}
                                                /> Crioprecipitado
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                             <div className="Spacer"></div>
                            <Card>
                                <CardContent>
                                    {telaResultadoCh && <TelaResultadoExameHemacias  />}
                                    {telaResultadoCp && < TelaResultadoConcentradoPlaquetas/>}
                                    {telaResultadoPfc && < TelaResultadoPlasmaEaCrioprecipitado/>}
                                    {telaResultadoCrio && < TelaResultadoPlasmaEaCrioprecipitado/>}
                                    {/* {telaResultadoCh && <ModalConcentradoHemacias closeFunction={ (e)=> closeFunction(e)} />}
                                    {telaResultadoCp && <ModalConcentradoPlaquetas closeFunction={ (e)=> closeFunction(e)} />}
                                    {telaResultadoPfc && <ModalPlasmaCrio closeFunction={ (e)=> closeFunction(e)} />}
                                    {telaResultadoCrio && <ModalPlasmaCrio closeFunction={ (e)=> closeFunction(e)} />} */}
                                </CardContent>
                            </Card>
                    </Accordion>
                
           
            {/* <form id="formRadios">
                <Card>
                 <CardContent>
                     <Grid container spacing={5} margin="dense" >
                          <Grid item xs={12} md={3} >
                              <div className="radios">
                                 <input 
                                 type="radio" 
                                 value={"CH"} 
                                 name="Hemocomponentes-solicitados"
                                 onClick={handleChangeOpcaoRadio}
                                 onChange={''}
                                 /> Concentrado de Hemácias
                              </div>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <div className="radios">
                                    <input 
                                    type="radio" 
                                    value={"CP"}
                                    name="Hemocomponentes-solicitados"
                                    onClick={handleChangeOpcaoRadio}
                                    onChange={''}
                                    /> Concentrado de Plaquetas
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <div className="radios">        
                                    <input 
                                    type="radio" 
                                    value={"PFC"} 
                                    name="Hemocomponentes-solicitados"
                                    onClick={handleChangeOpcaoRadio}
                                    onChange={''}
                                    /> Plasma Fresco Congelado
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <div className="radios">
                                    <input 
                                    type="radio" 
                                    value={"CRIO"}
                                    name="Hemocomponentes-solicitados"
                                    onClick={handleChangeOpcaoRadio}
                                    onChange={''}
                                    /> Crioprecipitado
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form> */}
           

            

            <div className="Spacer"></div>Tipo Transfusão

            {/* /////////////////////////////Transfusão//////////////////////////// */}
            <Card>
                <CardContent>
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={2.1} >
                            <div > 
                                <input 
                                    type="radio" 
                                    value={"programada"} 
                                    name="TipoTransfusao" 
                                    onChange={handleChangeTipoProgramada}
                                /> Programada
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    value={"naoUrgente"} 
                                    name="TipoTransfusao"
                                    onChange={handleChangeTipoProgramada} 
                                /> Não Urgente
                            </div>
                            </Grid>
                            <Grid item xs={12} md={2} >
                            <div>
                                <input 
                                    type="radio" 
                                    value={"urgente"} 
                                    name="TipoTransfusao" 
                                    onChange={handleChangeTipoProgramada}
                                /> Urgente
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    value={"extremaUrgencia"} 
                                    name="TipoTransfusao" 
                                    onChange={handleChangeTipoProgramada}
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
                                    InputLabelProps={{shrink: true}}
                                    inputProps={{step: 300}}
                                    sx={{ width: 180, }}
                                    value={horaTransProgramada}
                                    onChange={hendlechangeHoraTransProgramada}
                                    margin="dense"
                                    variant="outlined"
                                    size="small"
                                    disabled={habilitaDataHoraProgramada}
                                />
                                {/* <input 
                                    id="hora-cons" 
                                    type="time" 
                                    name="hora-cons" 
                                    value="13:30">
                                </input> */}
                                    {/* <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    /> */}
                                {/* <TextField
                                    label="Hora *"
                                    id="outlined-start-adornment"
                                    value={""}
                                    onChange={""}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    disabled={habilitaDataHoraProgramada} 
                                /> */}
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
                        <Grid item xs={12} md={2}  mt={-1}>
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
                            <Button variant="contained" color="info" fullWidth onClick={handleChangeLimparCampos}>
                                 Limpar Campos
                            </Button>
                         </Grid>
                         <Grid item xs={12} md={6}>
                            {/* <Button variant="contained" color="secondary" fullWidth onClick={handleSalvarTranfusional}> */}
                            <Button variant="contained" color="success" fullWidth onClick={handleSalvarTranfusional}>   
                                 Salvar
                            </Button>
                         </Grid>
                     </Grid>
                 </CardContent>
            </Card>
             
        </Container>
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GerarIdentificacao)


