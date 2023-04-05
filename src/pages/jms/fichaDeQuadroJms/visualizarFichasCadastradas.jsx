import { Component, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Divider, Fab, Grid, IconButton, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import man from '../../../assets/man.svg';
import woman from '../../../assets/woman.svg';
import { cellphoneMask, cpfMask } from '../../../services/general';
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Collapse, CardContent, Card, CardHeader, Tooltip } from '@mui/material';
import UserCard from '../../../components/general/userCard';
import './ficha.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardFicha from '../../../components/general/cardFicha';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { FichaJmsPdf } from '../../../actions/jms/actions'
import DoneIcon from '@mui/icons-material/Done';
import { fetchBackdrop } from '../../../actions/geral/actions';
import TextFieldAutocomplete from '../../../components/general/autocomplete'
import DialogHeaderFooter from '../../../components/general/dialogHeaderFooter';
import { openModal, changeModal } from '../../../actions/geral/actions';
import { connect } from "react-redux";
import { GrUserPolice } from "react-icons/gr";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { bindActionCreators } from 'redux';
import moment from 'moment'
import Chip from '@mui/material/Chip';
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work
import { BuscarPessoa } from '../../../actions/jms/actions';
import { buscarFichasJMS } from '../../../actions/jms/actions';
import { buscarFichaPorIdTitular } from '../../../actions/jms/actions';
import { buscarFichaPorId } from '../../../actions/jms/actions';
moment.locale('pt')
function getSteps() {
    return [{ id: 1, valor: "fezExameDeSangueNosUltimos6meses", descricao: 'FEZ EXAMES DE SANGUE NOS ÚLTIMOS 6 MESES?' }, { id: 2, valor: "fazUsoDeMedicacaoContinua", descricao: 'FAZ USO DE ALGUMA MEDICAÇÃO CONÍNUA? ' }, { id: 3, valor: "fezAlgumaCirurgiaNosUltimos12meses", descricao: 'FEZ ALGUMA CIRURGIA NOS ÚLTIMOS 12 MESES?' }, { id: 4, valor: "esteveInternadoNosUltimos12meses", descricao: 'ESTEVE INTERNADO NOS ÚLTIMOS 12 MESES?' }, { id: 5, valor: "fezExameDoCoracaoNosUltimos12meses", descricao: 'FEZ ALGUM EXAME DO CORAÇÃO NOS ÚLTIMOS 12 MESES?' }, { id: 6, valor: "possuiLicencaOudispensaAtualmente", descricao: 'ESTÁ NO MOMENTO DE LICENÇA OU DISPENSA?' }, { id: 7, valor: "possuiOutroProblemaDeSaude", descricao: 'TEM ALGUM OUTRO PROBLEMA DE SAÚDE?' }, { id: 8, valor: "praticaAtividadeFisica", descricao: 'PRATICA ALGUMA ATIVIDADE FÍSICA REGULAR?' }];
}
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3c8dbc",
        color: "#fff",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        width: '100%',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const manterEGenreicar = (props) => {

    const [hiddenBuscaPorMatricula, setHiddenBuscaPorMatricula] = useState(false)
    const [pessoa, setPessoa] = useState([])
    const [fichaDetalhes, setFichaDetalhes] = useState([])
    const [pessoaBusca, setPessoaBusca] = useState(null)
    const [hiddenFichas, setHiddenFichas] = useState(false)
    const [cardFichas, setCardFichas] = useState(false)
    const [isOpenDetalhes, setIsOpenDetalhes] = useState(false)
    const [Open, setOpen] = useState(false)
    const [OpenPerguntas, setPerguntas] = useState(false)
    const [pessoaId, setPessoaId] = useState(null)
    const [expanded, setExpanded] = useState('panel1');

    const steps = getSteps();
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
    });

     useEffect (async ()=>{
        const id =  props.location.state ? props.location.state.detail  : null
        setPessoaId(id)
       
         if(id !== null){
        
            props.fetchBackdrop('BACKDROP_FETCHED', true)
            let fichaTitular = await buscarFichaPorIdTitular(id)
            setPessoa(fichaTitular)
            setHiddenFichas(true)
            setCardFichas(true)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
          
        }else{
            return
        }
     },[props.location.state ])
  

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const changePessoa = async (ps) => {
        console.log(ps)
        if (ps !== null) {
            setPessoaBusca(ps)
            let pessoaId = ps !== null ? ps.id : ""
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let fichaTitular = await buscarFichaPorIdTitular(pessoaId)
            console.log(fichaTitular)
            setPessoa(fichaTitular)
            setHiddenFichas(true)
            setCardFichas(true)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            setHiddenFichas(false)
            setPessoa([])
            setCardFichas(false)
            setPessoaBusca(null)
        }
    }
    const changeBuscarTodasAsFichas = async (fichas) => {
        setPessoa([])
        setCardFichas(false)
        setPessoaBusca(null)
        setPessoa(null)
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let FichasJms = await buscarFichasJMS()
        if (FichasJms.status === 200) {
            setPessoa(FichasJms.data)
            setHiddenBuscaPorMatricula(false)
            setCardFichas(true)
        }
 
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    const handleBuscaPormatricula = () => {
        setPessoa([])
        setCardFichas(false)
        setHiddenBuscaPorMatricula(true)
    }
    const handleClickImprimirFicha = async () => {
       
        let id = fichaDetalhes ? fichaDetalhes[0].id : ''

        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let result = await FichaJmsPdf(id);
        props.fetchBackdrop('BACKDROP_FETCHED', false);





    }
    const handleClickEditarFicha = () => {

    }
    const setopen = (e) => {
        console.log(e)
        setOpen(e)
    }

    const setOpenVerDetalhes = async (e) => {
        if (e !== undefined) {
            setIsOpenDetalhes(true)
            let ficha = await buscarFichaPorId(e)
            setFichaDetalhes([ficha])
        } else {
            setIsOpenDetalhes(false)
            setExpanded('panel1')
        }
    }
    // const useRowStyles = makeStyles({
    //     root: {
    //         '& > *': {
    //             borderBottom: 'unset',
    //         },
    //     },
    // });
    function renderBotoesAcao(props) {
        if (props.cdPessoa !== "") {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Tooltip title="Mais Detalhes">
                        <IconButton
                            fullWidth={true}
                            onClick={() => setOpenVerDetalhes(props)}
                            variant="contained"
                            color="primary"
                            size="large"><InsertDriveFileOutlinedIcon /></IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Validar biometria">
                <IconButton fullWidth={true} onClick={() => setOpenValidDigital(true)} variant="contained" color="primary"><VerifiedUser /></IconButton>
              </Tooltip>
              <Tooltip title="Tirar foto">
                <IconButton fullWidth={true} onClick={() => setOpenFoto(true)} variant="contained" color="primary"><PhotoCamera /></IconButton>
              </Tooltip> */}
                </div>
            );
        }
    }






    const classes = useStyles();
    return (
        // console.log(props.location.state ? props.location.state.detail : null),
        <Container >
            <div className="Spacer"></div>
            <Card spacing={2} display="flex" alignItems="center">
                <CardHeader
                    title="Visualizar Fichas Cadastradas"
                />
                <CardContent>
                    <Grid container spacing={1} display="flex" flexDirection='row'  >

                        <Grid item xs={12} md={3} display="flex" alignItems="center">
                            <Button variant="contained" color="primary" fullWidth onClick={changeBuscarTodasAsFichas}>Buscar Todas as Fichas</Button>
                        </Grid>
                        <Grid item xs={12} md={3} display="flex" alignItems="center" className="ButtonPrimary" target={"_blank"}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleBuscaPormatricula} target={"_blank"}>Buscar Ficha Por Matricula</Button>
                        </Grid>

                        <Grid item xs={12} sm={5} display="flex" mt={1}  >
                            <Collapse in={hiddenBuscaPorMatricula}>
                                <TextFieldAutocomplete sx={{ width: 350 }} id="Nome/Matricula" value={pessoaBusca} label="Nome/Matricula" actionFilter={BuscarPessoa} actionChangeOption={changePessoa} getOptionLabel={(option) => option.matricula + '-' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} />
                            </Collapse>
                        </Grid>
                        <div className="Spacer"></div>
                    </Grid>
                </CardContent>
            </Card >
            <div className="Spacer"></div>
            <div className="Spacer"></div>

            <Collapse in={cardFichas}>
                <Card>
                    <CardHeader
                        title=" Ficha de Inspeção de Saúde - JMS"
                    />
                    <CardContent display="flex"  >

                        <Grid container spacing={2} >


                            <Grid item={true} md={12} className="cardlista" >

                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Paciente</StyledTableCell>
                                                <StyledTableCell align="right"> Data da Inspeção</StyledTableCell>
                                                <StyledTableCell align="right"></StyledTableCell>
                                                <StyledTableCell align="right"></StyledTableCell>
                                                <StyledTableCell align="right" >Detalhes</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {pessoa && pessoa.length ? pessoa.map((item) => (
                                                console.log(item),
                                                <StyledTableRow key={item.pessoaTitular.id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {item.pessoaTitular.nome}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{item.dataCadastro}</StyledTableCell>
                                                    <StyledTableCell align="right">{''}</StyledTableCell>
                                                    <StyledTableCell align="right">{''}</StyledTableCell>
                                                    <StyledTableCell align="right"><Button onClick={() => setOpenVerDetalhes(item.id)} variant="contained" color="secondary"><AssignmentOutlinedIcon /></Button></StyledTableCell>
                                                </StyledTableRow>
                                            )): ''}
                                        </TableBody>
                                    </Table>
                                </TableContainer>



                            </Grid>




                        </Grid>

                    </CardContent>
                </Card>

            </Collapse>

            <Box>
                <DialogHeaderFooter
                    title="Detalhes Ficha de Inspeção de Saúde "
                    idComponent="referencia-detalhes-ficha"
                    handleClickClose={setOpenVerDetalhes}
                    isOpen={isOpenDetalhes}
                    direction="row"
                    closeButton 
                    alignItems="center"
                    maxWidth="md"
                    children={

                        <Grid display="flex" container alignItems="center" >
                            {
                               fichaDetalhes && fichaDetalhes.length ?
                                fichaDetalhes.map((item) => {
                                    console.log(fichaDetalhes)
                                    return <Grid container key={item.id}>


                                        <CardFicha avatar={item.pessoaTitular.foto} ficha={item.pessoaTitular} dtCadastro={item.dataCadastro} />

                                        <div className="Spacer"></div>

                                        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                                                <Typography><h4>IMC</h4></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {/* <Typography>
                                                           IMC
                                                        </Typography> */}
                                                <Grid style={{ width: "100%" }}>
                                                    <List item className="listComponent" display="flex" fullWidth >

                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <FastfoodIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary="Peso" secondary={`${item.peso} Kg`} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <SquareFootIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary="Altura" secondary={`${item.altura} Metros`} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <InsertChartIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary="IMC" secondary={item.imc} />
                                                        </ListItem>

                                                    </List>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                                                <Typography><h4>Comorbidades</h4></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container>
                                                    {item.pessoaTitular.comorbidades ? item.pessoaTitular.comorbidades.map((item) => {

                                                        return <div className="chip">
                                                            <Chip
                                                                avatar={<Avatar>{item.descricao.substr(0, 1)}</Avatar>}
                                                                label={item.descricao}
                                                                clickable
                                                                color="primary"
                                                                onDelete={''}
                                                                deleteIcon={<DoneIcon colorPrimary />}
                                                                variant="outlined"
                                                            />
                                                        </div>

                                                    }) : <Typography color="textSecondary" variant="body1" gutterBottom>
                                                        <span >Paciente sem Comorbidades...</span>
                                                    </Typography>}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                            <AccordionSummary  id="panel3d-header" expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3d-header"
                                                >
                                                <Typography><h4>Perguntas</h4></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>


                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Perguntas</TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell align="right">Respostas</TableCell>
                                                            <TableCell align="right"></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {steps.map((p) => (
                                                            <TableRow key={p.id}>
                                                                <TableCell component="th" scope="row">
                                                                    {p.descricao}
                                                                </TableCell>

                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="right">
                                                                    {item[p.valor] === 'S' ? "SIM" : "NÂO"}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>

                                            </AccordionDetails>
                                        </Accordion>



                                      
                                    </Grid>
                                  

                                }): ''
                            }
                        </Grid>

                    }
                    footer={
                        <Box display="flex">
                            <Box m={1}>
                                <Button onClick={() => handleClickImprimirFicha(fichaDetalhes.id)} variant="contained" color="secondary">Imprimir Ficha</Button>
                            </Box>
                        </Box>
                    }
                />
            </Box>

        </Container >
    )
}



const mapStateToProps = state => ({ open: state.modal.open, usuario: state.usuario, modal: state.modal })
const mapDispatchToProps = dispatch => bindActionCreators({ openModal, changeModal, fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(manterEGenreicar)