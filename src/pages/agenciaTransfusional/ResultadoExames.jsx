
import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { connect } from "react-redux";
import TextFieldAutocomplete from '../../components/general/autocomplete'
import { bindActionCreators } from 'redux';
import Table from '../../components/table/table';
import { fetchBackdrop, openModal } from '../../actions/geral/actions';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from "@mui/material";
import Select from '@mui/material/Select';
import { filtrarPaciente } from './action.js';
import { BuscarPessoa } from './action.js';
import { imprimirExameAgenciaTransfusional } from './action.js';
import { buscarTodosExames } from './action.js';
import { ListarPrestador } from './action.js';
import { deletarExame } from './action.js';
import { salvarExame } from './action.js';
import { toDateString } from './action.js';
import { formatOptionBeneficiario, formatOptionCid, formatOptionMedico } from "../../services/filterFormatters";
import moment from 'moment'
import ModalAtualizaExames from "./ModalAtualizarExames";
import InputSelect from "../../components/general/select/select";
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import { toast } from 'react-toastify';
import id from 'date-fns/esm/locale/id/index.js';
moment.locale('pt')
const useStyles = makeStyles((theme) => ({
    Collapse: {
        width: "100vh"
    }
}));

const Modal = withOkAndCancel(DialogHeaderFooter);


