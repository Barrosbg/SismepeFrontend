import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { bindActionCreators } from 'redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Icon, IconButton, Tooltip, CardMedia } from "@mui/material";
import { buscarAgendaModificada } from './action';
import { connect } from "react-redux";
import { fetchBackdrop } from '../../actions/geral/actions';
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";

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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const DetalhesAgenda = (props) => {
    const Modal = withOkAndCancel(DialogHeaderFooter);
    const { exameAtualizar } = props;
    const classes = useStyles();
    // const [paciente, setPaciente] = useState({})
    const [medico, setMedico] = useState(null)
    const [agendas, setAgendas] = useState([])
    const [gpSanguineo, setGpSanguineo] = useState('')
    const [rhd, setRhd] = useState('')
    const [combDireto, setCombDireto] = useState('')
    const [combIndireto, setCombIndireto] = useState('')
    const [modalOpen, setModalOpen] = useState(props.setModalOpen)

    const closeFunction = () => {
        setModalOpen(false)
        props.closeFunction(false)
        return modalOpen
    }

useEffect(async ()=>{
    props.fetchBackdrop('BACKDROP_FETCHED', true) ;
    let agendaAlterada = await buscarAgendaModificada(props.agenda?.id);
    console.log(agendaAlterada)
    props.fetchBackdrop('BACKDROP_FETCHED', false) ;
},[])

    // const handleAtualizaExame = () => {
    //     props.handleAtualizaExame()
    //     return enviarExames()
    // }

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Modal
            isOpen={modalOpen}
            handleClose={() => props.closeFunction(false)}
            title="Criação e Alteração da Agenda"
            cancelAction={() => closeFunction()}
            okLabel="OK"
            okAction={() => closeFunction()}
        >
            <Grid container spacing={1} alignItems="center">

                <Card>
                    <CardHeader
                        title="ALTERAÇÃO DA AGENDA"
                    />
                    <CardContent>
                        <Grid container fullWidth>

                            <Grid item sm={12} md={12}  >

                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={2} >
                                        <TextField id="outlined-basic" label="Ativa" value={props.agenda?.ativo === 'S' ? "SIM" : "NÃO"} disabled variant="outlined" placeholder="Usuário" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField id="outlined-basic" label="Data de inclusão" value={props.agenda?.dataInclusao} disabled variant="outlined" placeholder="Usuário" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <TextField id="outlined-basic" label="Data de Alteração" value={props.agenda?.dataAlteracao} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="USUÁRIO DE ALTERAÇÃO"
                    />
                    <CardContent>
                        <Grid container fullWidth>

                            <Grid item sm={12} md={12}  >

                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={2} >
                                        <TextField id="outlined-basic" label="Id" value={props.usuario?.id} disabled variant="outlined" placeholder="Usuário" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField id="outlined-basic" label="Usuário" value={props.usuario?.pessoa.nome} disabled variant="outlined" placeholder="Usuário" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <TextField id="outlined-basic" label="Login" value={props.usuario?.login} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                    </Grid>

                                    <Grid item xs={12} sm={3} >
                                        <TextField id="outlined-basic" label="Nível de Acesso" value={props.usuario?.nivelAcesso === 'A' ? "Administrador" : "Usuário"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={3} >
                                        <TextField id="outlined-basic" label="Email" value={props.usuario?.email} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField id="outlined-basic" label="OME" value={props.usuario?.ome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Typography>
                                            Perfis do usuário
                                        </Typography>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Id</TableCell>
                                                        <TableCell align="center">Descrição</TableCell>
                                                        <TableCell align="center">Sigla da Permissão</TableCell>
                                                        <TableCell align="center">Ativo</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {props?.usuario?.perfis.map((row) => (
                                                        <>
                                                            <TableRow>
                                                                <TableCell align="center">{row.id}</TableCell>
                                                                <TableCell align="center">{row.descricao}</TableCell>
                                                                <TableCell align="center">{row.siglaPermissao}</TableCell>
                                                                <TableCell align="center">{row.ativo === 'S' ? "SIM" : "NÃO"}</TableCell>
                                                            </TableRow>
                                                        </>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </Modal>
    );
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesAgenda)
