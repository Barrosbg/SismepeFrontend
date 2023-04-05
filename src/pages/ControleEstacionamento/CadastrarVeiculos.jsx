import { Button, Collapse, Container, Card, CardContent, Box, CardHeader, Grid } from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import List from '@mui/material/List';
import CustomizedTables from '../../components/general/CustomizedTables'
import makeStyles from '@mui/styles/makeStyles';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { fetchBackdrop } from '../../actions/geral/actions';
import ModalAtualizarVeiculo from './ModalAtualizarVeiculo';
import { buscarTodosOsVeiculos } from './action.js'
import { cadastrarVeiculo } from './action.js'
import { inativarCadastro } from './action.js'
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import modalConfirmarCancelamentoCad from './modalConfirmarCancelamentoCad';
import MotalAtualizarVeiculo from './ModalAtualizarVeiculo';
import { buscarVeiculosPelaPlaca } from './action.js'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },

    },
    heading: {
        fontSize: '30px'
    }
}));

const CadastarVeiculos = (props) => {

    const classes = useStyles();
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [nome, setNome] = useState(null);
    const [setor, setSetor] = useState(null);
    const [marca, setMarca] = useState(null);
    const [modelo, setModelo] = useState(null);
    const [cor, setCor] = useState(null);
    const [buscaCad, setBuscaCad] = useState([]);
    const [cadId, setCadId] = useState(null);
    const [cadIdCancelamento, setCadIdCancelamento] = useState(null);
    const [hiddenbuscaCad, sethiddenbuscaCad] = useState(false);
    const [defaultClose, setDefaultClose] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [placa, setPlaca] = useState(null);
    const [busca, setBusca] = useState(null);
    const [openModalAtualizarDeletar, setOpenModalAtualizarDeletar] = useState(false);
    const [modalCancelaCad, setModalCancelaCad] = useState(false);
    const [telefone, setTelefone] = useState(null);
    const [cadVeiculo, setCadVeiculo] = useState(null);

    useEffect(async () => {
        console.log("teste")
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let veiculos = await buscarTodosOsVeiculos()
        setListaVeiculos(veiculos)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }, [])

    const handleIdCadcancelamento = (id) => {
        setCadIdCancelamento(id)
        setModalCancelaCad(true)
    };

    const pesquisarCarro = async () => {
        if (busca != null) {
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await buscarVeiculosPelaPlaca(busca)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            console.log(response)
            if (response.status == 200) {
                setBuscaCad(response.data)
                sethiddenbuscaCad(true)
                // setOpenModalAtualizarDeletar(true)
            }else{
                setPlaca(null)
                toast.warn("Nenhum Veiculo Encontrado")
            }
        } else {
            toast.warning("Informe uma placa antes de buscar")
        }

    }

    const handleEditCad = (id) => {
        setCadId(id)
        setOpenModalAtualizarDeletar(true)
    }

  const handleLimparcampos = () =>{
      setNome('')
      setSetor('')
      setTelefone('')
      setMarca('')
      setModelo('')
      setCor('')
      setBusca('')
      setPlaca('')
      setBuscaCad(null)
      sethiddenbuscaCad(false)
  }

    const handleDesabilitarcad = async (id) => {

        let desativarCad = await inativarCadastro(cadIdCancelamento)
        if (desativarCad.status === 200) {
            toast.success("Cadastro Cancelado")

            setBuscaCad([])
            setModalCancelaCad(false)
            setPlaca("")
        }
    }

    const SalvarVeiculo = async () => {

        if (nome && setor && marca && modelo && cor && telefone && placa != null) {
            const payload = {
                nome: nome.toUpperCase(),
                setor: setor.toUpperCase(),
                marca: marca.toUpperCase(),
                modelo: modelo.toUpperCase(),
                cor: cor.toUpperCase().replace("-",""),
                placa: placa.toUpperCase(),
                telefone: telefone.toUpperCase(),
                ativo: "S"

            }
            let response = await buscarVeiculosPelaPlaca(busca)
            if(response.status === 200){
                toast.warn("Usuário já cadastrado")
            }else{
                props.fetchBackdrop('BACKDROP_FETCHED', true);
                let response = await cadastrarVeiculo(payload)
                props.fetchBackdrop('BACKDROP_FETCHED', false);
                if (response.status === 201) {
                    toast.success("Veículo salvo com sucesso")
                    handleLimparcampos()
                    let veiculos = await buscarTodosOsVeiculos()
                    setListaVeiculos(veiculos)
    
                }
            }
        } else {
            toast.warning("Todos os campos precisam ser preenchidos")
        }
    }
    return (
        <Container>
            <Card>
                <CardHeader
                    title="Cadastrar Veículo"
                />
                <CardContent>
                    <Grid container spacing={1} margin="dense" >
                        <Grid item xs={12} md={5} >
                            <TextField
                                label="Nome do proprietário"
                                id="outlined-start-adornment"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                label="Setor do proprietário"
                                id="outlined-start-adornment"
                                value={setor}
                                onChange={e => setSetor(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <TextField
                                label="Telefone"
                                id="outlined-start-adornment"
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <TextField
                                label="Marca do Veículo"
                                id="outlined-start-adornment"
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} >
                            <TextField
                                label="Modelo do Veículo"
                                id="outlined-start-adornment"
                                value={modelo}
                                onChange={e => setModelo(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                label="Cor do Veículo"
                                id="outlined-start-adornment"
                                value={cor}
                                onChange={e => setCor(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <TextField
                                label="placa do veículo"
                                id="outlined-start-adornment"
                                value={placa}
                                onChange={e => setPlaca(e.target.value?.replace("-",""))}
                                fullWidth
                                variant="outlined"
                                size="small"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button variant="contained" color="secondary" fullWidth onClick={SalvarVeiculo}>
                                Salvar
                            </Button>
                        </Grid>


                    </Grid>
                </CardContent>
            </Card >
            <div className="Spacer"></div>
            {openModalAtualizarDeletar &&
                <ModalAtualizarVeiculo setOpenModalAtualizarDeletar={setOpenModalAtualizarDeletar} cadId={cadId} />

            }
            <Card>
                <CardContent>
                    <Grid xs={12} md={12} fullWidth justifyContent="center">
                        <Typography variant="h6" gutterBottom component="div">
                            <IconButton aria-label="expand row" label="Pesquisa" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            Pesquisa
                        </Typography>


                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>

                                <Grid container spacing={2} display="flex">

                                    <Grid item xs={12} md={6} >
                                        <TextField
                                            label="placa do veículo"
                                            id="outlined-start-adornment"
                                            value={busca}
                                            onChange={e => setBusca(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} className="ButtonPrimary">
                                        <Button variant="contained" color="primary" fullWidth onClick={pesquisarCarro}>
                                            Pesquisar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Button variant="contained" color="secondary" fullWidth onClick={handleLimparcampos}>
                                            Limpar
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                            <Collapse in={hiddenbuscaCad}>
                                <List dense="true">

                                    <CustomizedTables
                                        columns={
                                            [
                                                // { size: 3, value: 'Nome' },
                                                // { size: 3, value: 'Placa' },
                                                // { size: 1, value: 'Ações' },
                                            ]}


                                        handleRowsPerPage={''}
                                        handleChangePaginacao={''}
                                        pageDados={''}
                                        rows={
                                            buscaCad && buscaCad.length ?
                                                buscaCad.map((item) => {

                                                    return [
                                                        { size: 3, value: item.nome },
                                                        { size: 3, value: item.placa },
                                                        { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { handleEditCad(item.id) } }, { colorButton: 'BgPrimary', icon: 'deletar', event: () => {handleIdCadcancelamento(item.id)}  }] },

                                                    ]
                                                }) : []
                                        }
                                    />
                                </List>

                            </Collapse>
                        </Collapse>

                    </Grid>
                </CardContent>
            </Card>

            <div className="Spacer"></div>
            <Card>
                <CardHeader
                    title="Lista de Veículos cadastradas"
                />
                <CardContent>
                    <List dense="true">
                        <CustomizedTables
                            columns={
                                [
                                    { size: 3, value: 'Nome' },
                                    { size: 1, value: 'Telefone' },
                                    { size: 2, value: 'Setor' },
                                    { size: 2, value: 'Marca' },
                                    { size: 1, value: 'Modelo' },
                                    { size: 1, value: 'Cor' },
                                    { size: 1, value: 'Placa' },
                                    { size: 1, value: 'Ações' },
                                ]}
                            handleRowsPerPage={''}
                            handleChangePaginacao={''}
                            pageDados={''}
                            rows={
                            listaVeiculos && listaVeiculos.length ?
                                listaVeiculos.map((item) => {

                                    return [
                                        { size: 3, value: item.nome },
                                        { size: 1, value: item.telefone },
                                        { size: 2, value: item.setor },
                                        { size: 2, value: item.marca },
                                        { size: 1, value: item.modelo },
                                        { size: 2, value: item.cor },
                                        { size: 3, value: item.placa },
                                        { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { handleEditCad(item.id) } }, { colorButton: 'BgPrimary', icon: 'deletar', event: () => {handleIdCadcancelamento(item.id) } }] },

                                    ]
                                }) : []
                            }
                        />
                    </List>

                </CardContent>
            </Card>
            <Box>
                <DialogHeaderFooter
                    title="Cancelar Cadastro"
                    idComponent="referencia-familiar"
                    isOpen={modalCancelaCad}
                    handleClose={() => setModalCancelaCad(false)}
                    cancelAction={() => setModalCancelaCad(false)}
                    maxWidth="sm"
                    direction="row"

                    children={
                        <>

                            <Typography >Tem certeza que deseja cancelar esse cadastro?</Typography>

                        </>
                    }
                    footer={

                        <Box display="flex">

                            <Box m={1} >
                                <Button variant="contained" color="secondary" onClick={() => handleDesabilitarcad()}>Sim</Button>
                            </Box>
                            <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="secondary" onClick={() => setModalCancelaCad(false)}>Não</Button>
                            </Box>
                        </Box>
                    }
                />
            </Box>
        </Container>


    )

}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastarVeiculos)
