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

const ModalQtdVeiculo = (props) => {

    const { setQtdVagas, setModalQtdVeiculo,handleRegistraTotal } = props;
    const classes = useStyles();
    // const [qtdVagas, setPlaca] = useState(null);

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
                    title="Vagas Ocupadas"
                    idComponent="referencia-familiar"
                    isOpen
                    handleClose={() => setModalQtdVeiculo(false)}
                    // title="Revalidar exame"
                    cancelAction={() => setModalQtdVeiculo(false)}
                    okLabel="Liberar Entrada"
                    maxWidth="sm"
                    direction="row"
                  
                    children={
                        <>
                            <Grid display="flex" container alignItems="center" spacing={2} >
                        
                                                <Grid item xs={12} md={12} >
                                                    <TextField
                                                        label="Número de vagas Ocupadas"
                                                        id="outlined-start-adornment"
                                                        type="number"
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                              
                                                        onChange={(e)=>setQtdVagas(e.target.value)}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        
                                                    />
                                                </Grid>
                                                
                                

                            </Grid>
                            <div className="Spacer"></div>

                            <Grid container display="flex" justifyContent="center">
                                <StyledEngineProvider injectFirst>
                                    <ThemeProvider theme={theme}>
                                        <Box m={0.5}>
                                            <Button
                                                onClick={()=>handleRegistraTotal()}
                                                variant="outlined"
                                                color="primary"
                                            >Registrar Vagas Ocupadas</Button>
                                        </Box>
        
                                    </ThemeProvider>
                                </StyledEngineProvider>
                              
                            </Grid>
                        </>
                    }
                    footer={

                        <Box display="flex">

                            {/* <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="success" onClick={() => setModalQtdVeiculo(false)}>Fechar</Button>
                            </Box> */}
                        </Box>
                    }
                />
            </Box>
        </Container>
    );


}
const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalQtdVeiculo)
