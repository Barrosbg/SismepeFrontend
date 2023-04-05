import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import { connect } from "react-redux";
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { bindActionCreators } from 'redux';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import makeStyles from '@mui/styles/makeStyles';
import ModalAutorizaVeiculo from './ModalAutorizaVeiculo';
import ModalSaidaDeVeiculo from './ModalSaidaDeVeiculos';

import ModalQtdVeiculo from './ModalQtdVeiculos';
import SimpleCard from './cardModal';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../actions/geral/actions';
import { buscarVeiculosPelaPlaca } from './action.js'
import { adicionarTotalVeiculosEstacionados } from './action.js'
import { BuscarTotalVeiculosEstacionados } from './action.js'
import { buscarPorPlacaVeicolosComEntrada } from './action.js'
import { buscarVeiculosEstacionados } from './action.js'
import { buscarTodosRegistrosDeEntrada } from './action.js'
import { toast } from 'react-toastify';
import CustomizedTables from '../../components/general/CustomizedTables'
import moment from 'moment'
// import 'date-fns/locale/pt-BR'
// import 'moment/locale/pt-br'  // without this line it didn't work
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

const CadastarVeiculos = (props) => {



    const classes = useStyles();
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [listaSaidaVeiculos, setListaSaidaVeiculos] = useState([]);
    // const [setor, setSetor] = useState('');
    // const [marca, setMarca] = useState('');
    // const [modelo, setModelo] = useState('');
    const [hiddenbtn, setHiddenbtn] = useState(false);
    const [Inicio, setInicio] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [placa, setPlaca] = useState(null);
    const [validarVeiculo, setValidarVeiculo] = useState(null);
    const [validarVeiculoSaida, setValidarVeiculoSaida] = useState(null);
    
    const [totalEstacionados, setTotalEstacionados] = useState(null);
    const [ExibirCard, setExibirCard] = useState(true);
    const [modalQtdVeiculo, setModalQtdVeiculo] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenSaida, setModalOpenSaida] = useState(false);
    const [vagasLivre, setVagasLivre] = useState(null);
    const [qtdVagas, setQtdVagas] = useState(null);
    const [totalVagas, setTotalVagas] = useState(125);

    // useEffect(async () => {
       
    //     let registros = await BuscarTotalVeiculosEstacionados();
    //     let totalEstacionados = await buscarVeiculosEstacionados();
    //     console.log(totalEstacionados)
    //     if (qtdVagas === null &&  registros === 204) {
    //         setModalQtdVeiculo(true)
    //     }else{
    //         setModalQtdVeiculo(false)
    //         setExibirCard(true)
    //         setInicio(registros.totalVeiculos)
    //         if (registros.totalVeiculos > 0) {
    //             let totalLivres = totalVagas - (totalEstacionados +registros.totalVeiculos );
    //             setTotalEstacionados(totalEstacionados + registros.totalVeiculos);
    //              setVagasLivre(totalLivres)
               
    //         } else {
    //             let totalLivres = (totalVagas - totalEstacionados);
    //             setTotalEstacionados(totalEstacionados);
    //             setVagasLivre(totalLivres)
               
    //         }
    //     }
      


    // }, [validarVeiculo])

    // let vagasLivre = totalVagas - qtdVagas;
    const handleRegistraTotal = async () => {
        let totalEs = parseInt(totalEstacionados)
        let qtdVaga = parseInt(qtdVagas)
        let qtdVagaLivres = parseInt(qtdVagas)
        let total = totalEs + qtdVaga
        let totalLivres = (totalVagas - total) 
        console.log(totalLivres)
        if(qtdVagas !== null){
            if (isNaN(total)) {
                let totalEstacionados = await buscarVeiculosEstacionados();
                setTotalEstacionados(totalEstacionados);
                setVagasLivre(totalLivres)
            } else {
                setTotalEstacionados(total);
                setExibirCard(true)
                setVagasLivre(totalLivres)
                const payload = {
                    dataEntrada: moment().format('yyyy-MM-DD HH:mm:ss'),
                    totalVeiculos: qtdVaga,
                }
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let response = await adicionarTotalVeiculosEstacionados(payload)
                props.fetchBackdrop('BACKDROP_FETCHED', false); 
                if(response.status === 201){
                    toast.success("Vagas ocupadas adicionadas")
                    setModalQtdVeiculo(false)
                }
            }

         
        }else{
            toast.warning("È preciso informar a quantidade de carros para liberar o sistema")
        }

    }

    const liberarEntrada = (item) => {
        setModalOpenSaida(true)
        setValidarVeiculo(item)
    };
    
    const handleChangePlaca = (e) =>{
        // setPlaca(e.target.value.toUpperCase())
        console.log("Não tem caracter",e)
        let regexp = "^[a-zA-Z0-9._\b]+$"
        if(!e.match(regexp)){
            console.log("Contem caracter")
            e.replace("-", "")
            setPlaca(e)
            console.log(placa)
          }else{
            console.log("Não tem caracter",e)
          }
        
    }
    const buscarVeiculo = async () => {
          let PlacaFormatada = null
        if(placa.indexOf('-') != -1){
            PlacaFormatada = placa.replace("-","");
      
        }else{
            PlacaFormatada = placa
        }

        if (PlacaFormatada != null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await buscarVeiculosPelaPlaca(PlacaFormatada)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(PlacaFormatada)
            if (response.status === 200) {
                setValidarVeiculo(response.data)
                setModalOpen(true)
                
            } else if (response === 204) {

                toast.warning("Veiculo já estacionado")
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let response = await buscarVeiculosPelaPlaca(placa)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
                setValidarVeiculo(response.data)
                setModalOpenSaida(true)
            } else {
                toast.warning("Nenhum Veículo encontrado")
            }
        } else {
            toast.warning("Informe uma placa antes de buscar")
        }

    }

    const registrarSaidaDeVeiculos = (item) => {

    }

    return (

        <Container>
            {modalQtdVeiculo &&
                <ModalQtdVeiculo setModalQtdVeiculo={setModalQtdVeiculo} handleRegistraTotal={handleRegistraTotal} setQtdVagas={setQtdVagas} />
            }
         
            <Collapse in={ExibirCard}>
                <Card>
                    <CardHeader
                        title="Autorizar Veículo"
                    />
                    <CardContent>

                        <Grid container spacing={1} display="flex" >
                            <Grid item xs={12} md={5} >
                                <TextField
                                    label="Informe a placa do Veículo"
                                    id="outlined-start-adornment"
                                    value={placa}
                                    fullWidth
                                    onChange={e => setPlaca(e?.target?.value)}
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                />
                            </Grid>

                            <Grid item  xs={12} md={4}  >
                                <Button variant="contained" color="secondary" fullWidth onClick={buscarVeiculo}>
                                    Buscar Veículo
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <div className="Spacer"></div>
                {/* <Card>
                    <CardContent>
                        <Grid xs={12} md={12} fullWidth >
                            <Typography variant="h6" gutterBottom component="div">
                                <IconButton aria-label="expand row" label="Pesquisa" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                Vagas Ocupadas
                            </Typography>


                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>

                                    <Grid container spacing={2} display="flex">

                                        <Collapse in={hiddenbtn}>
                                            <Grid item xs={6} md={6} >
                                                <TextField
                                                    label="placa do veículo"
                                                    id="outlined-start-adornment"
                                                    value={''}
                                                    onChange={''}
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    margin="dense"
                                                />
                                            </Grid>
                                        </Collapse>

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button variant="contained" color="secondary" fullWidth onClick={() => setModalQtdVeiculo(true)}>
                                            Informar Vagas Ocupadas
                                        </Button>
                                    </Grid>

                                </Box>
                            </Collapse>

                        </Grid>
                    </CardContent>
                </Card> */}
                <div className="Spacer"></div>
                {/* <Card >
                    <CardContent> */}
                        <Grid xs={12} md={12} sm={12} fullWidth >
                            {/* <Typography variant="h6" gutterBottom component="div">
                                Vagas
                            </Typography> */}
                            <Grid container display="flex" justifyContent="space-around">

                                {/* <SimpleCard quantidade={totalEstacionados} setQtdVagas={setQtdVagas} cor={"#df5050"} texto={"Ocupadas"} texColor={"#F0FFFF"}></SimpleCard> */}
                                {/* <SimpleCard quantidade={vagasLivre <0?0:vagasLivre} cor={"#3CB371"} texto={"Livres"} texColor={"#F0FFFF"}></SimpleCard>
                                <SimpleCard quantidade={totalVagas} cor={"#6495ED"} texto={"Total"} texColor={"#F0FFFF"}></SimpleCard> */}
                            </Grid>


                        </Grid>
                    {/* </CardContent>
                </Card> */}


                {modalOpen &&
                    <ModalAutorizaVeiculo setModalOpen={setModalOpen} validarVeiculo={validarVeiculo} setValidarVeiculo={setValidarVeiculo} />
                }
                {modalOpenSaida &&
                    <ModalSaidaDeVeiculo setModalOpenSaida={setModalOpenSaida} validarVeiculo={validarVeiculo} setValidarVeiculo={setValidarVeiculo} />
                }

                <div className="Spacer"></div>

            </Collapse>

            {/* <Collapse in={registrosDodia}>
                <Card>
                    <CardHeader
                        title="Veículos no Estacionamento"
                    />
                    <CardContent>

                        <List dense="true">
                        
                            <CustomizedTables
                                columns={
                                    [
                                        { size: 3, value: 'Nome' },
                                        { size: 1, value: 'Telefone' },
                                        { size: 2, value: 'Setor' },
                                        { size: 2, value: 'Modelo' },
                                        { size: 1, value: 'Placa' },
                                        { size: 1, value: 'Situação' },
                                        { size: 1, value: 'Horário Entrada' },
                                        { size: 1, value: 'Ações' },
                                    ]}
                           

                                handleRowsPerPage={''}
                                handleChangePaginacao={''}
                                pageDados={''}
                                rows={
                                    
                                    listaVeiculos && listaVeiculos.length ?
                                        listaVeiculos.map((item) => {

                                            return [
                                                { size: 3, value: item.cadastroCarros.nome.toUpperCase() },
                                                { size: 1, value: item.cadastroCarros.telefone.toUpperCase() },
                                                { size: 2, value: item.cadastroCarros.setor.toUpperCase() },
                                                { size: 1, value: item.cadastroCarros.modelo.toUpperCase() },
                                                { size: 3, value: item.cadastroCarros.placa.toUpperCase() },
                                                { size: 3, value: item.situacaoEntrada == 'E' ? 'ENTRADA' : 'SAIDA' },
                                                { size: 3, value: item.data_entrada },
                                                { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'exit', event: () => { liberarEntrada(item) } }] },



                                            ]
                                        }) : []
                                }
                            />


                        </List>


                    </CardContent>
                </Card>
            </Collapse> */}
        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastarVeiculos)
