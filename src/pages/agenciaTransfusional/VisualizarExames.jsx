import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Table from '../../components/table/table';
import { connect } from "react-redux";
import TextFieldAutocomplete from '../../components/general/autocomplete'
import MuiAlert from '@mui/material/Alert';
import { bindActionCreators } from 'redux';
import makeStyles from '@mui/styles/makeStyles';
import { fetchBackdrop } from '../../actions/geral/actions';
import { BuscarPessoa } from './action.js';
import { buscarExames } from './action.js';
import { toast } from 'react-toastify';
import { deletarExame } from './action.js';
import CustomizedTables from '../../components/general/CustomizedTables'
import moment from 'moment'
import ModalAtualizaExames from "./ModalAtualizarExames";
import { imprimirExameAgenciaTransfusional } from './action.js';
moment.locale('en')
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const VisualizarExames = (props) => {



    const classes = useStyles();
    const [paciente, setPaciente] = useState(null)
    // const [any, forceUpdate] = useReducer(paciente => setPaciente(paciente));
    // const [exameBusca, setExameBusca] = useState(null)
    const [medico, setMedico] = useState({})
    const [exames, setExames] = useState([])
    const [gpSanguineo, setGpSanguineo] = useState('')
    const [rhd, setRhd] = useState('')
    const [combDireto, setCombDireto] = useState('')
    const [combIndireto, setCombIndireto] = useState('')
    const [exibirExame, setExibirExame] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [atualiza, setAtualiza] = useState(false)
    const [exammeAtualiza, setExammeAtualiza] = useState({})
    const [tablePagination, setTablePagination] = useState({
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
        first: false,
        last: false
    });

    const ChangePessoa = (e) => {
        if (e != null) {
            setPaciente(e)
        } else {
            setExames([])
            setExibirExame(false)
            console.log("teste")
        }


    }

    const changeSalvar = () => {
        handleChangePage()
    }

    const closeFunction = (e) => {
        setModalOpen(e)
        handleChangePage()

    }

    const handleAtualizaExame = async (e) => {
        // console.log(paciente)
        // console.log(e)
        if (e) {
            console.log(paciente)
            console.log(e)
            ChangePessoa()
        }
    }


    const imprimirExame = async (id) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        await imprimirExameAgenciaTransfusional(id)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
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

    const handleChangePage = async () => {
        console.log()
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let result = [];

        let exame = await buscarExames(paciente?.id);
        exame?.data?.forEach((s, index) => {
            let acoes = [

                // {
                //     title: 'deletar', description: 'Deletar Exame', color: 'BgRed', action: async () => {
                //         const delet = await deletarExame(s.id)
                //         if (delet.status == 204) {
                //             toast.success("Exame Deletado com sucesso")
                //             handleChangePage();
                //         } else {
                //             toast.error("Problema ao deletar Exame")
                //         }
                //     }
                // },
                // {
                    // title: 'editar', description: 'Editar Exame', color: 'BgGreen', action: async () => {
                    //     props.usuario.perfis?.map((item) => {
                    //         console.log(item.id)
                    //         if (item.id == 113 || item.id == 5) {
                    //             console.log("Entrei")
                    //             setModalOpen(true)
                    //             setExammeAtualiza(s)
                    //         }else{

                    //         }
                    //     })
                    // }

                   
                // },
                imprimirAcaoEditar(s),
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
        });

        const ntp = {
            // totalElements: exame.data?.totalElements,
            // totalPages: exame.data?.totalPages,
            // pageNumber: exame.data?.pageable?.pageNumber,
            // pageSize: exame.data?.pageable?.pageSize,
            // first: exame.data?.first,
            // last: exame.data?.last
        }
        setExibirExame(true)
        setTablePagination(ntp);
        setExames(result);
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }



    return (

        <Container>

            <Card>
                <CardHeader
                    title="Exames Cadastrados"
                />
                <CardContent>

                    <Grid container spacing={1} display="flex" >
                        <Grid item xs={12} sm={6} mt={1} >
                            <TextFieldAutocomplete id="Nome/Matricula" value={paciente} label="Nome ou Matricula" actionFilter={BuscarPessoa} actionChangeOption={ChangePessoa} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid>


                        <Grid item xs={12} md={4}  >
                            <Button variant="contained" color="secondary" fullWidth onClick={changeSalvar}>
                                Buscar Exame
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div className="Spacer"></div>
            <Collapse in={exibirExame}>
                <Grid container >
                    <Table
                        rowsPerPage={''}
                        pageNumber={''}
                        totalElements={''}
                        totalPages={''}
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
            </Collapse>




        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VisualizarExames)
