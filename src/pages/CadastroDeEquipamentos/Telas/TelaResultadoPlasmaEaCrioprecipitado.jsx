import { Button, Collapse, Container, Card, CardContent, Box, TextField, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../../actions/geral/actions';
import { toast } from "react-toastify";
import { CheckBox, CheckBoxOutlineBlank, Group } from "@mui/icons-material";
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';

import DateInput from '../../../components/general/dateInput';

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

const TelaResultadoPlasmaEaCrioprecipitado = (props) => {
    
    const [hemocomponentesSolicitadosMedida, setHemocomponentesSolicitadosMedida] = useState('');
    const [hemocomponentesSolicitadosQuantidade, setHemocomponentesSolicitadosQuantidade] = useState('');
    const [hemocomponentesSolicitadosResultData, setHemocomponentesSolicitadosResultData] = useState('');
    const [hemocomponentesSolicitadosResultHb, setHemocomponentesSolicitadosResultHb] = useState('');
    const [hemocomponentesSolicitadosResultHt, setHemocomponentesSolicitadosResultHt] = useState('');
    const [hemocomponentesSolicitadosResultPlaquetas, setHemocomponentesSolicitadosResultPlaquetas] = useState('');
    const [hemocomponentesSolicitadosResultInr, setHemocomponentesSolicitadosResultInr] = useState('');

    const handleChangeHemocomponentesSolicitadosMedida = (event) => {
        setHemocomponentesSolicitadosMedida (event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosQuantidade = (event) => {
        setHemocomponentesSolicitadosQuantidade(event.target.value);
    };
    const handleChangeHemocomponentesSolicitadosResultData = (event) => {
        setHemocomponentesSolicitadosResultData(event.target.value);
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

    return(
        // <Container>
        //         <Card>
        //             <CardContent>
                        <Grid container spacing={5} margin="dense" >
                            <Grid item xs={12} md={3} >
                            Quantidade de Unidades
                            <div>
                                <TextField
                                label="Medida"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosMedida}
                                onChange={handleChangeHemocomponentesSolicitadosMedida}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div>

                            <div>
                                <TextField
                                label="Quantidade"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosQuantidade}
                                onChange={handleChangeHemocomponentesSolicitadosQuantidade}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div> 
                        </Grid>
                        
                        <Grid item xs={12} md={2.1} mt={1} >Data do Resultado do Exame*
                            <div>
                                <DateInput 
                                    label="Data" 
                                    value={hemocomponentesSolicitadosResultData} 
                                    handleDateChange={(newDate) => setHemocomponentesSolicitadosResultData(newDate)}
                                />
                                {/* <TextField
                                label="Data *"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosResultData}
                                onChange={handleChangeHemocomponentesSolicitadosResultData}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                /> */}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                            HB g/DL
                            <div>
                                <TextField
                                label="HB g/DL"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosResultHb}
                                onChange={handleChangeHemocomponentesSolicitadosResultHb}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                            HT %
                            <div>
                                <TextField
                                label="HT %"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosResultHt}
                                onChange={handleChangeHemocomponentesSolicitadosResultHt}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                            Plaquetas/mm³
                            <div>
                                <TextField
                                label="P. /mm³"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosResultPlaquetas}
                                onChange={handleChangeHemocomponentesSolicitadosResultPlaquetas}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                            INR *
                            <div>
                                <TextField
                                label="INR *"
                                id="outlined-start-adornment"
                                value={hemocomponentesSolicitadosResultInr}
                                onChange={handleChangeHemocomponentesSolicitadosResultInr}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                                />
                            </div>
                        </Grid>
                    </Grid>
        //         </CardContent>
        //     </Card>
        // </Container>
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TelaResultadoPlasmaEaCrioprecipitado)