const IncluirResultado = (props) => {




    const [paciente, setPaciente] = useState({})
    const [medico, setMedico] = useState({})
    const [exames, setExames] = useState([])
    const [gpSanguineo, setGpSanguineo] = useState('')
    const [rhd, setRhd] = useState('')
    const [combDireto, setCombDireto] = useState('')
    const [combIndireto, setCombIndireto] = useState('')
    const [liberar, setLiberar] = useState(true)
    const [LimparCampos, setLimparCampos] = useState(true)
    const [open, setOpen] = useState(false)
    const [exameAtualizado, setExameAtualizado] = useState(null)
    const [exammeAtualiza, setExammeAtualiza] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [atualiza, setAtualiza] = useState(false)
    const [tablePagination, setTablePagination] = useState({
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
        first: false,
        last: false
    });

    useEffect(async () => {
        handleChangePage();

    }, []);

    const classes = useStyles();

    const salvarPerfil = () => {
        localStorage.setItem('perfil', JSON.stringify(props.usuario.perfis))
    }

    const limparCampos = () => {
        setPaciente({});
        setMedico({})
        setRhd('')
        setGpSanguineo('')
        setCombDireto('')
        setCombIndireto('')
    }

    const imprimirAcaoEditar = (s) => {
        console.log(props.usuario)
        let editar = {};
        props.usuario.perfis?.map((item) => {
            console.log(item.id)
            if (item.id == 113 || item.id == 5) {
                console.log("Entrei")
                editar = {
                    title: 'editar', description: 'Editar Exame', color: 'BgGreen', action: async () => {
                        setModalOpen(true)
                        setExammeAtualiza(s)
                    }
                }

            }

        })
        console.log(editar)
        return editar

    }

    const imprimirExame = async (id) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        await imprimirExameAgenciaTransfusional(id)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }
    const handleChangePage = async (page) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let result = [];
        let exame = await buscarTodosExames(page);
        exame?.data?.forEach((s, index) => {
            let acoes = [

                // {
                //     title: 'deletar', description: 'Deletar Exame', color: 'BgRed', action: async () => {
                //      const delet =  await deletarExame(s.id)
                //      if(delet.status == 204){
                //         toast.success("Exame Deletado com sucesso")
                //         handleChangePage();
                //      }else{
                //         toast.error("Problema ao deletar Exame")
                //      }
                //     }
                // },


                // imprimirAcaoEditar(s),


                {
                    title: 'imprimir', description: 'Imprimir Exame', color: 'BgGray', action: async () => {
                        imprimirExame(s.id)
                    }
                }


            ];
            const tmp = [

                s.pessoa?.nome,
                s.prestador.pessoa?.nome,
                s.grupoSanguineo,
                s.rhd ? s.rhd == 'P' ? "POSITIVO" : "NEGATIVO" : "",
                s.comboDireto ? s.comboDireto == 'P' ? "POSITIVO" : "NEGATIVO" : "",
                s.comboIndireto ? s.comboIndireto == 'P' ? "POSITIVO" : "NEGATIVO" : "",
                s.usuarioCadastro.nome,
                moment(s.dataCadastro).format('DD/MM/yyyy '),
                acoes,
            ];
            result.push(tmp);
            console.log(acoes)
        });

        const ntp = {
            totalElements: exame.data?.totalElements,
            totalPages: exame.data?.totalPages,
            pageNumber: exame.data?.pageable?.pageNumber,
            pageSize: exame.data?.pageable?.pageSize,
            first: exame.data?.first,
            last: exame.data?.last
        }

        setTablePagination(ntp);
        setExames(result);
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    const closeFunction = (e) => {
        setModalOpen(e)
        handleChangePage()

    }
    const handleAtualizaExame = (e) => {
        console.log(e)
        // if(e){
        //     setModalOpen(false)
        //     toast.success("Exame Atualizado com sucesso!")
        // }
    }

    const handlePaciente = (e) => {
        console.log(e)
        if (e !== null) {
            setPaciente(e)
            setLiberar(false)
        } else {
            setPaciente(null)
            setLiberar(true)

        }
    }

    const handleClose = (e) => {
        console.log(e)
    }

    const enviarExames = async () => {

        const payload = {
            pessoa: {
                id: paciente.id
            },
            prestador: {
                id: medico.id
            },
            usuarioCadastro: {
                id: props.usuario?.pessoa?.id
            },
            grupoSanguineo: gpSanguineo !== '' ? gpSanguineo : null,
            rhd: rhd !== '' ? rhd : null,
            comboDireto: combDireto !== '' ? combDireto : null,
            comboIndireto: combIndireto !== '' ? combIndireto : null,
            ativo: "S"


        }
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await salvarExame(payload)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        console.log(response)
        if (response.status === 201) {
            toast.success("Exame Cadastrado com sucesso")

            limparCampos()
            setLiberar(true)
            handleChangePage()
        } else {
            toast.error("Problema ao Cadastrar Exame")
        }
    }
    const salvarExames = async () => {
     
        if(Object.keys(medico).length === 0){
            toast.warn("Um Médico precisa ser informado")
        }else{
           
            if(gpSanguineo || combDireto || combIndireto !== ''){
            
                if (gpSanguineo !== '') {
                    if (rhd !== '') {
                        enviarExames()
                        handleChangePage()
                    } else {
                        toast.warn("Fator RDH precisa ser informado")
                    }
        
                } else {
                    enviarExames()
                    handleChangePage()
                   
                }
                
                }else{
                    toast.warn("Você deve informar pelo menos uma das classificações sanguíneas")
                }
        }
        
    }

    return (
        <Container>
            <Card>
                <CardHeader
                    title="Incluir Exames"
                />
                <CardContent>

                    <Grid container spacing={1} margin="dense" display="flex"  >

                        <Grid item xs={12} sm={6}  >
                            <TextFieldAutocomplete id="paciente" label="Paciente" actionFilter={BuscarPessoa} value={paciente} actionChangeOption={(option) => { if (option) setLiberar(false); setPaciente(option) }} getOptionLabel={formatOptionBeneficiario} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid>
                        <Grid item xs={12} sm={6}  >
                            <TextFieldAutocomplete id="medico" disabled={liberar} label="Médico" actionFilter={ListarPrestador} value={medico} actionChangeOption={(medico) => { if (medico) setMedico(medico) }} getOptionLabel={formatOptionMedico} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.numeroConselho.toString().includes(object.inputValue))} />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl variant="outlined" className={''} size='small' fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Grupo Sanguíneo</InputLabel>
                                <Select
                                    native
                                    disabled={liberar}
                                    value={gpSanguineo}
                                    onChange={e => setGpSanguineo(e.target.value)}
                                    label="Grupo Sanguíneo"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={"A"}>A</option>
                                    <option value={"B"}>B</option>
                                    <option value={"A/B"}>A/B</option>
                                    <option value={"O"}>O</option>
                                </Select>
                            </FormControl>

                        </Grid>
                            <Grid item xs={12} md={3} >
                                <FormControl variant="outlined" className={''} size='small' fullWidth>
                                    <InputLabel htmlFor="outlined-age-native-simple">RhD</InputLabel>
                                    <Select
                                        native
                                        disabled={gpSanguineo == '' ? true : false}
                                        value={rhd}
                                        onChange={e => setRhd(e.target.value)}
                                        label="RhD"
                                        inputProps={{
                                            name: 'age',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={"P"}>POSITIVO</option>
                                        <option value={"N"}>NEGATIVO</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        
                        <Grid item xs={12} md={3} >
                            <FormControl variant="outlined" className={''} size='small' fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Coombs Direto</InputLabel>
                                <Select
                                    native
                                    disabled={liberar}
                                    value={combDireto}
                                    onChange={e => setCombDireto(e.target.value)}
                                    label="Coombs Direto"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={"P"}>POSITIVO</option>
                                    <option value={"N"}>NEGATIVO</option>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl variant="outlined" className={''} size='small' fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Coombs Indireto</InputLabel>
                                <Select
                                    native
                                    disabled={liberar}
                                    value={combIndireto}
                                    onChange={e => setCombIndireto(e.target.value)}
                                    label="Coombs Indireto"
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={"P"}>POSITIVO</option>
                                    <option value={"N"}>NEGATIVO</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
                            <Button disabled={liberar} variant="contained" color="secondary" fullWidth onClick={salvarExames}>
                                Salvar
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card >


            <Grid container >
                <Table
                    rowsPerPage={tablePagination.pageSize}
                    pageNumber={tablePagination.pageNumber}
                    totalElements={tablePagination.totalElements}
                    totalPages={tablePagination.totalPages}
                    changePage={handleChangePage}
                    order="desc"
                    orderBy="data"
                    headers={[
                        // { id: 'id', numeric: false, disablePadding: false, sortable: true, label: 'Id' },
                        { id: 'paciente', numeric: false, disablePadding: false, sortable: true, label: 'Paciente' },
                        { id: 'medicoSolicitante', numeric: false, disablePadding: false, sortable: true, label: 'Medico Solicitante' },
                        { id: 'grupoSanguineo', numeric: false, disablePadding: false, sortable: true, label: 'Grupo Sanguineo' },
                        { id: 'rhd', numeric: false, disablePadding: false, sortable: true, label: 'RHD' },
                        { id: 'coombsDireto', numeric: false, disablePadding: false, sortable: true, label: 'Coombs Direto' },
                        { id: 'coombsIndireto', numeric: false, disablePadding: false, sortable: true, label: 'Coombs Indireto' },
                        { id: 'usuarioCadastro', numeric: false, disablePadding: false, sortable: true, label: 'Cadastrador' },
                        { id: 'data', numeric: false, disablePadding: false, sortable: true, label: 'data' },
                        { id: 'acoes', numeric: false, disablePadding: false, sortable: false, label: 'Ações' },
                    ]}

                    rows={exames}
                />
            </Grid>

            {modalOpen && <ModalAtualizaExames setModalOpen={modalOpen} handleAtualizaExame={(e) => handleAtualizaExame(e)} closeFunction={(e) => closeFunction(e)} exameAtualizar={exammeAtualiza} />}


        </Container >
    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(IncluirResultado)
