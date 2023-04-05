import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { buscarSetor } from './action.js';
import { imprimirIdentificacaoPorSetor } from './action.js';
import { imprimirIdentificacaoPorNome } from './action.js';
import { BuscarCadastroPorPessoa } from './action.js';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { toast } from "react-toastify";

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

const GerarIdentificacao = (props) => {

    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [busca, setBusca] = useState(null);
    const [buscaSetor, setBuscaSetor] = useState()
    const [setor, setSetor] = useState([])
    const [porSetor, setPorSetor] = useState(null)
    const [porPessoa, setPorPessoa] = useState(null)
    const [mostrarSetor, setMostrarSetor] = useState(false)
    const [mostrarPorPessoa, setMostrarPorPessoa] = useState(false)
    const [listaSetor, setListaSetor] = useState([])


    useEffect(async () => {
        setSetor(await buscarSetor())
        console.log(props)
    }, [])


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
            }else{
                toast.warn("Informe um nome antes de pesquisar")
            }
        } else if (mostrarSetor) {
            if (porSetor !== null) {
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let ident = await imprimirIdentificacaoPorSetor(porSetor)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
            }else{
                toast.warn("Selecione um setor antes de pesquisar")
            }
        }else{
            toast.warn("Selecione um modo de busca antes de pesquisar")
        }
    }


    return (

        <Container>


            <Card>
                <CardHeader
                    title="Pesquisa"
                />
                <CardContent>

                    {/* <Grid container xs={12} md={12} display="flex" spacing={2} alignItems='center' > */}
                    <div className={classes.container} >
                        <div >
                            <FormControl size="small" margin="dense" variant="outlined" className={classes.formControl} >
                                <InputLabel className={classes.InputLabel} id="demo-simple-select-outlined-label">Buscar</InputLabel>
                                <Select
                                    className={classes.inputForm}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={busca}
                                    onChange={changeBusca}
                                    label="Buscar"
                                >
                                    <MenuItem value={0}>
                                        <em>Nenhum</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Pessoa</MenuItem>
                                    <MenuItem value={20}>Setor</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {mostrarSetor &&
                            <div  >
                                <FormControl size="small" margin="dense" variant="outlined" className={classes.formControl}  >
                                    <InputLabel className={classes.InputLabel} id="demo-simple-select-outlined-label">Buscar Por Setor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={porSetor}
                                        onChange={(e) => setPorSetor(e.target.value)}
                                        label="Buscar"

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            setor.data?.map((item, index) => {
                                                return (
                                                    <MenuItem value={item} >{item}</MenuItem>
                                                )
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </div>

                        }
                        {mostrarPorPessoa &&
                            <div className={classes.formPessoa}  >
                                <TextFieldAutocomplete 
                                id="Matricula" 
                                value={porPessoa} 
                                label="Buscar por Pessoa" 
                                actionFilter={BuscarCadastroPorPessoa} 
                                actionChangeOption={(e) => setPorPessoa(e)} 
                                getOptionLabel={(option) => option.nome + '- Modelo:' + option.modelo} 
                                filterOptions={(options, object) => options
                                .filter((item) => item.nome.toUpperCase()
                                .includes(object.inputValue.toString().toUpperCase()) 
                                || item.modelo.toString().includes(object.inputValue))} 
                                />
                            </div>
                        }
                        <div className={classes.formButton} >
                            <Button variant="contained" color="primary" ml={2} fullWidth onClick={changebuscarIdentificacao}>
                                Pesquisar
                            </Button>
                        </div>

                        {/* </Grid> */}
                    </div>
                </CardContent>
            </Card>





            <div className="Spacer"></div>


        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GerarIdentificacao)


