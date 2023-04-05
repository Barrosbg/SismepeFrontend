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
import { registrarSaidaDeveiculo } from './action.js'
import { buscarTodosRegistrosDeEntrada } from './action.js'
import { connect } from "react-redux";

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

const ModalSaidaDeVeiculo = (props) => {

    const { validarVeiculo, setModalOpenSaida, setValidarVeiculo } = props;
    console.log("Saida" ,validarVeiculo)
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

console.log(validarVeiculo)

    const registrarSaida = async () => {
        console.log(validarVeiculo)
        const payload = {
            cadastro_carros: {
                id: validarVeiculo.cadastroCarros.id
            }
        }
     

        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await registrarSaidaDeveiculo(validarVeiculo.id, payload)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        
        if (response.status === 200) {
            toast.success("Saída  Registrada")
            setValidarVeiculo(true)
            setModalOpenSaida(false)

        }


    };


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
                    title="Saída de Veículo"
                    idComponent="referencia-familiar"
                    isOpen
                    handleClose={() => setModalOpenSaida(false)}
                    // title="Revalidar exame"
                    cancelAction={() => setModalOpenSaida(false)}
                    okLabel="Liberar Entrada"
                    maxWidth="sm"
                    direction="row"

                    children={
                        <>
                            <Grid display="flex" container alignItems="center" spacing={2} >
                                {validarVeiculo && validarVeiculo.length ?
                                  
                                  validarVeiculo.cadastroCarros.map(item =>{
                                    <>
                                    <Grid item xs={12} md={12} sm={12} >
                                        <TextField
                                            label="Nome do proprietário"
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ? item.cadastroCarros.nome.toUpperCase(): null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            label="Cor"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ?item.cadastroCarros.telefone : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <TextField
                                            label="Seto"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ?item.cadastroCarros.setor.toUpperCase() : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            label="marca"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ?item.cadastroCarros.marca.toUpperCase() : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2} >
                                        <TextField
                                            label="Modelo"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ?item.cadastroCarros.modelo.toUpperCase() : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            label="Placa"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ?item.cadastroCarros.placa.toUpperCase() : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <TextField
                                            label="Situação"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={item.cadastroCarros ? item.situacaoEntrada === "E" ? "SAIDA" : "ENTRADA" : null}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} >
                                        <TextField
                                            label="Hora Saída"
                                            disabled
                                            id="outlined-start-adornment"
                                            value={moment().format('YYYY-MM-DD HH:mm:ss')}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>

                                </>
                                  })
                                   
                                      
            
                                            
                                        
                                    : [] }

                                

                            </Grid>
                            <div className="Spacer"></div>

                            <Grid container display="flex" justifyContent="center">

                                <Box m={0.5}>
                                    <Button
                                        onClick={registrarSaida}
                                        variant="outlined"
                                        color="secondary"
                                    >Registrar Saída</Button>
                                </Box>



                            </Grid>
                        </>
                    }
                    footer={

                        <Box display="flex">

                            <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="success" onClick={() => setModalOpenSaida(false)}>Fechar</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSaidaDeVeiculo)
