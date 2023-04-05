import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, IconButton, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Table from '../../components/table/table';
import { connect } from "react-redux";
import TextFieldAutocomplete from '../../components/general/autocomplete'
import MuiAlert from '@mui/material/Alert';
import { bindActionCreators } from 'redux';
import makeStyles from '@mui/styles/makeStyles';
import { fetchBackdrop } from '../../actions/geral/actions';;
import { toast } from 'react-toastify';
import CustomizedTables from '../../components/general/CustomizedTables'
import moment from 'moment'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TableEscala from './TabelaExibicaoEscalas';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import ModalAtualizaExames from "./ModalAtualizarExames";
import { buscarEscalasPorId, buscarTodasAsEscalas } from './action.js';
import { buscarAgendasPorPrestador } from './action.js';
import ModalDetalhesAgenda from './ModalDetalhesAgenda';
// import ModalAtualizaExames from "./ModalAtualizarExames";
import { imprimirExameAgenciaTransfusional } from './action.js';
import VerticalTabs from './tabDetalhesAgenda';
import { width } from '@mui/system';
moment.locale('en')
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const VisualizarExames = (props) => {



    const classes = useStyles();
    const [pageData, setPageData] = useState([])
    // const [any, forceUpdate] = useReducer(paciente => setPaciente(paciente));
    // const [exameBusca, setExameBusca] = useState(null)
    const [prestadorId, setPrestadorId] = useState(null)
    const [exames, setExames] = useState([])
    const [gpSanguineo, setGpSanguineo] = useState('')
    const [LiberarTab, setLiberarTab] = useState(false)
    const [rhd, setRhd] = useState('')
    const [combDireto, setCombDireto] = useState('')
    const [combIndireto, setCombIndireto] = useState('')
    const [exibirExame, setExibirExame] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [atualiza, setAtualiza] = useState(false)
    const [exammeAtualiza, setExammeAtualiza] = useState({})
    const [value, setValue] = React.useState(0);
    const [agendas, setAgendas] = useState([])
    const [escala, setEscala] = useState([])
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

    const closeFunction = (e) => {
        setModalOpen(e)
        handleChangePage()

    }

    useEffect(() => {
        handleChangePage();
        console.log("inicio");
    }, [])

    useEffect(() => {
        if (value === 0) {
            setLiberarTab(false)
        }
    }, [value])
    // const changeSalvar = () => {
    //     handleChangePage()
    // }

    // const closeFunction = (e) => {
    //     setModalOpen(e)
    //     handleChangePage()

    // }

    // const handleAtualizaExame = async (e) => {
    //     // console.log(paciente)
    //     // console.log(e)
    //     if (e) {
    //         console.log(paciente)
    //         console.log(e)
    //         ChangePessoa()
    //     }
    // }


    // const imprimirExame = async (id) => {
    //     props.fetchBackdrop('BACKDROP_FETCHED', true);
    //     await imprimirExameAgenciaTransfusional(id)
    //     props.fetchBackdrop('BACKDROP_FETCHED', false);
    // }

    // const imprimirAcaoEditar = (s) => {
    //     console.log(props.usuario)
    //     let editar = {};
    //     props.usuario.perfis?.map((item) => {
    //         console.log(item.id)
    //         if (item.id == 113 || item.id == 5) {
    //             console.log("Entrei")
    //             editar = {
    //                 title: 'editar', description: 'Editar Exame', color: 'BgGreen', action: async () => {
    //                     setModalOpen(true)
    //                     setExammeAtualiza(s)
    //                 }
    //             }

    //         }

    //     })
    //     console.log(editar)
    //     return editar

    // }

    const handleChangePage = async (page) => {
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let result = [];
        let dados = await buscarTodasAsEscalas();
        console.log(dados);
        dados?.content?.forEach((s, index) => {
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
                {
                    title: 'mais_detalhes', description: 'Detalhes da Escala', color: 'BgGreen', action: async () => {

                    }

                },
                {
                    title: 'detalhes_agenda', description: 'Detalhes das Agendas', color: 'BgRed', action: async () => {
                        //  console.log(s.prestador.id),
                        //  console.log("Entrei")
                        // setModalOpen(true)
                        // setPrestadorId(s.prestador.id);
                        props.fetchBackdrop('BACKDROP_FETCHED', true);
                        let agenda = await buscarAgendasPorPrestador(s.prestador.id)
                        let escala = await buscarEscalasPorId(s.escala.id)
                    
                        if (agenda.status === 200) {
                            setAgendas(agenda)
                            setValue(1)
                            setLiberarTab(true)
                            setEscala(escala)
                        } else {
                            toast.warn("Problema ao buscar Agendas para este prestador.")
                        }
                        props.fetchBackdrop('BACKDROP_FETCHED', false);


                    }

                },



            ];
            const tmp = [
                s.escala.id,
                s.especialidade.descricao,
                s.prestador.nome,
                s.prestador.numeroConselho,
                acoes,
            ];
            result.push(tmp);
        });

        const ntp = {
            totalElements: dados?.totalElements,
            totalPages: dados?.totalPages,
            pageNumber: dados?.pageable?.pageNumber,
            pageSize: dados?.pageable?.pageSize,
            first: dados?.first,
            last: dados?.last
        }
        setExibirExame(true)
        setTablePagination(ntp);
        setExames(result);
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }



    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };


    return (

        <Container>

            <Card>
                <CardHeader
                    title="Exames Cadastrados"
                />
                <CardContent>

                    <Grid container spacing={1} display="flex" >
                        {/* <Grid item xs={12} sm={6}  >
                            <TextFieldAutocomplete id="Nome/Matricula" value={''} label="Nome ou Matricula" actionFilter={BuscarPessoa} actionChangeOption={ChangePessoa} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid> */}


                        <Grid item xs={12} md={4}  >
                            <Button variant="contained" color="secondary" fullWidth onClick={""}>
                                Buscar Exame
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div className="Spacer"></div>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Agendas" {...a11yProps(1)} />
                        {LiberarTab && <Tab label={   
                             <span>
                                {"Detalhes da Agenda"}
                                <IconButton size="small" component="span" onClick={() => { setValue(0) }}>
                                    <CloseIcon sx={{ width:16, height:16 }}/>
                                </IconButton>
                            </span>} {...a11yProps(1)} />}
                        {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableEscala tablePagination={tablePagination} exibirExame={exibirExame} exames={exames} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <VerticalTabs agendas={agendas} escalas={escala} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>


        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VisualizarExames)
