import {
    Button,
    Collapse,
    Container,
    Card,
    createTheme,
    Box,
    ThemeProvider,
    StyledEngineProvider,
    Grid,
    adaptV4Theme,
} from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import makeStyles from '@mui/styles/makeStyles';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { buscarVeiculosPelaPlaca } from './action.js'
import { registrarEntradaDeveiculo } from './action.js'
import { connect } from "react-redux";
import { buscarTodosRegistrosDeEntrada } from './action.js'
import { toast } from 'react-toastify';
import moment from 'moment'
import "./estilo.css"
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work
moment.locale('pt')
import { green } from "@mui/material/colors";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

const ModalAutorizaVeiculo = (props) => {

    const { validarVeiculo, setModalOpen, setValidarVeiculo } = props;
    console.log(validarVeiculo)
    const classes = useStyles();
    // const [listaVeiculos, setListaVeiculos] = useState([]);
    // const [nome, setNome] = useState('');
    // const [setor, setSetor] = useState('');
    // const [marca, setMarca] = useState('');
    // const [modelo, setModelo] = useState('');
    // const [cor, setCor] = useState('');
    const [placa, setPlaca] = useState(null);
    // const [isOpenModalVeiculo, setIsOpenModalVeiculo] = useState(false);
    // const [isCloseModalVeiculo, setIsCloseModalVeiculo] = useState(false);



    const liberarEntrada = async () => {
        const payload = {
            dataEntrada: moment().format('YYYY-MM-DD HH:mm:ss'),
            situacaoEntrada: "E",
            cadastroCarros: {
                id: validarVeiculo.id
            }
        }
    

        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await registrarEntradaDeveiculo(payload)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        console.log(response)
        if (response.status === 201) {
            toast.success("Entrada Registrada")
            let veiculos = await buscarTodosRegistrosDeEntrada()
            setValidarVeiculo(veiculos)
            setModalOpen(false)
            
        }


    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const buscarVeiculo = async () => {

        if (placa != null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await buscarVeiculosPelaPlaca(placa)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            if (response.status == 200) {
                setValidarVeiculo(response.data)
                setIsOpenModalVeiculo(true)
            }
        } else {
            toast.warning("Informe uma placa antes de buscar")
        }

    }
    const theme = createTheme(adaptV4Theme({
        palette: {
            primary: {
                main: green[600],
            },
        },
    }));
    return (

        <Container>


            <Box>
                <DialogHeaderFooter
                    title="Veículo Cadastrado"
                    idComponent="referencia-familiar"
                    isOpen
                    handleClose={() => setModalOpen(false)}
                    // title="Revalidar exame"
                    cancelAction={() => setModalOpen(false)}
                    okLabel="Liberar Entrada"
                    maxWidth="sm"
                    direction="row"
                  
                    children={
                        <>
                            <Grid display="flex" container alignItems="center" spacing={2} >
                                 {validarVeiculo && validarVeiculo.length ?
                                    validarVeiculo.map(item => { 
                                      
                                            return(
                                            <>
                                                <Grid item xs={12} md={12} >
                                                    <TextField
                                                        label="Nome do proprietário"
                                                        id="outlined-start-adornment"
                                                        value={item.nome}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={7} >
                                                    <TextField
                                                        label="Seto"
                                                        disabled
                                                        id="outlined-start-adornment"
                                                        value={item.setor}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={5} >
                                                    <TextField
                                                        label="marca"
                                                        disabled
                                                        id="outlined-start-adornment"
                                                        value={item.marca}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Modelo"
                                                        disabled
                                                        id="outlined-start-adornment"
                                                        value={item.modelo}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Cor"
                                                        disabled
                                                        id="outlined-start-adornment"
                                                        value={item.cor}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Placa"
                                                        disabled
                                                        id="outlined-start-adornment"
                                                        value={item.placa}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>

                                            </>)
                                       
                                     }) : [] 

                                 } 

                            </Grid>
                            <div className="Spacer"></div>

                            <Grid container display="flex" justifyContent="center">
                                {/* <ThemeProvider theme={theme}>
                                    <Box m={0.5}>
                                        <Button
                                            onClick={liberarEntrada}
                                            variant="outlined"
                                            color="primary"
                                        >Registrar Entrada</Button>
                                    </Box>
    
                                </ThemeProvider> */}
                              
                            </Grid>
                        </>
                    }
                    footer={

                        <Box display="flex">

                            <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="success" onClick={() => setModalOpen(false)}>Fechar</Button>
                            </Box>
                        </Box>
                    }
                />
            </Box>
        </Container>


    )


}
const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAutorizaVeiculo)
