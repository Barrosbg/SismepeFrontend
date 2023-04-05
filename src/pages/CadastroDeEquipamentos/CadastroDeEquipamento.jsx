import { Component } from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Divider, Fab, Grid, IconButton, TextField, Typography, Collapse } from '@mui/material';
import DateInput from '../../components/general/dateInput';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import FormControl from '@mui/material/FormControl'
// import './index.css';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete'
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { openModal, changeModal } from '../../actions/geral/actions';
import { connect } from "react-redux";
import { ListarUsuario } from '../../actions/jms/actions'
import { bindActionCreators } from 'redux';
import './action'
import { buscarEquipamento } from './action';
import moment from 'moment'
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work
import { width } from '@mui/system';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TelaDeCadastroEquipamentos from './TelaDeCadastroEquipamentos';
import TeladeBuscaDeEquipamentos from './TeladeBuscaTodosEquipamentos';
import EntradasESaidas from './EntradasESaidas';
import TeladeBuscaTodosEquipamentos from './TeladeBuscaTodosEquipamentos';
import TelaBuscaEquipamentos from './TelaBuscaEquipamentos';
import TelaCadastro01Transfusional from './TelaCadastro01Transfusional';
import CadastroSolicitacaoTransfusional from './CadastroSolicitacaoTransfusional';
moment.locale('pt')

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const CadastroDeEquipamento = (props) => {

    const [equip, setEquip] = useState(null)
    const [openModalAdicionar, setOpenModalAdicionar] = useState(false)

    const handleMaquina = (id) => {
        setEquip(id.target.value)
    }

    const handleBuscarMaquina = async () => {
        const equipamento = await buscarEquipamento(equip);
        console.log(equipamento)
    }

    const handleAdicionarMaquina = (id) => {

        setOpenModalAdicionar(true)
    }


    // componentDidUpdate(prevProps){
    //     if(this.state.cid !== prevProps.cid){
    //         this.setState({cid:null})
    //     }
    // }

    // changePessoa = (pessoa) => {
    //     this.setState({ pessoa: pessoa })
    // }
    // changeParecer = (parecer) => {
    //     this.setState({ parecer: parecer })
    // }
    // changePrestador = (prestador) => {
    //     this.setState({ prestador: prestador })
    // }
    // changeCid = (cid) => {
    //     this.state({ cid: cid })
    // }

    // handleChangecid = (cid) => {
    //     const { inputValues } = this.state
    //     let lista = inputValues
    //     console.log(cid)
    //     if (cid !== null) {
    //         if (lista.length == 0) {
    //             lista.push(cid)
    //             this.setState({ inputValues: lista })
    //         } else {
    //             this.handleAdicionaElementoCid(lista, cid)
    //             console.log(cid)
    //         }
    //     }
    //     this.setState({ cid: null })
    // }
    // handleQtdDias = (qdias) => {
    //     let dias = parseInt(qdias.target.value)
    //     if (isNaN(dias)) {
    //         this.setState({ qtdDias: "" })
    //     } else {
    //         this.setState({ qtdDias: dias })
    //     }
    // }
    // handleChange = (event) => {
    //     this.setState({ value: event.target.value })
    // }
    // changePaciente = async (paciente) => {
    //     if (paciente == null) {
    //         this.setState(INITIAL_STATE)
    //         this.setState({ hidden: false })
    //     } else {
    //         this.setState({ paciente: paciente })
    //         this.BuscarLicencas(paciente)
    //         this.setState({ hidden: true })
    //     }
    //     console.log(paciente)
    // }
    // changeOme = (ome) => {
    //     this.setState({ ome: ome })
    // }
    // handleDateInicial = (date) => {
    //     let data = moment(date).format()
    //     this.setState({ dateFrom: date, dtInicial: data });
    // }

    // handleChangePaginacao = async (event, page) => {
    //     const { listaLicencas, paciente, linesPerPage } = this.state
    //     let Licencaspages = await ListarLicenca(paciente, page, linesPerPage);
    //     this.setState({ listaLicencas: Licencaspages, page: page })
    // }

    // handleRowsPerPage = async (event) => {
    //     const { page, paciente } = this.state
    //     let linesPerPage = event.target.value
    //     let Licencaspages = await ListarLicenca(paciente, page, linesPerPage);
    //     this.setState({ listaLicencas: Licencaspages, page: page, linesPerPage: linesPerPage })
    // }


    // handleLimparTela = () => {

    //     this.setState({ listaLicencas: [], paciente: [] })
    //     this.setState(INITIAL_STATE)

    // }
    // handleClickCloseCadastro = () => {
    //     this.handleLimparCamposCadastro()
    //     this.setState({ isOpenModalCadastro: false })

    // }

    // liberaAlteracao = (item) => {

    //     if (item.omeCadastro === null || this.props.usuario.ome === null) {
    //         this.setState({ visivel: false })
    //     } else if (this.props.usuario.ome.id === item.omeCadastro.id && item.homologacao === null) {
    //         this.setState({ visivel: true, })
    //     } else {
    //         this.setState({ visivel: false })
    //     }
    // }

    // handleClickEditarLicenca = () => {
    //     // const { SalvarVisivel, cid, prestador, parecer, dtInicial, qtdDias, licencaId } = this.state
    //     this.setState({
    //         SalvarVisivel: true, visivel: false, fecharVisivel: true, habilitaCompo: true, cid: null, prestador: null, parecer: null, dtInicial: null, qtdDias: "",
    //         cidError: false,
    //         prestadorError: false,
    //         parecerError: false,
    //         dtInicialError: false,
    //         qtdDiasError: false,
    //     })
    // }

    // handleClickOpenCadastro = (item) => {
    //     let userId = this.props.usuario.perfis;
    //     let omeid = this.props.usuario;
    //     let result = userId.find((element) => element.id == 17)
    //     if (result) {
    //         this.setState({ textFieldTroca: true, ome: null, isOpenModalCadastro: true })
    //         this.handleLimparCamposCadastro()
    //     } else {
    //         this.setState({ ome: omeid.ome?.id, textFieldTroca: false, isOpenModalCadastro: true })
    //         this.handleLimparCamposCadastro()
    //     }
    //     console.log(this.props.usuario)
    // }

    // validarCamposForm = (cadastro) => {
    //     const { ome, inputValues, pessoa, prestador, parecer, cid, dtInicial, qtdDias, isOpenModalCadastro } = cadastro

    //     if (pessoa === null && ome == null && prestador == null && parecer == null && inputValues.length == 0 && cid == null && dtInicial == null && qtdDias == 0) {
    //         toast.error('Os Campos do formulário precisam ser preenchidos antes de salvar')
    //     } else if (pessoa === '' || pessoa === null) {
    //         this.setState({ pessoaError: true })
    //         toast.error('Preencher o nome do usuário')
    //     } else if (inputValues.length === 0) {
    //         this.setState({ cidError: true })
    //         toast.error('Preencher o campo Cid')
    //     } else if (prestador === null) {
    //         this.setState({ prestadorError: true })
    //         toast.error('Preencher o campo Prestador')
    //     } else if (parecer === null) {
    //         this.setState({ parecerError: true })
    //         toast.error('Preencher o campo Parecer')
    //     } else if (dtInicial === null) {
    //         this.handleDateInicial(this.state.dateFrom)
    //         // this.setState({ dtInicial: dateFrom })
    //     } else if (qtdDias === null) {
    //         this.setState({ qtdDiasError: true })
    //         toast.error('Preencher o campo Qtd Dias')
    //     } else if (typeof (qtdDias) !== 'number') {
    //         this.setState({ qtdDiasError: true })
    //         toast.error('Quantidade de dias não pode conter letras.')
    //     } else if (ome === null) {
    //         this.setState({ omeError: true })
    //         toast.error('Ome precisa ser informada.')

    //     } else {

    //         this.handleSubmit(inputValues, pessoa, prestador, parecer, cid, dtInicial, qtdDias, ome.id, isOpenModalCadastro)

    //     }
    // }

    // handleSalvarCadastro = () => {
    //     const { ome, omeId, textFieldTroca, inputValues, pessoa, prestador, parecer, cid, dtInicial, qtdDias } = this.state
    //     this.validarCamposForm({ "ome": ome, "omeId": omeId, "inputValues": inputValues, "pessoa": pessoa, "prestador": prestador, "parecer": parecer, "cid": cid, "dtInicial": dtInicial, "qtdDias": qtdDias, "isOpenModalCadastro": false })
    //     // this.BuscarLicencas(pessoa)
    // }

    // handleClickFecharEdicaoLicenca = () => {
    //     this.handleClickCloseDetalhes()
    // }

    // handleClickOpenDetalhes = async (item) => {
    //     console.log(item)
    //     let itemObj = this.state.objItem
    //     let prestador
    //     itemObj = []
    //     this.hancleListarPrestador(item.prestador.numeroConselho)
    //     this.handleCalculaData(item.dataInicio, item.qtdDias)
    //     item.conselho = prestador
    //     itemObj.push(item)
    //     this.setState({ objItem: itemObj, licencaId: item.id, isOpenModalDetalhes: true })
    //     this.liberaAlteracao(item)
    // }

    // hancleListarPrestador = async (id) => {
    //     let prestador = await ListarPrestador(id)
    //     this.setState({ conselho: prestador[0].conselho.sigla, uf: prestador[0].conselho.uf })
    // }

    // handleClickCloseDetalhes = () => {
    //     this.setState({
    //         isOpenModalDetalhes: false
    //     })
    //     this.handleLimparCamposCadastro()
    // }

    // handleCalculaData = (inicio, dias) => {
    //     var moment = require('moment');
    //     const date = moment(inicio, 'DD-MM-YYYY').format()
    //     let dtfim = moment(date).add(dias, 'Days').format('L');
    //     this.setState({ dtFinal: dtfim })
    // }

    // handleDateApresentacao = (date) => {
    //     let dtApresentacao = this.handleDataFormatada(date)
    //     this.setState({ dtApresentacao: dtApresentacao });
    // }

    // handleLimparCamposCadastro = () => {
    //     this.setState({
    //         inputValues: [], pessoa: null, SalvarVisivel: false, fecharVisivel: false, habilitaCompo: false, visivel: false, prestador: null, ome: null, parecer: null, cid: null, dateFrom: new Date(), qtdDias: "",
    //         pessoaError: false,
    //         cidError: false,
    //         prestadorError: false,
    //         parecerError: false,
    //         dtInicialError: false,
    //         qtdDiasError: false,

    //     })
    // }
    // handleClickSalvarLicencaAlterada = () => {
    //     const { cid, prestador, parecer, dtInicial, qtdDias, licencaId } = this.state
    //     if (prestador == null && parecer == null && cid == null && dtInicial == null && (qtdDias == 0 || qtdDias == null)) {
    //         toast.error('Os Campos do formulário precisam ser preenchidos antes de salvar')
    //     } else if (cid == null) {
    //         this.setState({ cidError: true })
    //         toast.error('Preencher o campo Cid')
    //     } else if (prestador === null) {
    //         this.setState({ prestadorError: true })
    //         toast.error('Preencher o campo Prestador')
    //     } else if (parecer === null) {
    //         this.setState({ parecerError: true })
    //         toast.error('Preencher o campo Parecer')
    //     } else if (dtInicial === null) {
    //         this.setState({ dtInicialError: true })
    //         toast.error('Preencher o campo Data Inicial')
    //     } else if (qtdDias === null || qtdDias === 0) {
    //         this.setState({ qtdDiasError: true })
    //         toast.error('Preencher o campo Qtd Dias')

    //     } else if (typeof (qtdDias) !== 'number') {
    //         this.setState({ qtdDiasError: true })
    //         toast.error('Quantidade de dias não pode conter letras.')

    //     } else {

    //         AtualizarLicenca(licencaId, dtInicial, qtdDias, prestador.id, parecer.id, this.props.usuario.id, cid.id).then(response => {
    //             if (response.status === 200) {
    //                 toast.success('Licença Atualizada com sucesso')
    //                 this.BuscarLicencas(this.state.paciente)
    //                 this.handleClickCloseDetalhes()
    //                 // this.setState({ isOpenModalCadastro: false })
    //                 // this.handleLimparCamposCadastro()

    //             } else {
    //                 toast.error('Erro ao atualizar Licença')
    //                 this.handleLimparCamposCadastro();
    //             }
    //         })
    //     }
    // }

    // handleClickSalvarENovo = () => {
    //     const { ome, textFieldTroca, inputValues, pessoa, prestador, parecer, cid, dtInicial, qtdDias } = this.state

    //     if (textFieldTroca) {
    //         this.validarCamposForm({ "ome": ome, "inputValues": inputValues, "pessoa": pessoa, "prestador": prestador, "parecer": parecer, "cid": cid, "dtInicial": dtInicial, "qtdDias": qtdDias, "isOpenModalCadastro": true })
    //     } else {
    //         this.validarCamposForm({ "ome": ome?.ome?.id, "inputValues": inputValues, "pessoa": pessoa, "prestador": prestador, "parecer": parecer, "cid": cid, "dtInicial": dtInicial, "qtdDias": qtdDias, "isOpenModalCadastro": true })

    //     }
    // }

    // handleAdicionaElementoCid = (lista, cid) => {
    //     if (lista.find(el => el.id == cid.id)) {
    //         toast.warn('Cid Já Adicionado!')
    //         this.setState({ cid: null })
    //     } else {
    //         lista.push(cid)
    //         this.setState({ inputValues: lista, cid: null })
    //     }
    // }

    // handleDeleteItem = (id) => {
    //     let lista = this.state.inputValues
    //     lista.splice(id, 1);
    //     this.setState(lista)
    // }

    // handleListaDetalhes = (id) => {
    //     let lista = this.state.listaLicencas
    //     let itemDetalhe = this.state.itemDetalhe
    //     lista.filter((item) => {
    //         if (item.id == id) {
    //             itemDetalhe.push(item)
    //             this.setState({ itemDetalhe: itemDetalhe })
    //         }
    //     })
    // }


    // handleLastPageButtonClick = (event) => {
    //     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    // }

    // BuscarLicencas = async (pessoa) => {

    //     this.props.fetchBackdrop('BACKDROP_FETCHED', true);
    //     if (pessoa === null || pessoa === '') {
    //         this.setState({ listaLicencas: [], hidden: true, inputValue: [] })
    //     } else {
    //         this.setState({ listaLicencas: await ListarLicenca(pessoa) })
    //         this.setState({hidden:true})
    //     }
    //     this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    //     console.log(this.state.listaLicencas)
    // }


    // handleSubmit = (inputValues, pessoa, prestador, parecer, cid, dtInicial, qtdDias, ome, isOpenModalCadastro) => {
    //     cadastrarLicenca(Date.parse(dtInicial), qtdDias, pessoa.pessoaId, prestador.id, parecer.id, this.props.usuario.id, ome, inputValues).then(response => {
    //         if (response.status === 201) {
    //             toast.success('Licença cadastrada com sucesso')
    //             this.BuscarLicencas(this.state.pessoa)
    //             this.setState({ hidden: '', isOpenModalCadastro: isOpenModalCadastro })
    //             this.handleLimparCamposCadastro()

    //             return true

    //         } else {
    //             toast.error('Erro ao incluir Licença')
    //             this.setState({ hidden: '', isOpenModalCadastro: isOpenModalCadastro })
    //             this.handleLimparCamposCadastro()
    //             return false;

    //         }


    //     })

    // }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    return (
        <Container >
            <div className="Spacer"></div>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}

                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Cadastro De Equipamentos" {...a11yProps(0)} />
                    <Tab label="Entradas e Saídas" {...a11yProps(0)} />
                    <Tab label="Buscar Equipamentos" {...a11yProps(3)} />
                    <Tab label="Todos os Equipamentos" {...a11yProps(3)} />
                    <Tab label="Testa Hugo" {...a11yProps(0)} />
                    

                </Tabs>
                <TabPanel value={value} index={0}>
                    <TelaDeCadastroEquipamentos />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EntradasESaidas />
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <TelaBuscaEquipamentos/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <TeladeBuscaTodosEquipamentos />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TelaCadastro01Transfusional />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <CadastroSolicitacaoTransfusional />
                </TabPanel>
            </Box>

            {/* <Card spacing={2} display="flex" alignItems="center">
                <CardHeader
                    title="Cadastro de Equipamento"
                />
                <Grid container spacing={1} display="flex" >
                    <Grid item xs={12} sm={6} display="flex" >
                        <TextField
                            id="outlined-required"
                            label="Required"
                            onChange={handleMaquina}
                        />/Button
                        <Button variant="contained" onClick={handleBuscarMaquina}>Buscar<> */}
            {/* <TextFieldAutocomplete id="paciente" value={''} label="Paciente" actionFilter={''} actionChangeOption={''} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} /> */}
            {/* </Grid>
                    <div className="Spacer"></div>
                    <Grid container spacing={1}>

                        <span className="fabButton ">
                            <Tooltip title="Adicionar uma Nova Licença" placement="bottom-end">
                                <Fab size="small" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={handleAdicionarMaquina}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </span>
                    </Grid>
                </Grid>
            </Card > */}
            {/* 
                <Collapse in={this.state.hidden}>
                    <Grid container xs={12}>
                        <div className="Spacer"></div>
                        <div>
                            <Typography color="textSecondary" variant="body1" gutterBottom>
                                <span className="TitlePage">Evoluções</span>
                            </Typography>
                        </div>
                        <Grid item xs={12}>
                            <div >
                                <List dense="true">
                                    <span className="liWithoutPadding">
                                        <CustomizedTables
                                            columns={
                                                [
                                                    { value: 'Matrícula' },
                                                    { value: 'Nome' },
                                                    { value: 'Data de Inicio' },
                                                    { value: 'Qtd Dias' },
                                                    { value: 'Resultado' },
                                                    { value: 'Ações' },
                                                ]}
                                            handleRowsPerPage={this.handleRowsPerPage}
                                            handleChangePaginacao={this.handleChangePaginacao}
                                            pageDados={this.state.listaLicencas}
                                            rows={
                                                this.state.listaLicencas.content && this.state.listaLicencas.content.length ?
                                                    this.state.listaLicencas.content.map((item) => {
                                                        return [
                                                            { value: item.pessoa.matricula },
                                                            { value: item.pessoa.nome },
                                                            { value: item.dataInicio },
                                                            { value: item.qtdDias },
                                                            { value: item.homologacao },
                                                            { isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'detalhes', event: () => { this.handleClickOpenDetalhes(item) } }, { colorButton: 'BgGreen', icon: 'impressao', event: () => { this.handleClickOpenDetalhes(item) } }] },
                                                        ]
                                                    }) : []
                                            }
                                        />


                                    </span>
                                </List>
                            </div>
                            <div className="Spacer"></div>
                            <div className="Spacer"></div>
                            <div className="Spacer"></div>

                        </Grid>

                    </Grid>
                </Collapse> */}
            <span className="liWithoutPadding"></span>


            {/* <Box>
                    <DialogHeaderFooter
                        title="Detalhes da licença"
                        idComponent="referencia-familiar"
                        handleClickClose={this.handleClickCloseDetalhes}
                        isOpen={this.state.isOpenModalDetalhes}
                        direction="row"
                        closeButton
                        alignItems="center"
                        maxWidth="md"
                        children={
                            <Grid display="flex" container alignItems="center" >
                                {
                                    this.state.objItem.map((item) => {
                                        return <Grid container key={item.id}>
                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={6} >
                                                    <TextField id="outlined-basic" label="Titular" value={item.pessoa.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={3} >
                                                    <TextField id="outlined-basic" label="Matricula" value={item.pessoa.matricula} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={3} >
                                                    <TextField id="outlined-basic" label="Corporação" value={item.pessoa.corporacao == 6 ? "PMPE" : "CBPE"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                            </Grid>
                                            <div className="Spacer"></div>
                                            <Typography color="textSecondary" variant="body1" gutterBottom>
                                                <span className="TitlePage">Prestador</span>
                                            </Typography>

                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={2} >
                                                    <TextField id="outlined-basic" value={this.state.conselho} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={2} >
                                                    <TextField id="outlined-basic" value={this.state.uf} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={2} >
                                                    <TextField id="outlined-basic" label="N° Conselho" value={item.prestador.numeroConselho} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={6} >
                                                    {habilitaCompo ? <TextFieldAutocomplete e label="Prestador" value={item.prestador.nome} actionFilter={ListarPrestador} actionChangeOption={this.changePrestador} getOptionLabel={(option) => option.numeroConselho + ' - ' + option.nome} error={this.state.prestadorError} />
                                                        : <TextField id="outlined-basic" label="Prestador" value={item.prestador.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />}
                                                </Grid>

                                            </Grid>
                                            <div className="Spacer"></div>
                                            <Typography color="textSecondary" variant="body1" gutterBottom>
                                                <span className="TitlePage">Quadro Clinico</span>
                                            </Typography>

                                            <Grid container spacing={1}>
                                                {item.cids.map((item) => {

                                                    return <Grid item xs={12} sm={4} >{
                                                        habilitaCompo ? <TextFieldAutocomplete label="CID" value={this.state.cid} actionFilter={ListarCid} actionChangeOption={this.handleChangecid} getOptionLabel={(option) => option.id + ' - ' + option.descricao} filterOptions={(options, object) => options.filter((item) => item.id.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.descricao.toString().includes(object.inputValue))} error={this.state.cidError} /> :
                                                            <TextField id="outlined-basic" label="CID" value={item.id + "-" + item.descricao} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                    }
                                                    </Grid>
                                                })}

                                                <Grid item xs={12} sm={6} >
                                                    {habilitaCompo ? <TextFieldAutocomplete label="Parecer" value={this.state.parecer} actionFilter={ListarParecer} actionChangeOption={this.changeParecer} getOptionLabel={(option) => option.parecer} filterOptions={(options, object) => options.filter((item) => item.parecer.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} error={this.state.parecerError} /> :
                                                        <TextField id="outlined-basic" label="Parecer" value={item.parecer.parecer} tooltip={item.parecer.parecer} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />}
                                                </Grid>

                                                <Grid item xs={12} sm={2} >
                                                    <TextField id="outlined-basic" label="Homologação" value={item.homologacao === null ? 'Não homologado' : item.homologacao} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                                </Grid>

                                            </Grid>
                                            <div className="Spacer"></div>
                                            <Typography color="textSecondary" variant="body1" gutterBottom>
                                                <span className="TitlePage">Périodo Da licença</span>
                                            </Typography>

                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={2} >
                                                    {habilitaCompo ? <DateInput label="Data inicial" fullWidth value={this.state.dateFrom} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} /> :
                                                        <TextField id="outlined-basic" label="Dt Inicio" value={item.dataInicio} disabled variant="outlined" placeholder="Dt inicio" fullWidth={true} margin="dense" />
                                                    }
                                                </Grid>

                                                <Grid item xs={12} sm={1} >
                                                    {habilitaCompo ? <TextField id="outlined-basic" fullWidth value={this.state.qtdDias} label="Qtd Dias" onChange={this.handleQtdDias} variant="outlined" placeholder="Qtd Dias" margin="dense" error={this.state.qtdDiasError} /> :
                                                        <TextField id="outlined-basic" label="Qtd Dias" value={item.qtdDias} disabled variant="outlined" placeholder="Qtd dias" fullWidth={true} margin="dense" />
                                                    }
                                                </Grid>

                                                <Grid item xs={12} sm={2} className={item.dataHomologacao === null ? 'hidden' : ''} >
                                                    <TextField id="outlined-basic" label="Dt Homolo" value={item.dataHomologacao} disabled variant="outlined" placeholder="Dt Homo" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={2} >
                                                    <TextField id="outlined-basic" label="Dt Final" disabled={true} value={this.state.dtFinal} variant="outlined" placeholder="Dt Final" fullWidth={true} margin="dense" />
                                                </Grid>

                                                <Grid item xs={12} sm={5} >
                                                    <TextField id="outlined-basic" label="Batalhão" value={item.omeCadastro === null ? '' : item.omeCadastro.descricao} disabled variant="outlined" placeholder="Batahlão" fullWidth={true} margin="dense" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    })
                                }
                            </Grid>
                        }
                        footer={
                            <Box display="flex">
                                <Box m={1} className={this.state.SalvarVisivel ? "ButtonPrimary" : "hidden"}>
                                    <Button onClick={this.handleClickSalvarLicencaAlterada} variant="contained" color="success">Salvar</Button>
                                </Box>
                                <Box m={1} className={this.state.visivel ? "ButtonPrimary" : "hidden"}>
                                    <Button onClick={this.handleClickEditarLicenca} variant="outlined" color="success">Editar</Button>
                                </Box>
                                <Box m={1} className={this.state.fecharVisivel ? "fabButton" : "hidden"}>
                                    <Button onClick={this.handleClickFecharEdicaoLicenca} variant="outlined" color="success">Fechar</Button>
                                </Box>
                            </Box>
                        }
                    />
                </Box>
                <Box >
                    <DialogHeaderFooter
                        title="Cadastro de Licenças"
                        idComponent="referencia-familiar"
                        handleClickClose={this.handleClickCloseCadastro}
                        isOpen={this.state.isOpenModalCadastro}
                        direction="row"
                        closeButton
                        alignItems="center"
                        maxWidth="md"
                        children={
                            <Grid display="flex" container  spacing={1} alignItems="center" >
                             
                                    <Grid item xs={12} sm={12}>
                                        <TextFieldAutocomplete label="Paciente" value={this.state.pessoa} actionFilter={filtrarPessoa} actionChangeOption={this.changePessoa} getOptionLabel={(option) => option ? option.matricula + ' - ' + option.nome : ""} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} error={this.state.pessoaError} />
                                    </Grid>
                               
                                <Grid item xs={12} sm={12} >
                                    <TextFieldAutocomplete label="CID" value={this.state.cid} actionFilter={ListarCid} actionChangeOption={this.handleChangecid} getOptionLabel={(option) => option.id + ' - ' + option.descricao} filterOptions={(options, object) => options.filter((item) => item.id.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.descricao.toString().includes(object.inputValue))} error={this.state.cidError} />
                                </Grid>
                                <Grid item xs={12} sm={12}>

                                    {this.state.inputValues.map((input) => {
                                        return (
                                            <Grid container  >
                                                <FormControl fullWidth>
                                                    <Grid item xs={12} sm={10}>
                                                        <TextField id="outlined-basic" label="" value={input.abreviacao} disabled variant="outlined" placeholder="" fullWidth={true} margin="dense" />
                                                    </Grid>
                                                    <Box item xs={12} sm={2} >
                                                        <ListItemSecondaryAction >
                                                            <IconButton
                                                                aria-label="add to favorites"
                                                                onClick={() => this.handleDeleteItem(this.state.inputValues.indexOf(input))}
                                                                size="Small">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </Box>
                                                </FormControl>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <Grid container>

                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldAutocomplete e label="Prestador" value={this.state.prestador} actionFilter={ListarPrestador} actionChangeOption={this.changePrestador} getOptionLabel={(option) => option.numeroConselho + ' - ' + option.nome} error={this.state.prestadorError} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}  >
                                        <TextFieldAutocomplete label="Parecer" value={this.state.parecer} actionFilter={ListarParecer} actionChangeOption={this.changeParecer} getOptionLabel={(option) => option.parecer} filterOptions={(options, object) => options.filter((item) => item.parecer.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} error={this.state.parecerError} />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={4}  md={4}sx={{width:100}}>
                                        <DateInput sx={{width:100}}label="Data inicial" fullWidth value={this.state.dateFrom} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} />
                                    </Grid>


                                    <Grid item xs={12} sm={4}md={4} >
                                        <TextField id="outlined-basic" size='small' fullWidth label="Qtd Dias" value={this.state.qtdDias} onChange={this.handleQtdDias} variant="outlined" placeholder="Qtd Dias"  error={this.state.qtdDiasError} />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>

                                        {textFieldTroca ? <TextFieldAutocomplete label="Ome" value={this.state.ome} actionFilter={listaOme} actionChangeOption={this.changeOme} getOptionLabel={(option) => option ? option.descricao : ""} error={this.state.omeError} />
                                            : <TextField disabled fullWidth label="Ome" id="standard-disabled" variant="outlined" size='small' defaultValue={this.props.usuario.ome == null ? '' : this.props.usuario.ome.descricao} />}
                                    </Grid>

                                </Grid>
                            </Grid>
                        }
                        footer={
                            <Box display="flex">
                                <Box m={1} className="ButtonPrimary" >
                                    <Button onClick={this.handleClickSalvarENovo} variant="outlined" color="success">Salvar e Continuar</Button>
                                </Box>
                                <Box m={1} className="fabButton " >
                                    <Button onClick={this.handleSalvarCadastro} variant="outlined" color="primary">Salvar</Button>
                                </Box>
                            </Box>
                        }
                    />
                </Box> */}
        </Container>
    );
}



const mapStateToProps = state => ({ open: state.modal.open, usuario: state.usuario, modal: state.modal })
const mapDispatchToProps = dispatch => bindActionCreators({ openModal, changeModal, fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastroDeEquipamento)