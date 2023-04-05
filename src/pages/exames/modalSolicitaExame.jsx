import { Grid, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListaProcedimentos } from "../../actions/Exames/actions";
import { filtrarPessoaTitular } from "../../actions/Exames/actions";
import { filtrarCid } from "./actions";
import TextFieldAutocomplete from '../../components/general/autocomplete';
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import { filtrarPaciente } from '../../actions/atendimento/assistencia_social/actions';
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { cadastrarProcedimentosEAutorizacoes, downloadFile, filtrarPrestador } from "./actions";
import { SalvarSolicitacao } from '../../actions/Exames/actions'
import { ListEditProcedimentosEmpresas } from "./listEditProcedimentosEmpresas";
import { TextFieldEdit } from "./textField";
import TextField from '@mui/material/TextField';
import consts from "../../constants";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Collapse } from '@mui/material';
import id from "date-fns/esm/locale/id/index.js";
const Modal = withOkAndCancel(DialogHeaderFooter);

export const ModalSolicitaExame = (props) => {
    const { setModalOpen, usuarioLogado } = props;
    console.log(usuarioLogado)

    const [paciente, setPaciente] = useState([]);
    const [prestador, setPrestador] = useState(null);
    const [tipoExame, setTipoExame] = useState('');
    const [procedimentosEmpresas, setProcedimentosEmpresas] = useState([]);
    const [hidden, sethidden] = useState(false);

    const [listaExames, setlistaExames] = useState([]);
    const [cid, setCid] = useState(null)
    const [ome, setOme] = useState(null);
    const [exame, setExame] = useState(null)
    const [justificativa, setJustificativa] = useState('');
    const [exameDesc, setExameDesc] = useState(null)
    const [observacoes, setObservacoes] = useState('');
    const [observacoesRestritas, setObservacoesRestritas] = useState('');

    const [filterExpanded, setFilterExpanded] = useState(false);
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));



    const classes = useStyles();



    const handleSave = async () => {
        let json
        if (paciente.id && tipoExame && listaExames.length > 0) {
            if (paciente.id && tipoExame && listaExames.length > 0 && cid.id) {
                json = {
                    prestadorSolicitante: {
                        id: prestador !== null ? prestador.id : usuarioLogado.prestador.id
                    },
                    paciente: {
                        id: paciente.id
                    },
                    tipoExame: tipoExame,
                    itSolicitacoes: listaExames.map((item) => {
                        return {
                            procedimento: item
                        }
                    }),
                    cid: {
                        id: cid.id
                    },
                    ome: {
                        id: usuarioLogado.ome ? usuarioLogado.ome : 293
                    },
                    justificativa: justificativa,
                    observacao: observacoes,
                    observacaoRestrita: observacoesRestritas,
                }
                console.log(json)
            }
            console.log(json)
            
            if (json.itSolicitacoes.length > 0) {
                const res = await SalvarSolicitacao(json);
                console.log(res)
                if (res.status === 201) {
                     toast.success("Solicitação Ficha cadastradas com sucesso!")
                    setModalOpen(false);
                }
            } else {
                toast.error('Nenhum Exame selecionado!');
            }
        } else {
            toast.error('Todos os campos devem estar preenchidos!');
        }
    }
    const ChangePaciente = async (paciente) => {
        if (paciente != null) {
            let p = await filtrarPessoaTitular(paciente.id)
            setPaciente(p)
        } else {
            setPaciente([])
        }
    }



    const changeExames = async (ex) => {

        if (ex != null) {
            // setErroExame(false)
            // setErroTipoExame(false)
            sethidden(true)
            if (listaExames.length === 0) {
                setExame(ex.descricao)
                setlistaExames([...listaExames, ex])
            } else {
                if (listaExames.find(el => el.id == ex.id)) {
                    toast.warn('Procedimento Já Adicionado!')
                    setExame('')
                } else {
                    setlistaExames([...listaExames, ex])
                    setExame('')
                }
            }
        }

    }

    const handleDelete = (id) => {
        const lista = listaExames.filter(item => item.id !== id);
        setlistaExames(lista)
    }


    const changeTipoExame = (tipo) => {
        setExameDesc(tipo.target.value)
        // setErroTipoExame(false)
        if (tipo.target.value === 'Eletivo') {
            setTipoExame('E')
        } else {
            setTipoExame('U')
        }

    }

    const changePrestador = (pres) => {

    }
    return (
        <Modal
            isOpen
            handleClose={() => setModalOpen(false)}
            title="Solicitação de Procedimentos"
            cancelAction={() => setModalOpen(false)}
            okLabel="Solicitar Exame"
            okAction={() => handleSave()}
        >
            <Grid container spacing={1} alignItems="center">


                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={12}>
                        <TextFieldAutocomplete id="paciente" value={paciente.length === 0 ? null : paciente} error={''} label="Paciente" actionFilter={filtrarPaciente} actionChangeOption={ChangePaciente} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                    </Grid>
                    {paciente.length !== 0 &&
                        <>
                            <Grid item xs={12} md={3}>
                                <TextField id="Dt_Nascimento" size="small" variant="outlined" value={paciente.dataNascimento} disabled error={''} label="Dt Nascimento" />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                {/* <TextFieldEdit id="Parentesco" size="small" variant="outlined" value={''} disabled error={''} label="teste" /> */}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField id="Carência" size="small" variant="outlined" value={''} disabled error={''} label="Carência" />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField id="Dt Conceção" size="small" variant="outlined" value={paciente.dataCadastro} disabled error={''} label="Dt Conceção" />
                            </Grid>
                        </>
                    }
                    <Grid item xs={12} md={12}>
                        <TextFieldAutocomplete id="ome" disabled value={usuarioLogado.ome ? usuarioLogado.ome : "CMH"} label="Ome" error={''} />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    {usuarioLogado.prestador ? <TextFieldAutocomplete id="Médico" value={usuarioLogado.prestador ? usuarioLogado.prestador.nome : null} disabled={usuarioLogado.prestador !== null} label="Prestador" error={''} /> : <TextFieldAutocomplete label="Médico" actionFilter={filtrarPrestador} value={prestador} minSizeFilter={0} actionChangeOption={(novoPrestador) => setPrestador(novoPrestador)} getOptionLabel={(option) => option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} />}



                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldAutocomplete id="cid" value={cid} label="CID" error={''} actionFilter={filtrarCid} actionChangeOption={(cid) => setCid(cid)} getOptionLabel={(option) => option.descricao} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Justificativa:"
                        multiline
                        rows={3}
                        value={justificativa}
                        onChange={(e) => setJustificativa(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}  >

                    <FormControl variant="outlined" className={"classes.formControl"} margin='dense' fullWidth error={''} >
                        <InputLabel id="demo-simple-select-outlined-label" >Tipo de Procedimento</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={exameDesc}
                            onChange={changeTipoExame}
                            label={"Tipo de Procedimento"}
                        >
                            <MenuItem value={'Eletivo'}>Eletivo</MenuItem>
                            <MenuItem value={'Urgente'}>Urgência/Emergência </MenuItem>

                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldAutocomplete id="Exame" value={exame} label="Procedimentos" error={''} actionFilter={ListaProcedimentos} actionChangeOption={changeExames} getOptionLabel={(option) => option.descricao} />
                </Grid>
                <Collapse in={hidden} number="100px">
                    <Grid container xs={12} md={12}>
                        {listaExames.map((item, id) => {
                            return (
                                <div key={id} className={classes.root}>
                                    <Chip label={item.descricao} onDelete={() => handleDelete(item.id)} color="primary" />
                                </div>
                            )
                        })}
                    </Grid>
                </Collapse>
                <Grid item xs={12} md={12}></Grid>
                <Grid item={true} sm={12} xs={12}>
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item={true} sm={11} xs={11}>
                            <Typography variant="body1" gutterBottom>
                                <span className="TitleCard">Adicionar Observações</span>
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={1} xs={1}>
                            <IconButton
                                onClick={() => setFilterExpanded(!filterExpanded)}
                                style={{ textAlign: 'end', float: 'right' }}
                                size="large">
                                {filterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Collapse in={filterExpanded} style={{ width: '100%' }} timeout="auto">
                        <Grid container spacing={2} xs={12} md={12} justifyContent="center" >
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Obs:"
                                    multiline
                                    rows={6}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    value={observacoes}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Obs Restrita:"
                                    multiline
                                    rows={6}
                                    onChange={(e) => setObservacoesRestritas(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    value={observacoesRestritas}
                                />
                            </Grid>
                        </Grid>
                        <div className="Spacer"></div>
                    </Collapse>
                </Grid>

            </Grid>
        </Modal>
    );
}