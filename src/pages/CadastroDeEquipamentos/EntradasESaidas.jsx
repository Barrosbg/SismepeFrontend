import { Button, Collapse, Container, Card, CardContent, Box, TextField, CardHeader, Grid, ListItemSecondaryAction, IconButton, Fab, Tooltip } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DateInput from '../../components/general/dateInput';
import FormControl from '@mui/material/FormControl';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { buscarEquipamentoNumSerieAndLAncamento, buscarSetor, saveEquipamento, saveLancamento } from './action';
import { buscarEquipamento } from './action';
import { BuscarPessoa } from './action';
import { toast } from "react-toastify";
import Autocomplete from '@mui/material/Autocomplete';
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

const EntradasESaidas = (props) => {

    const classes = useStyles();

    const [tipo, setTipo] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [setor, setSetor] = useState(null)
    const [tecnico, setTecnico] = useState('')
    const [status, setStatus] = useState('')
    const [observacoes, setObservacoes] = useState("")
    const [equipamentos, setEquipamentos] = useState([])
    const [dt_entrada, setDt_entrada] = useState(null)
    const [dt_saida, setDt_saida] = useState(null)
    const [cd_equipamento, setCd_equipamento] = useState("")
    const [adcMaquina, setAdcMaquina] = useState(false)
    const [todosSetores, setTodosSetores] = useState([])
    const [EquipamentoEntregue, setEquipamentoEntregue] = useState("")
    const [lancamentos, setLancametos] = useState([])
    const [entregakit, setEntregaKit] = useState(false)
    const [visivel, setVisivel] = useState(true)
    // const [age, setAge] = React.useState('');buscarSetor
    // setResponsavel,setSetor,setTecnico,setStatus,setObservacoes,setEquipamentos,setDt_entrada,setDt_saida

    useEffect(async () => {
        let setores = await buscarSetor()
        setTodosSetores(setores)
    }, [])
    const handleChangeTipo = (event) => {

        setTipo(event.target.value);
    };
    const changeResponsavel = (event) => {
        setResponsavel(event);
    };
    const handleSetor = (event, newValue) => {
        console.log(newValue)
        if (newValue != null) {
            setSetor(newValue);
        }
        //
    };
    const handleTecnico = (event) => {

        setTecnico(event.target.value);
    };
    const handleStatus = (event) => {

        setStatus(event.target.value);
    };
    const handleObservacao = (event) => {

        setObservacoes(event.target.value);
    };
    // const handleChangeDtCadastro = (event) => {
    //     setDt_cadastro(event.target.value);
    // moment().format();   
    // };
    const changeEquipamento = (event) => {
        let lista = [...equipamentos];
        // setLancametos(event.label[0]);
        console.log(event)

        if (event.status == "L" && event.cd_responsavel == null && event.setor_equipe == null) {
            if (lista.length == 0) {
                lista.push(event)
                setEquipamentos(lista)
                setCd_equipamento("")
            } else {
                if (lista.find(el => el.id == event.id)) {
                    toast.warn("Máquina já adicionada")
                    setCd_equipamento("")
                } else {
                    lista.push(event)
                    setEquipamentos(lista)
                    console.log(event)
                }
                // handleAdicionarMaisEquipamentos(equipamentos,event)
            }
        } else {
           toast.warn(`Máquina ${event.numeroSerie} já entregue ao usuário`)
        }


     




    };

    const handleAdicionarMaisEquipamentos = (lista, newEquip) => {


    }

    const handleChangeLimparCampos = (event) => {
        setTipo('');
        setResponsavel('');
        setSetor(null);
        setTecnico('');
        setStatus('');
        setObservacoes("");
        setEquipamentos([]);
        setDt_entrada(null);
        setDt_saida(null);
    };

    const handleChangeAdicionarEquipamentos = () => {
        setAdcMaquina(true)
    }

    const handleDeleteItem = (id) => {
        let lista = [...equipamentos]
        lista.splice(id, 1);
        setEquipamentos(lista)
    }






    const handleSalvarLancamento = async () => {
        // responsavel,setor,tecnico,observacoes,equipamentos,dt_entrada,dt_saida
        if (tipo != "" && responsavel != "" && setor != "" && equipamentos.length !== 0 && tecnico != "" && status != "") {
            const payload = {
                tp_lancamento: tipo,
                equipamento: equipamentos.map((item) => {
                    return {
                        cd_equipamento: {
                            id: item.id,

                        }
                    }
                }),
                cd_usuario_recebedor: {
                    id: responsavel.id
                },
                status: status,
                cd_setor_recebedor: {
                    id: setor.id
                },
                cd_usuario_entregador: {
                    id: tecnico
                },

                observacao: observacoes,
                dt_lancamento: moment().format('DD/MM/yyyy HH:mm:ss') 

            }
            console.log(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await saveLancamento(payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(response)
            if (response.status === 200) {
                toast.success("Lançamento realizado com sucesso")
                handleChangeLimparCampos()
            } else {
                toast.error("Problema ao salvar o Lançamento ")
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

        const { ...equip } = equipamentos
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

        <Container maxWidth="lg" sx={{ width: 1100 }} >


            <Card>
                <CardHeader
                    title="Controle de Entradas e Saídas de Equipamentos"
                />
                <CardContent>

                    <Grid container spacing={1} margin="dense" >

                        <Grid item xs={12} md={12} >
                            <FormControl sx={{ width: 300 }} size="small" margin="dense">
                                <InputLabel id="demo-simple-select-label">Tipo de Lançamento</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipo}
                                    label="Age"
                                    onChange={handleChangeTipo}
                                >
                                    {/* <MenuItem value={"E"}>Entrada</MenuItem> */}
                                    <MenuItem value={"S"}>Saída</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <TextFieldAutocomplete id="Responsável" value={responsavel == "" ? null : responsavel} label="Responsável" actionFilter={BuscarPessoa} actionChangeOption={changeResponsavel} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                options={todosSetores}
                                autoHighlight
                                size="small"
                                margin="dense"
                                value={setor}
                                getOptionLabel={(option) => option.descricao}
                                onChange={handleSetor}
                               
                                renderOption={(props, option) => (
                                    <Box component="li"  {...props}>
                                        {option.descricao}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Setor Responsável"
                                        
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'Setor', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                            {/* <TextFieldAutocomplete id="setor" value={setor == "" ? null : setor} label="Setor Responsável" actionFilter={buscarSetor} actionChangeOption={handleSetor} getOptionLabel={(option) => option.id + '-' + option.descricao} /> */}

                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl sx={{ width: 240 }} size="small" margin="dense">
                                <InputLabel id="demo-simple-select-label">Técnico</InputLabel>
                                <Select
                                    required
                                    margin="dense"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tecnico}
                                    label="Age"
                                    onChange={handleTecnico}
                                >
                                    <MenuItem value={1}>Charles Vieira da conceiao</MenuItem>
                                    <MenuItem value={2}>Renato Santos da Silva</MenuItem>
                                    <MenuItem value={3}>Joao Roberto da Silva barbosa</MenuItem>
                                    <MenuItem value={4}>Marcelo Andrade de Lira</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <FormControl sx={{ width: 240 }} size="small" margin="dense">
                                <InputLabel id="demo-simple-select-label">Status do Equipamento</InputLabel>
                                <Select
                                    required
                                    margin="dense"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={handleStatus}
                                >
                                    {/* {visivel && <>
                                        <MenuItem value={"L"}>Livre</MenuItem>
                                        <MenuItem value={"R"}>Recolhido</MenuItem>
                                        <MenuItem value={"A"}>Em Análise</MenuItem>
                                        <MenuItem value={"D"}>Devolução</MenuItem>
                                    </>} */}
                                    <MenuItem value={"E"}>Entregua de kit</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <div className="Spacer"></div>
                        <Grid item xs={12} md={12}>
                            {/* <Collapse in={adcMaquina}> */}
                            <Card>
                                <CardHeader
                                    title="Adicionar Equipamentos"
                                />
                                <CardContent>

                                    <Grid xs={12} md={6}>
                                        <TextFieldAutocomplete id="Matricula" value={cd_equipamento == "" ? null : cd_equipamento } label="Equipamento" actionFilter={buscarEquipamentoNumSerieAndLAncamento} actionChangeOption={changeEquipamento} getOptionLabel={(option) => option.tipo_equipamento + '-' + option.numeroSerie} />

                                        {equipamentos.map((input) => {

                                            return (
                                                <Grid container  >
                                                    <FormControl fullWidth>
                                                        <Grid item xs={12} sm={10}>
                                                            <TextField id="outlined-basic" size="Small" label={`${input.tipo_equipamento} - N° Serie: ${input.numeroSerie}`} value={''} disabled variant="outlined" placeholder="" fullWidth={true} margin="dense" />
                                                        </Grid>
                                                        <Box item xs={12} sm={2} >
                                                            <ListItemSecondaryAction >
                                                                <IconButton
                                                                    aria-label="add to favorites"
                                                                    onClick={() => handleDeleteItem(equipamentos.indexOf(input))}
                                                                    size="Small">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </Box>
                                                    </FormControl>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Collapse>

                            <Grid container spacing={1}>

                                <span className="fabButton ">
                                    <Tooltip title="Adicionar uma Nova Licença" placement="bottom-end">
                                        <Fab size="small" style={{ position: "relative", top: 10, right: 25,left: 10, zIndex: 100}} aria-label="add" onClick={handleChangeAdicionarEquipamentos}>
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </span>
                            </Grid> */}
                        </Grid>
                        <div className="Spacer"></div>
                        {/* <Grid item xs={12} md={3} >
                         <DateInput label="Data inicial" margin="dense" fullWidth value={dt_cadastro} handleDateChange={handleChangeDtCadastro} error={false}  />
                        </Grid> */}
                        <Grid item xs={12} md={12} >
                            <TextField
                                sx={{ width: 800 }}
                                id="outlined-multiline-flexible"
                                label="Observações"
                                multiline
                                value={observacoes}
                                onChange={handleObservacao}
                                maxRows={10}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleChangeLimparCampos}>
                                Limpar Campos
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="secondary" fullWidth onClick={handleSalvarLancamento}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EntradasESaidas)


