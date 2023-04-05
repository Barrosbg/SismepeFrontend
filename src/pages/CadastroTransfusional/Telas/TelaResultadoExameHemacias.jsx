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
import { BuscarSolicitacoesPorId } from "../action";

import moment from 'moment';
import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'
import DateInput from '../../../components/general/dateInput';
import TelaCadastro01Transfusional from "../TelaCadastro01Transfusional";
import { set } from "date-fns";

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

const TelaResultadosHemocomponentes = (props) => {
   
    useEffect(async () => {
        if (props.tela == "CH" && props.dados != '') {
            // props.fetchBackdrop('BACKDROP_FETCHED', true);
            let preencherParaAtualizar = await BuscarSolicitacoesPorId(props.dados)
            // props.fetchBackdrop('BACKDROP_FETCHED', false);
            setHemocomponentesSolicitadosMedidaCm(preencherParaAtualizar.hemocompMedida)
            setHemocomponentesSolicitadosQuantidade(preencherParaAtualizar.hemocompQuantidade)
            setCheckDesleucocitados(preencherParaAtualizar.hemocompDesleucocitado)
            setCheckFiltrado(preencherParaAtualizar.hemocompFiltrado)
            setCheckLavado(preencherParaAtualizar.hemocompLavado)
            setCheckFenotipado(preencherParaAtualizar.hemocompFenotipado)
            setCheckIrradiado(preencherParaAtualizar.hemocompIrradiado)
            setHemocomponentesSolicitadosResultData(preencherParaAtualizar.exame_data)
            setHemocomponentesSolicitadosResultHb(preencherParaAtualizar.exameHb)
            setHemocomponentesSolicitadosResultHt(preencherParaAtualizar.exameHt)
            setHemocomponentesSolicitadosResultPlaquetas(preencherParaAtualizar.examePlaquetas)
            setHemocomponentesSolicitadosResultInr(preencherParaAtualizar.exameInr)
            
        }
    }, [])

    const [hemocomponentesSolicitadosMedidaCm, setHemocomponentesSolicitadosMedidaCm] = useState('');
    const [hemocomponentesSolicitadosQuantidade, setHemocomponentesSolicitadosQuantidade] = useState('');
    const [hemocomponentesSolicitadosResultData, setHemocomponentesSolicitadosResultData] = useState('');
    const [hemocomponentesSolicitadosResultHb, setHemocomponentesSolicitadosResultHb] = useState('');
    const [hemocomponentesSolicitadosResultHt, setHemocomponentesSolicitadosResultHt] = useState('');
    const [hemocomponentesSolicitadosResultPlaquetas, setHemocomponentesSolicitadosResultPlaquetas] = useState('');
    const [hemocomponentesSolicitadosResultInr, setHemocomponentesSolicitadosResultInr] = useState('');

    const [checkDesleucocitados, setCheckDesleucocitados] = useState(false);
    const [checkFiltrado, setCheckFiltrado] = useState(false);
    const [checkLavado, setCheckLavado] = useState(false);
    const [checkFenotipado, setCheckFenotipado] = useState(false);
    const [checkIrradiado, setCheckIrradiado] = useState(false);

     const dadosCh = {
        medida: '',
        quantidade: '',
        checkDesleucocitados: false,
        checkFiltrado: false,
        checkLavado: false,
        checkFenotipado: false,
        checkIrradiado: false,
        resultData: '',
        exameHb: '',
        exameHt: '',
        examePlaquetas: '',
        exameInr: ''
    };
    
    dadosCh.medida = hemocomponentesSolicitadosMedidaCm;
    dadosCh.quantidade = hemocomponentesSolicitadosQuantidade;
    dadosCh.checkDesleucocitados = checkDesleucocitados;
    dadosCh.checkFiltrado = checkFiltrado;
    dadosCh.checkLavado = checkLavado;
    dadosCh.checkFenotipado = checkFenotipado;
    dadosCh.checkIrradiado = checkIrradiado;
    dadosCh.resultData = hemocomponentesSolicitadosResultData;
    dadosCh.exameHb = hemocomponentesSolicitadosResultHb;
    dadosCh.exameHt = hemocomponentesSolicitadosResultHt;
    dadosCh.examePlaquetas = hemocomponentesSolicitadosResultPlaquetas;
    dadosCh.exameInr = hemocomponentesSolicitadosResultInr;


    const handleChangeHemocomponentesSolicitadosMedidaCm = (event) => {
        setHemocomponentesSolicitadosMedidaCm(event.target.value)
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

    props.dadosCh(dadosCh)

    return(
    
        <Grid container spacing={5} margin="dense" >
            <Grid item xs={12} md={2.8} >
                    Quantidade de Unidades
                    <div>
                        <TextField
                            label="Medida"
                            id="outlined-start-adornment"
                            value={hemocomponentesSolicitadosMedidaCm}
                            onChange={handleChangeHemocomponentesSolicitadosMedidaCm}
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
                            name="qtd"
                        />
                </div> 
            </Grid>
            <Grid item xs={12} md={1.8} >
                Componentes Modificados
                <div className="Spacer"></div>
                    <div>
                    <input type="checkbox"  name="desleucocitados" value="desleucocitados" onChange={handleChangeCheckDesleucocitados} checked={checkDesleucocitados}/>Desleucocitados
                    </div>
                    <div>
                    <input type="checkbox"  name="filtrado" value="filtrado" onChange={handleChangeCheckFiltrado} checked={checkFiltrado}/>Filtrado
                    </div>
                    <div>
                    <input type="checkbox"  name="lavado" value="lavado" onChange={handleChangeCheckLavado} checked={checkLavado}/>Lavado
                    </div>
                    <div>
                    <input type="checkbox"  name="fenotipado" value="filtrado" onChange={handleChangeCheckFenotipado} checked={checkFenotipado}/>Fenotipado
                    </div>
                    <div>
                    <input type="checkbox"  name="irradiado" value="irradiado" onChange={handleChangeCheckIrradiado} checked={checkIrradiado}/>Irradiado
                    </div>
            </Grid>
            <Grid item xs={12} md={2.1} mt={1}>Data do Resultado do Exame*
                <div>
                    <DateInput 
                        label="Data" 
                        value={hemocomponentesSolicitadosResultData} 
                        handleDateChange={(newDate) => setHemocomponentesSolicitadosResultData(newDate)}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                HB g/DL*
                <div>
                    <TextField
                    label="HB g/DL*"
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
                HT % *
                <div>
                    <TextField
                    label="HT % *"
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
                INR
                <div>
                    <TextField
                    label="INR"
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
    )
}


const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TelaResultadosHemocomponentes)