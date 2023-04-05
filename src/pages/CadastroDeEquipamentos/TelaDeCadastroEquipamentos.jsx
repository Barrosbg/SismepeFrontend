import { Button, Collapse, Container, Card, CardContent, Box, TextField, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DateInput from '../../components/general/dateInput';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import {saveEquipamento} from './action';
import { toast } from "react-toastify";
import moment from 'moment'
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt'
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

const TelaDeCadastroEquipamento = (props) => {

    const classes = useStyles();

    const [tipo, setTipo] = useState('');
    const [marca, setMarca] = useState('');
    const [nr_serie, setNr_serie] = useState('')
    const [nr_patrimonio, setNr_patrimonio] = useState([])
    const [dt_cadastro, setDt_cadastro] = useState(null)
    const [ativo, setAtivo] = useState("")
    // const [age, setAge] = React.useState('');

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };
    const handleChangeMarca = (event) => {
        setMarca(event.target.value);
    };
    const handleChangeNrSerie = (event) => {
        setNr_serie(event.target.value);
    };
    const handleChangeNrPatrimonio = (event) => {
        setNr_patrimonio(event.target.value);
    };
    // const handleChangeDtCadastro = (event) => {
    //     setDt_cadastro(event.target.value);
    // moment().format();   
    // };
    const handleChangeAtivo = (event) => {
        setAtivo(event.target.value);
    };

    const handleChangeLimparCampos = (event) => {
        setTipo('');
        setMarca('');
        setNr_serie('');
        setNr_patrimonio('');
        setAtivo('');
    };

    // useEffect(async () => {
    //     setSetor(await buscarSetor())
    //     console.log(props)
    // }, [])


    // const pesquisarCarro = async () => {
    //     if (busca != null) {
    //         props.fetchBackdrop('BACKDROP_FETCHED', true);
    //         let response = await buscarVeiculosPelaPlaca(busca)
    //         props.fetchBackdrop('BACKDROP_FETCHED', false);
    //         console.log(response)
    //         if (response.status == 200) {
    //             setBuscaCad(response.data)
    //             sethiddenbuscaCad(true)
    //             // setOpenModalAtualizarDeletar(true)
    //         }else{
    //             setPlaca(null)
    //             toast.warn("Nenhum Veiculo Encontrado")
    //         }
    //     } else {
    //         toast.warning("Informe uma placa antes de buscar")
    //     }

    // }

    const handleSalvarEquipamento = async () => {

        if (tipo != "" && marca != "" && nr_serie != "" && ativo != "") {
            const payload = {
                tipo_equipamento: tipo,
                dt_cadastro: moment().format('DD/MM/yyyy HH:mm:ss'),
                marca: marca,
                ativo: ativo,
                status:"L",
                patrimonioNumero: nr_patrimonio,
                numeroSerie: nr_serie
            }
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await saveEquipamento(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(response)
            if(response.status === 200){
                toast.success("Equipamento Salvo com sucesso")
                handleChangeLimparCampos()
            }else{
                toast.error("Problema ao salvar Equipamento")
            }
        } else {
            toast.warn("Todos os campos com * devem ser preenchidos")
        }

    }


    const changeBusca = async (e) => {
        setBusca(e.target.value)
        if (e.target.value === 10) {

            setMostrarPorPessoa(true)
            setMostrarSetor(false)
            setPorSetor(null)

        } else if (e.target.value === 20) {
            setMostrarSetor(true)
            setMostrarPorPessoa(false)
            setPorPessoa(null)
        } else {
            setMostrarSetor(false)
            setMostrarPorPessoa(false)
        }
    }

    const changebuscarIdentificacao = async () => {

        if (mostrarPorPessoa) {
            if (porPessoa !== null) {
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let ident = await imprimirIdentificacaoPorNome(porPessoa?.nome)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
            } else {
                toast.warn("Informe um nome antes de pesquisar")
            }
        } else if (mostrarSetor) {
            if (porSetor !== null) {
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let ident = await imprimirIdentificacaoPorSetor(porSetor)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
            } else {
                toast.warn("Selecione um setor antes de pesquisar")
            }
        } else {
            toast.warn("Selecione um modo de busca antes de pesquisar")
        }
    }


    return (

        <Container>


            <Card>
                <CardHeader
                    title="Cadastar Equipamento"
                />
                <CardContent>

                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={3} >
                            <FormControl fullWidth size="small" margin="dense">
                                <InputLabel id="demo-simple-select-label">Tipo Equipamento</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipo}
                                    label="Age"
                                    onChange={handleChangeTipo}
                                >
                                    <MenuItem value={""}>-</MenuItem>
                                    <MenuItem value={"Gabinete"}>Gabinete</MenuItem>
                                    <MenuItem value={"Monitor"}>Monitor</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                required
                                label="Marca"
                                id="outlined-start-adornment"
                                value={marca}
                                onChange={handleChangeMarca}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                required
                                label="Número de Série"
                                id="outlined-start-adornment"
                                value={nr_serie}
                                onChange={handleChangeNrSerie}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                label="Número de Patrimônio"
                                id="outlined-start-adornment"
                                value={nr_patrimonio}
                                onChange={handleChangeNrPatrimonio}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={3} >
                         <DateInput label="Data inicial" margin="dense" fullWidth value={dt_cadastro} handleDateChange={handleChangeDtCadastro} error={false}  />
                        </Grid> */}
                        <Grid item xs={12} md={4} >
                            <FormControl fullWidth size="small" margin="dense">
                                <InputLabel id="demo-simple-select-label">Equipamento Ativo?</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={ativo}
                                    label="Age"
                                    onChange={handleChangeAtivo}
                                >
                                    <MenuItem value={""}>-</MenuItem>
                                    <MenuItem value={"S"}>Sim</MenuItem>
                                    <MenuItem value={"N"}>Não</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleChangeLimparCampos}>
                                Limpar Campos
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="secondary" fullWidth onClick={handleSalvarEquipamento}>
                                Salvar
                            </Button>
                        </Grid>


                    </Grid>
                </CardContent>
            </Card>





            <div className="Spacer"></div>


        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TelaDeCadastroEquipamento)


