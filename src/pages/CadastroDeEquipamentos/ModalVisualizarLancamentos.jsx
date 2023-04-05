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





const ModalVisualizarLancamentos = (props) => {
    console.log(props)


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

    // useEffect(() => {
    //     setGpSanguineo(exameAtualizar.grupoSanguineo ? exameAtualizar.grupoSanguineo : '')
    //     setRhd(exameAtualizar.rhd ? exameAtualizar.rhd : '')
    //     setCombDireto(exameAtualizar.comboDireto ? exameAtualizar.comboDireto : '')
    //     setCombIndireto(exameAtualizar.comboIndireto ? exameAtualizar.comboIndireto : '') 
    //     setModalOpen(props.setModalOpen)
    //     console.log(exameAtualizar)
    // }, [])

    const handleGpSanguineo = (e) => {
        if (e !== "") {
            setGpSanguineo(e)
            console.log(e)
        } else {
            setGpSanguineo("")
            setRhd("")
        }
    }

    const handleAtualizaExame = async () => {


        if (gpSanguineo || combDireto || combIndireto !== '') {

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

        } else {
            toast.warn("Você deve informar pelo menos uma das classificações sanguíneas")
        }



    }

    const enviarExames = async () => {

        const payload = {
            grupoSanguineo: gpSanguineo !== '' ? gpSanguineo : null,
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
                    title="Informações do Equipamento"
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
                                <Grid container  xs={12} md={12} spacing={1}>
                                    <div className="Spacer"></div>
                                    <Grid item xs={12} md={2} >
                                        <TextField
                                            // sx={{ width: 800 }}
                                            id="outlined-multiline-flexible"
                                            label="Tipo de Equipamento"
                                            disabled
                                            size='small'
                                            value={props.item.tipo_equipamento}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2} >
                                        <TextField
                                            disabled
                                            size='small'
                                            id="outlined-multiline-flexible"
                                            label="Marca"
                                            value={props.item.marca}

                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Status"
                                            disabled
                                            size='small'
                                            value={props.item.status == "E" ? "ENTREGUE" : "LIVRE"}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Responsável"
                                            disabled
                                            fullWidth
                                            size='small'
                                            value={props.item.cd_responsavel?.nome}
                                           
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Setor"
                                            disabled
                                            size='small'
                                            value={props.item.setor_equipe?.descricao}
                                            maxRows={10}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            size='small'
                                            id="outlined-multiline-flexible"
                                            label="N° de Serie"
                                            multiline
                                            disabled
                                            value={props.item?.numeroSerie}
                                            maxRows={10}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="N° Patrimonio"
                                            disabled
                                            size='small'
                                            value={props.item?.patrimonioNumero}

                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <TextField
                                            size='small'
                                            id="outlined-multiline-flexible"
                                            label="Data de cadastro"
                                            multiline
                                            disabled
                                            value={props.item?.dt_cadastro}

                                        />
                                    </Grid>
                                </Grid>


                            </Grid>
                        </>
                    }
                    footer={

                        <Box display="flex">

                            <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="success" onClick={closeFunction}>Fechar</Button>
                            </Box>
                            {/* <Box m={1} className="ButtonSecondary"  >
                                        <Button variant="contained" color="success" onClick={handleAtualizaExame}>Atualizar</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalVisualizarLancamentos)
