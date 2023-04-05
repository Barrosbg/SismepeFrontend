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

import DialogHeaderFooter from "../../../components/general/dialogHeaderFooter";
import withOkAndCancel from './../../../components/hocs/withOkAndCancel';

const Modal = withOkAndCancel(DialogHeaderFooter);

const ModalConcentradoHemacias = (props) => {

    const [hemocomponentesSolicitadosMedida, setHemocomponentesSolicitadosMedida] = useState('');
    const [hemocomponentesSolicitadosQuantidade, setHemocomponentesSolicitadosQuantidade] = useState('');
    const [hemocomponentesSolicitadosResultData, setHemocomponentesSolicitadosResultData] = useState('');
    const [hemocomponentesSolicitadosResultHb, setHemocomponentesSolicitadosResultHb] = useState('');
    const [hemocomponentesSolicitadosResultHt, setHemocomponentesSolicitadosResultHt] = useState('');
    const [hemocomponentesSolicitadosResultPlaquetas, setHemocomponentesSolicitadosResultPlaquetas] = useState('');
    const [hemocomponentesSolicitadosResultInr, setHemocomponentesSolicitadosResultInr] = useState('');

    console.log(hemocomponentesSolicitadosResultData)

    const [checkDesleucocitados, setCheckDesleucocitados] = useState('');
    const [checkFiltrado, setCheckFiltrado] = useState('');
    const [checkLavado, setCheckLavado] = useState('');
    const [checkFenotipado, setCheckFenotipado] = useState('');
    const [checkIrradiado, setCheckIrradiado] = useState('');

    const [modalOpen,setModalOpen] = useState(props.setModalOpen)

    const closeFunction = () => {
        //setModalOpen(false)
        props.closeFunction(false)
        //return modalOpen
    }

    const handleChangeCheckDesleucocitados = (event) => {
        if (event.target.checked === true) {  
            setCheckDesleucocitados(event.target.checked);
        }else{
            setCheckDesleucocitados(event.target.checked);
        }
    };
    const handleChangeCheckFiltrado = (event) => {
         if (event.target.checked === true) {  
            setCheckFiltrado(event.target.checked);
            console.log(event.target.checked)
        }else{
            setCheckFiltrado(event.target.checked);
            console.log(event.target.checked)
        }
    };
    const handleChangeCheckLavado = (event) => {
         if (event.target.checked === true) {  
            setCheckLavado(event.target.checked);
            console.log(event.target.checked)
        }else{
            setCheckLavado(event.target.checked);
            console.log(event.target.checked)
        }
    };
    const handleChangeCheckFenotipado = (event) => {
         if (event.target.checked === true) {  
            setCheckFenotipado(event.target.checked);
            console.log(event.target.checked)
        }else{
            setCheckFenotipado(event.target.checked);
            console.log(event.target.checked)
        }
    };
    const handleChangeCheckIrradiado = (event) => {
         if (event.target.checked === true) {  
            setCheckIrradiado(event.target.checked);
            console.log(event.target.checked)
        }else{
            setCheckIrradiado(event.target.checked);
            console.log(event.target.checked)
        }
    };

    const handleChangeHemocomponentesSolicitadosMedida = (event) => {
        setHemocomponentesSolicitadosMedida (event.target.value);
        console.log(event.target.value)
    };
    const handleChangeHemocomponentesSolicitadosQuantidade = (event) => {
        setHemocomponentesSolicitadosQuantidade(event.target.value);
        console.log(event.target.value)
    };
    const handleChangeHemocomponentesSolicitadosResultHb = (event) => {
        setHemocomponentesSolicitadosResultHb(event.target.value);
        console.log(event.target.value)
    };
    const handleChangeHemocomponentesSolicitadosResultHt = (event) => {
        setHemocomponentesSolicitadosResultHt(event.target.value);
        console.log(event.target.value)
    };
    const handleChangeHemocomponentesSolicitadosResultPlaquetas = (event) => {
        setHemocomponentesSolicitadosResultPlaquetas(event.target.value);
        console.log(event.target.value)
    };
    const handleChangeHemocomponentesSolicitadosResultInr = (event) => {
        setHemocomponentesSolicitadosResultInr(event.target.value);
        console.log(event.target.value)
    };

    return(

    <Modal
        isOpen
        handleClose={() => closeFunction(false)}
        title="Teste"
        cancelAction={() =>closeFunction(false)}
        okLabel="Teste"
        //okAction={() => handleSave()}
    >  
        <Grid container spacing={1} margin="dense" >
            <Grid item xs={12} md={2.3} >
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
            <Grid item xs={12} md={2} >
                Componentes Modificados
                {/* <div className="Spacer"></div> */}
                <div>
                <input type="checkbox"  name="desleucocitados" value="desleucocitados" onChange={handleChangeCheckDesleucocitados}/>Desleucocitados
                </div>
                <div>
                <input type="checkbox"  name="filtrado" value="filtrado" onChange={handleChangeCheckFiltrado}/>Filtrado
                </div>
                <div>
                <input type="checkbox"  name="lavado" value="lavado" onChange={handleChangeCheckLavado}/>Lavado
                </div>
                <div>
                <input type="checkbox"  name="fenotipado" value="filtrado" onChange={handleChangeCheckFenotipado}/>Fenotipado
                </div>
                <div>
                <input type="checkbox"  name="irradiado" value="irradiado" onChange={handleChangeCheckIrradiado}/>Irradiado
                </div>
            </Grid>
            <Grid item xs={12} md={2.1} mt={0.5}>Data do Resultado do Exame*
            
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
            <Grid item xs={12} md={1.6} ><div className="Spacer"></div>
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
    </Modal>      
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalConcentradoHemacias)