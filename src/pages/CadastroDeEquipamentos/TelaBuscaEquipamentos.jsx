import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, IconButton, Paper, TextField, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Table from '../../components/table/table';
import { connect } from "react-redux";
import TextFieldAutocomplete from '../../components/general/autocomplete'
import MuiAlert from '@mui/material/Alert';
import { bindActionCreators } from 'redux';
import makeStyles from '@mui/styles/makeStyles';
import { fetchBackdrop } from '../../actions/geral/actions';
import { toast } from 'react-toastify';
import CustomizedTables from '../../components/general/CustomizedTables'
import moment from 'moment'
import CircleIcon from '@mui/icons-material/Circle';
import CardMedia from '@mui/material/CardMedia';
import BallotIcon from '@mui/icons-material/Ballot';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import { Circle } from '@mui/icons-material';
import { buscarEquipamento, buscarEquipamentoNumSerieAndLAncamento, buscarTodosEquipamentos } from './action';
import ModalVisualizarLancamentos from './ModalVisualizarLancamentos';
moment.locale('en')
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TelaBuscaEquipamentos = (props) => {



    const classes = useStyles();
    const [equipamentos, setEquipamentos] = useState([])
    const [cdEquipamento, setCdEquipamento] = useState(null)
    const [item, setItem] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [tablePagination, setTablePagination] = useState({
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
        first: false,
        last: false
    });



    // useEffect(async () => {
    //     props.fetchBackdrop('BACKDROP_FETCHED', true);
    //     let Equipamentos = await buscarTodosEquipamentos()
    //     setEquipamentos(Equipamentos)
    //     props.fetchBackdrop('BACKDROP_FETCHED', false);
    // }, [])

    const closeFunction = (e) => {
        setModalOpen(e)

    }

    const handleOpenModal = (e) => {
        setModalOpen(true)
        setItem(e)
    }

    const RenderizarBotaoAdicionarlancamento = () => {
        return (
            <Tooltip title="Adicionar Lançamento">
                <IconButton>
                    <ArrowCircleUpIcon />
                </IconButton>
            </Tooltip>
        )
    }
    const RenderizarBotaoVisualizarlancamentos = (e) => {
        return (
            <Tooltip title="Ver Lançamentos ">
                <IconButton onClick={() => handleOpenModal(e)}>
                    <BallotIcon />
                </IconButton>
            </Tooltip>
        )
    }


    const changeEquipamento = (e) => {
        setEquipamentos([e])
        setOpenInfo(true)
    }

    const handleOpenCard = (e) => {
        setModalOpen(true)
        setItem(e)
    }



    return (

        <Container maxWidth="lg" sx={{ width: 1000 }}>

            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} >
                    <Card >
                        <CardHeader
                            title="Buscar Equipamentos"
                        />
                        <CardContent>

                            <Grid item xs={12} sm={12} >
                                <Grid item xs={12} md={4} sm={6} mt={1} >
                                    <TextFieldAutocomplete 
                                    id="Matricula" 
                                    value={cdEquipamento} 
                                    label="N° Série" 
                                    actionFilter={buscarEquipamentoNumSerieAndLAncamento} 
                                    actionChangeOption={changeEquipamento} 
                                    getOptionLabel={(option) => option.tipo_equipamento + '-' + option.numeroSerie} 
                                    />
                                </Grid>


                                <Grid item xs={12} md={4}  >
                                    <Button variant="contained" color="secondary" fullWidth onClick={""}>
                                        Buscar Exame
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className="Spacer"></div>

                    <Grid item xs={12} sm={12} >
                        <Collapse in={openInfo}>
                            <Card raised elevation={1}>
                                <CardHeader
                                    title="Buscar Equipamentos"
                                />
                                <CardContent>

                                    <Grid container spacing={2}>
                                        {equipamentos?.map((item, key) => {
                                            return (

                                                <Card onClick={() => handleOpenCard(item)} sx={{ maxWidth: 350, maxHeight: 250, margin: 1 }} raised elevation={10} style={{ borderRadius: "16px", display: "flex" }} >
                                                    <CardActionArea>
                                                        <CardHeader
                                                            title={`${item.tipo_equipamento}`}
                                                            sx={{ background: item.status === "L" ? '#1ABC9C' : '#85C1E9', color: '#FFFFFF', display: 'flex', justifyContent: 'center' }}

                                                        />
                                                        <CardContent>
                                                            <Box display="flex" flexDirection="column" flexWrap>
                                                                <Box minWidth={100} width={200} justifyContent="flex-start">
                                                                    <Typography variant="subtitle1">
                                                                        {`Numero Patrimonio:${item.patrimonioNumero}`}
                                                                    </Typography>
                                                                    <Typography variant="subtitle2" color="textSecondary">
                                                                        {`Numero Serie:${item.numeroSerie}`}
                                                                    </Typography>
                                                                    <Box display="flex" alignItems="center">
                                                                        <Typography variant="subtitle2" color="textSecondary">
                                                                            {"Status:"}
                                                                        </Typography>
                                                                        {/* <Circle style={{ color: item.status === "L" ? "#32CD32" : item.status === "R" ? "#FF4500" : item.status === "A" ? "#FF0000" : "#00BFFF" }} /> */}
                                                                        <Typography variant="subtitle2" color="textSecondary">
                                                                            {item.status === "L" ? "LIVRE" : item.status === "R" ? "RECOLHIDO" : item.status === "A" ? "EM ANÁLISE" : "ENTREGUE"}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                {/* <Box flexShrink={0} justifyContent="flex-end" alignSelf="center" sx={{ display: 'inline-flex' }}>
                                                                    {RenderizarBotaoAdicionarlancamento()}
                                                                    {RenderizarBotaoVisualizarlancamentos(item)}
                                                                </Box> */}




                                                            </Box>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>





                                            )
                                        })}



                                    </Grid>

                                </CardContent>
                            </Card>
                        </Collapse>

                    </Grid>
                </Grid>
            </Grid>
            {modalOpen && <ModalVisualizarLancamentos setModalOpen={modalOpen} item={item} closeFunction={(e) => closeFunction(e)} />}
        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TelaBuscaEquipamentos)
