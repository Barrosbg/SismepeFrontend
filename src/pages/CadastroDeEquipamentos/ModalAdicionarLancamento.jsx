import { Box, Button, Card, CardContent, CardHeader, Collapse, Container, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { fetchBackdrop } from '../../actions/geral/actions';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import FilledInput from '@mui/material/FilledInput';
import { atualizarExame } from './action.js';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { toast } from 'react-toastify';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));





const ModalAtualizaExames = (props) => {



    const Modal = withOkAndCancel(DialogHeaderFooter);
    const { exameAtualizar } = props;
    const classes = useStyles();
    const [paciente, setPaciente] = useState({})
    const [medico, setMedico] = useState('')
    const [exames, setExames] = useState([])
    const [gpSanguineo, setGpSanguineo] = useState('')
    const [rhd, setRhd] = useState('')
    const [combDireto, setCombDireto] = useState('')
    const [combIndireto, setCombIndireto] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const closeFunction = () => {
        setModalOpen(false)
        props.closeFunction(false)
        return modalOpen
    }

    useEffect(() => {
        setGpSanguineo(exameAtualizar.grupoSanguineo ? exameAtualizar.grupoSanguineo : '')
        setRhd(exameAtualizar.rhd ? exameAtualizar.rhd : '')
        setCombDireto(exameAtualizar.comboDireto ? exameAtualizar.comboDireto : '')
        setCombIndireto(exameAtualizar.comboIndireto ? exameAtualizar.comboIndireto : '') 
        setModalOpen(props.setModalOpen)
        console.log(exameAtualizar)
    }, [])

    const handleGpSanguineo = (e) => {
        if(e !== ""){
            setGpSanguineo(e)
            console.log(e)
        }else{
            setGpSanguineo("")
            setRhd("")
        }
    }

    const handleAtualizaExame = async () => {
    
           
            if(gpSanguineo || combDireto || combIndireto !== ''){
            
                if (gpSanguineo !== '') {
                  
                    if (rhd !== '') {
                        let result = await enviarExames()
                        return props.handleAtualizaExame(result)
                    } else {
                        toast.warn("Fator RDH precisa ser informado")
                    }
        
                } else {
                    let result = await enviarExames()
                    return props.handleAtualizaExame(result)
                   
                }
                
                }else{
                    toast.warn("Você deve informar pelo menos uma das classificações sanguíneas")
                }
        
        

    }

    const enviarExames = async () => {

        const payload = {
            grupoSanguineo: gpSanguineo !== '' ? gpSanguineo : null ,
            rhd: rhd !== '' ? rhd : null,
            comboDireto: combDireto !== '' ? combDireto : null,
            comboIndireto: combIndireto !== '' ? combIndireto : null,


        }


        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await atualizarExame(exameAtualizar.id, payload)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        if (response.status === 200) {
            setModalOpen(false)
            props.closeFunction(false)
            toast.success("Exame Atualizado Com sucesso!")
            return true
        } else {
            setModalOpen(false)
            props.closeFunction(false)
            toast.error("Problema ao Cadastrar Exame")
            return false
        }
    }

    return (
        <Container>
            <Box>
                <DialogHeaderFooter
                    title="Atualizar Exames"
                    idComponent="referencia-familiar"
                    isOpen
                    handleClose={() => props.closeFunction(false)}
                    // title="Revalidar exame"
                    cancelAction={() => closeFunction()}
                    okLabel="Liberar Entrada"
                    maxWidth="md"
                    direction="row"

                    children={
                        <>
                            <Grid display="flex" container alignItems="center" spacing={2} >


                              
                                <>
                                    <Grid container spacing={1} alignItems="center">


                                        <Grid item xs={12} sm={6} fullWidth >
                                            <FormControl fullWidth size='small' variant="filled">
                                                <InputLabel htmlFor="filled-adornment-amount">Paciente</InputLabel>
                                                <FilledInput
                                                    id="filled-adornment-amount"
                                                    value={exameAtualizar.pessoa.nome}
                                                    disabled
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}  >
                                            <FormControl fullWidth size='small' variant="filled">
                                                <InputLabel htmlFor="filled-adornment-amount">Prestador</InputLabel>
                                                <FilledInput
                                                    id="filled-adornment-amount"
                                                    value={exameAtualizar.prestador.nome}
                                                    disabled
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={3} >
                                            <FormControl variant="outlined" size='small' fullWidth>
                                                <InputLabel htmlFor="outlined-age-native-simple">Grupo Sanguíneo</InputLabel>
                                                <Select
                                                    // disabled={liberar}
                                                    value={gpSanguineo}
                                                    onChange={e => handleGpSanguineo(e.target.value)}
                                                    label="Grupo Sanguíneo"

                                                >
                                                    <MenuItem value="">
                                                        Nenhum
                                                    </MenuItem>
                                                    <MenuItem value={"A"}>A</MenuItem>
                                                    <MenuItem value={"B"}>B</MenuItem>
                                                    <MenuItem value={"A/B"}>A/B</MenuItem>
                                                    <MenuItem value={"O"}>O</MenuItem>

                                                </Select>
                                            </FormControl>

                                        </Grid>
                                        <Grid item xs={12} md={3} >
                                            <FormControl variant="outlined" className={''} size='small' fullWidth>
                                                <InputLabel htmlFor="outlined-age-native-simple">RhD</InputLabel>
                                                <Select
                                                    native
                                                    // disabled={liberar}
                                                    value={rhd}
                                                    disabled={gpSanguineo == '' ? true : false}
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
                                                    // disabled={liberar}
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
                                                    // disabled={liberar}
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

                                    </Grid>
                               

                               
                                </>
                            
                            </Grid>
                            </>
                    }
                            footer={
                                <Box display="flex">
                                    <Box m={1} className="ButtonPrimary" >
                                        <Button variant="contained" color="success" onClick={ closeFunction}>Fechar</Button>
                                    </Box>
                                    <Box m={1} className="ButtonSecondary"  >
                                        <Button variant="contained" color="success" onClick={handleAtualizaExame}>Atualizar</Button>
                                    </Box>
                                </Box>
                            }
                />
                </Box>
        </Container>

    );
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAtualizaExames)
