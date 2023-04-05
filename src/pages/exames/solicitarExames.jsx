import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Card, CardContent, Box, CardHeader, Fab, Button, Container, TextField, Grid, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import { Autocomplete } from '@mui/lab';
import './index.css'
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DateInput from '../../components/general/dateInput';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { connect } from 'react-redux';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import List from '@mui/material/List';
import { Field, reduxForm } from 'redux-form'
import { BuscarPaciente } from '../../actions/Exames/actions'
import { SalvarSolicitacao } from '../../actions/Exames/actions'
import { ListaProcedimentos } from '../../actions/Exames/actions'
import { CarregarPacientesPorPrestador } from '../../actions/Exames/actions'
import { CarregarPacientesPorId } from '../../actions/Exames/actions'
import { filtrarSolicitacoes } from '../../actions/Exames/actions'
import { imprimirSolicitacaoExames } from '../../actions/Exames/actions'
import { Collapse } from '@mui/material';
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';
import CustomizedTables from '../../components/general/CustomizedTables'
import CustomList from '../../components/general/customList'
import moment from 'moment'
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work
moment.locale('pt') // without this line it didn't work

function Exames(props) {

    const [listaExames, setlistaExames] = useState([]);
    const [exame, setExame] = useState(null)
    const [paciente, setPaciente] = useState(null)
    const [pacienteBusca, setPacienteBusca] = useState(null)
    const [ExibirListaExames, setExibirListaExames] = useState(false);
    const [hidden, sethidden] = useState(false);
    const [hiddenBtnAdicionar, setHiddenBtnAdicionar] = useState(true);
    const [tipoExame, setTipoExame] = useState(null)
    const [exameDesc, setExameDesc] = useState(null)
    const [btnSolicitarExame, setBtnSolicitarExame] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState(null);
    const [dataSolicitacao, setDataSolicitacao] = useState(null);
    const [solicitacao, setSolicitacao] = useState([]);
    const [detalhes, setDetalhes] = useState([])
    const [isOpenModalAdicionarExame, setIsOpenModalAdicionarExame] = useState(false)
    const [isOpenModalDetalheExames, setIsOpenModalDetalheExames] = useState(false)
    const [erroExame, setErroExame] = useState(false);
    const [page, setPage] = useState(0);
    const [linesPerPage, setLinesPerPage] = useState(0);
    const [erroTipoExame, setErroTipoExame] = useState(false);
    const [erroPaciente, setErroPaciente] = useState(false);


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));


    useEffect(async () => {
        if(props.usuario.prestador !== null){
            setBtnSolicitarExame(true)
        }
    }, [])
    const classes = useStyles();

    const listarPacientesPorPrestador = async () => {
        const solicitacao = await CarregarPacientesPorPrestador();
        setSolicitacao(solicitacao)
    }
    const handleDateInicial = (date) => {
        setDataSolicitacao(date)
        console.log(date)
    }
    const listarSolicitacoes = async (paciente) => {
        if (pacienteBusca === null && dataSolicitacao === null) {
            toast.error("Favor informar um paciente ou uma data para pesquisa")
        } else {
            let pacienteid = pacienteBusca !== null ? pacienteBusca.id : ''
            let dtSolicitacao = dataSolicitacao !== null ?   moment(dataSolicitacao).format("YYYY-MM-DD") : ''
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let listapaciente = await filtrarSolicitacoes(pacienteid,dtSolicitacao);
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(listapaciente)
            if(listapaciente.content.length === 0){
                setlistaExames([])
                setSolicitacao([])
                setExibirListaExames(false)
                toast.warn("Nenhum registro encontrado")
            }else{
                setSolicitacao(listapaciente)
                setExibirListaExames(true)
            }
        }
    }

    const buscarSolicitacoesPaciente = async (paciente) => {
        if (paciente !== null) {
            setPacienteBusca(paciente)
        } else {
            setPacienteBusca(null)
            setPaciente(null)
            setSolicitacao([])
            setExibirListaExames(false)
            setDataSolicitacao(null)
        }
    }

    const ChangePaciente = async (paciente) => {
        if (paciente != null) {
            setErroExame(false)
            setErroPaciente(false)
            setPaciente(paciente)
            setHiddenBtnAdicionar(true)
            // let listaPacientes = await CarregarPacientesPorId(paciente.id)
            // setSolicitacao(listaPacientes)
            // setPacienteTitulo(`Exames Solicitados para: ${paciente.nome}`)
        } else {

            setPaciente(null)
        }



    }

    const changeExames = async (ex) => {

        if (ex != null) {
            setErroExame(false)
            setErroTipoExame(false)
            sethidden(true)
            if (listaExames.length === 0) {
                setExame(ex.descricao)
                setlistaExames([...listaExames, ex])
            } else {
                if (listaExames.find(el => el.id == ex.id)) {
                    toast.warn('Exame Já Adicionado!')
                    setExame('')
                } else {
                    setlistaExames([...listaExames, ex])
                    setExame('')

                    // this.setState({ inputValues: lista, cid: null })
                }
            }
        }

    }

    const handleimprimirSolicitacao = async (id) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        await imprimirSolicitacaoExames(id)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }


    const handleOpenModalAdicionarExame = () => {
        setIsOpenModalAdicionarExame(true);
        setPacienteBusca(null)
        setDataSolicitacao(null)
        console.log(props)

    }

    const handleCloseModalAdicionarExame = () => {
        setIsOpenModalAdicionarExame(false)
        zeraCampos()
    }

    const handleCloseModalDetalheExames = () => {
        setIsOpenModalDetalheExames(false);
    }

    const limparFiltro = () =>{
        zeraCampos()
        setDataSolicitacao(null)
        setPacienteBusca(null)
        setExibirListaExames(null)
        setSolicitacao([])
    }

    const zeraCampos = () => {
        setIsOpenModalAdicionarExame(false)
        setPaciente(null)
        setExameDesc(null);
        setErroExame(false)
        setErroTipoExame(false)
        setlistaExames([])
        setTipoExame(null)
        setPacienteBusca(null)
       
    }

    const handleDelete = (id) => {

        const lista = listaExames.filter(item => item.id !== id);
        setlistaExames(lista)



    }
    const geraJson = () => {
        const solicitacaoExames = {
            paciente: {
                id: paciente.id
            },
            itSolicitacoes: listaExames.map((item) => {
                return {
                    procedimento: item
                }
            }),
            tipoExame: tipoExame
        }
        return solicitacaoExames
    }

    const buscarSolicitacao = async (id) => {
        const solicitacao = await CarregarPacientesPorPrestador();
        setSolicitacao(solicitacao)
        console.log(solicitacao)
    }

    const handleAdicionarExames = async () => {
        if (paciente === null) {

            toast.error("Você precisa informar um paciente")
            setErroPaciente(true)
        } else if (listaExames.length === 0) {
            toast.error("Você precisa informar um exame")
            setErroExame(true)
        } else if (tipoExame === null) {
            toast.error("Você precisa informar o tipo do exame")
            setErroTipoExame(true)
        } else {
            const JsonExames = geraJson();
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            const resultSolicitacaoExame = await SalvarSolicitacao(JsonExames);
            if (resultSolicitacaoExame === 201) {
                toast.success("Solicitação cadastrada com Sucesso.");
                let listaPacientes = await CarregarPacientesPorId(paciente.id)
                setSolicitacao(listaPacientes)
                setExibirListaExames(true)
                zeraCampos();
            } 
            props.fetchBackdrop('BACKDROP_FETCHED', false);

        }
    }

        ;

    const changeTipoExame = (tipo) => {
        setExameDesc(tipo.target.value)
        setErroTipoExame(false)
        if (tipo.target.value === 'Eletivo') {
            setTipoExame('E')
        } else {
            setTipoExame('U')
        }

    }

    const handleFecharDetalhesExame = () => {
        setIsOpenModalDetalheExames(false)
        setDetalhes([])
    }


    const handleClickOpenDetalhes = (detalhes) => {
        setDetalhes(detalhes.itSolicitacoes)
        setIsOpenModalDetalheExames(true)
        console.log(detalhes.id)
    }

    const handleChangePaginacao = async (event, page) => {
        let dtSolicitacao = dataSolicitacao !== null ?   moment(dataSolicitacao).format("YYYY-MM-DD") : ''
        let pacienteid = pacienteBusca !== null ? pacienteBusca.id : ""
        let listaPacientes = await filtrarSolicitacoes(pacienteid, dtSolicitacao, page, linesPerPage)
        setSolicitacao(listaPacientes)
        setPage(page)

    }

    const handleRowsPerPage = async (event) => {
        let dtSolicitacao = dataSolicitacao !== null ?   moment(dataSolicitacao).format("YYYY-MM-DD") : ''
        let linesPerPage = event.target.value
        let pacienteid = pacienteBusca !== null ? pacienteBusca.id : ""
        let page = 0
        let listaPacientes = await filtrarSolicitacoes(pacienteid, dtSolicitacao, page, linesPerPage)
        setSolicitacao(listaPacientes)
        setLinesPerPage(linesPerPage)

    }
    const retornaSituacao = (situacao) => {
        switch (situacao) {
            case 'R':
                return "Solicitado";
                break;
            case 'A':
                return "Autorizado";
                break;
            case 'C':
                return "Cancelado";
                break;
            default:
                return "Aguardando Analise"
        }
    }

    const formatData = (date) => {

        let data = new Date(date + " GMT+00:00").toLocaleString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        return data
    }

    return (

        <Container>
            <Card>
                <CardHeader
                    title="Solicitação de Exames"
                />
                <CardContent>

                    <Grid container spacing={1} display="flex"  >
                        <Grid item xs={12} md={5} >
                            <TextFieldAutocomplete id="Matricula" value={pacienteBusca} label="Matricula" actionFilter={BuscarPaciente} actionChangeOption={buscarSolicitacoesPaciente} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <DateInput label="Data Da Solicitação" fullWidth value={dataSolicitacao} handleDateChange={handleDateInicial} error={''} />
                        </Grid>
                        <Grid item xs={12} sm={2} display="flex" alignItems="center">
                            <Button variant="contained" color="secondary" fullWidth onClick={listarSolicitacoes}  >Filtrar Solicitações</Button>
                        </Grid>
                        <Grid item xs={12} sm={2} display="flex" alignItems="center">
                            <Button variant="outlined" color="primary"fullWidth onClick={limparFiltro}>Limpar</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div className="Spacer"></div>

            <Collapse in={ExibirListaExames}>
               

                        <List dense="true">
                            {/* <span className="liWithoutPadding"> */}
                            <CustomizedTables
                                columns={
                                    [
                                        { size: 3, value: 'Paciente' },
                                        { size: 2, value: 'Data de Cadastro' },
                                        { size: 2, value: 'Tipo do Exame' },
                                        { size: 1, value: 'Situação' },
                                        { size: 3, value: 'Médico' },
                                        { size: 1, value: 'Detalhes' },
                                    ]}
                                // order='desc'
                                // orderBy={paciente.pessoa.nome}

                                handleRowsPerPage={handleRowsPerPage}
                                handleChangePaginacao={handleChangePaginacao}
                                pageDados={solicitacao}
                                rows={
                                    solicitacao.content && solicitacao.content.length ?
                                        solicitacao.content.map((item) => {

                                            return [
                                                { size: 3, value: item.paciente.pessoa.nome },
                                                { size: 2, value: formatData(item.dataCadastro) },
                                                { size: 2, value: item.tipoExame === 'E' ? 'Eletivo' : 'Urgente' },
                                                { size: 1, value: retornaSituacao(item.situacao) },
                                                { size: 3, value: item.prestadorSolicitante.nome },
                                                { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'detalhes', event: () => { handleClickOpenDetalhes(item) } }, { colorButton: 'BgPrimary', icon: 'impressao', event: () => { handleimprimirSolicitacao(item.id) } }] },


                                            ]
                                        }) : []
                                }
                            />


                            {/* </span> */}
                        </List>

                 
            </Collapse>
            <div className="Spacer"></div>
            <div className="Spacer"></div>
            <div className="Spacer"></div>
            <div className="Spacer"></div>
            <Collapse in={btnSolicitarExame}>
                <span className="fabButton ">
                    <Tooltip title="Solicitar um Exame" placement="bottom-end">
                        <Fab size="mediam" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={handleOpenModalAdicionarExame}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </span>

            </Collapse>
            <Box >
                <DialogHeaderFooter
                    title="Adicionar Exame"
                    idComponent="adicionar_exame"
                    handleClickClose={handleCloseModalAdicionarExame}
                    isOpen={isOpenModalAdicionarExame}
                    direction="row"
                    // closeButton
                    alignItems="center"
                    maxWidth="md"
                    children={
                        <Grid container fullWidth item xs={12} md={12}>
                            <Grid item xs={12} md={12}>
                                <TextFieldAutocomplete id="paciente" value={paciente} error={erroPaciente} label="Paciente" actionFilter={BuscarPaciente} actionChangeOption={ChangePaciente} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextFieldAutocomplete id="Exame" value={exame} label="Exame" error={erroExame} actionFilter={ListaProcedimentos} actionChangeOption={changeExames} getOptionLabel={(option) => option.descricao} />
                            </Grid>
                            <Grid item xs={12} md={4}  >

                                <FormControl variant="outlined" className={classes.formControl} margin='dense' fullWidth  error={erroTipoExame} >
                                    <InputLabel id="demo-simple-select-outlined-label"  >Tipo Exame</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={exameDesc}
                                        onChange={changeTipoExame}
                                        label={"Tipo Exame"}


                                    >
                                        <MenuItem value={'Eletivo'}>Eletivo</MenuItem>
                                        <MenuItem value={'Urgente'}>Urgência/Emergência </MenuItem>

                                    </Select>
                                </FormControl>

                            </Grid>
                            <Collapse in={hidden} number="100px">
                                <Grid container xs={12} md={12}>
                                    {listaExames.map((item, id) => {
                                        return (
                                            <div key={id} className={classes.root}>
                                                <Chip label={item.descricao} onDelete={() => handleDelete(item.id)} color="primary" />
                                            </div>
                                        )
                                    })}
                                </Grid>
                                {/* <Divider fullWidth /> */}

                            </Collapse>
                        </Grid>
                    }
                    footer={
                        <Box display="flex" spacing margin='dense'>
                            <Box m={1}  >
                                <Button onClick={handleCloseModalAdicionarExame} variant="outlined" color="secondary">Fechar</Button>
                            </Box>
                            <Box m={1} className="ButtonPrimary" >
                                <Button onClick={handleAdicionarExames} variant="outlined" color="success">Solicitar Exame</Button>
                            </Box>
                        </Box>
                    }
                />
            </Box >
            <DialogHeaderFooter
                title="Detalhes Exames"
                idComponent="detalhe_exame"
                handleClickClose={handleCloseModalDetalheExames}
                isOpen={isOpenModalDetalheExames}
                direction="row"
                // closeButton
                alignItems="center"
                maxWidth="md"
                children={
                    <Grid container fullWidth>
                        <CustomList
                             columns={
                                [
                                    {size:9, value: 'Procedimento' },
                                    {size:4, value: 'Data Solicitação' },
                                
                                ]}
                               
                                rows={
                                    detalhes.map((row) => {
                                        return [
                                            {size:9, value: row.procedimento.descricao},
                                            {size:4, value: formatData(row.dataCadastro)},
                                           
                                        ]
                                    })
                                }

                        />

                        
                        {/* <TableContainer component={Paper}>
                            <Table className={classes.table} size="mediam" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Procedimento</TableCell>
                                        <TableCell align="right">Data da Solicitação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detalhes.map((row) => (
                                        console.log(toString(row.dataCadastro)),
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.procedimento.descricao}
                                            </TableCell>
                                            <TableCell align="right">{formatData(row.dataCadastro)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                    </Grid>
                }
                footer={
                    <Box display="flex" spacing margin='dense'>
                        <Box m={1} >
                            <Button onClick={handleFecharDetalhesExame} variant="outlined" color="secondary">Fechar</Button>
                        </Box>
                    </Box>
                }
            />

        </Container >
    )
}
const mapStateToProps = state => ({ open: state.modal.open, usuario: state.usuario, modal: state.modal })
Exames = reduxForm({ form: 'forgotPasswordForm' })(Exames)
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Exames);