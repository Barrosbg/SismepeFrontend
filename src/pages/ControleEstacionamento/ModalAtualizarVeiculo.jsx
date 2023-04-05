import {
    Button,
    Collapse,
    Container,
    Card,
    CardContent,
    Box,
    createTheme,
    CardHeader,
    Grid,
    ThemeProvider,
    StyledEngineProvider,
    adaptV4Theme,
} from "@mui/material";
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import { connect } from "react-redux";
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import { atualizarVeiculos } from './action.js'
import { buscarVeiculoPorId } from './action.js'
import { inativarCadastro } from './action.js'
import { toast } from 'react-toastify';
import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form";

const ModalAtualizarVeiculo = (props) => {

    const { setOpenModalAtualizarDeletar, cadId } = props
    const [nome, setNome] = useState("");
    const [setor, setSetor] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cor, setCor] = useState("");
    const [id, setId] = useState("");
    const [placa, setPlaca] = useState("");


    useEffect(async () => {
    
        let veiculo = await buscarVeiculoPorId(cadId);
        if(veiculo.status === 200){
                 setId(veiculo.data.id)
                 setNome(veiculo.data.nome),
                 setSetor(veiculo.data.setor),
                 setTelefone(veiculo.data.telefone),
                 setMarca(veiculo.data.marca),
                 setModelo(veiculo.data.modelo),
                 setCor(veiculo.data.cor),
                 setPlaca(veiculo.data.placa)
        }else{
            toast.error("Problemas ao recuperar cadastro")
            setOpenModalAtualizarDeletar(false)
        }
  
    }, [cadId])

    const atualizarCadastro = async () => {
        if (nome && setor && marca && modelo && cor && telefone && placa != null) {
            const payload = {
                nome: nome.toUpperCase(),
                setor: setor.toUpperCase(),
                marca: marca.toUpperCase(),
                modelo: modelo.toUpperCase(),
                cor: cor.toUpperCase(),
                placa: placa.toUpperCase(),
                telefone: telefone.toUpperCase()

            }
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let response = await atualizarVeiculos(id,payload)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
            if (response.status === 200) {
                toast.success("Veículo atualizado com sucesso")
                setOpenModalAtualizarDeletar(false)

            }
        } else {
            toast.warning("Todos os campos precisam ser preenchidos")
        }
    }

    const cancelarCadastro = async (id) => {

        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let response = await inativarCadastro(id)
        console.log(response)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
        if (response.status == 200) {
            toast.success("Cadastro Inativado")
            setOpenModalAtualizarDeletar(false)
        }



    }

    const theme = createTheme(adaptV4Theme({
        palette: {
            primary: {
                main: green[600],
            },
        },
    }));

    
    return (
        <Container>


            <Box>
                <DialogHeaderFooter
                    title="Veículo Cadastrado"
                    idComponent="referencia-familiar"
                    isOpen={() => setOpenModalAtualizarDeletar(true)}
                    handleClickClose={() => setOpenModalAtualizarDeletar(true)}
                    direction="row"
                    alignItems="center"
                    maxWidth="sm"
                    children={
                        <>
                            <Grid display="flex" container alignItems="center" spacing={2} >
                             
                                       
                                            <>
                                                <Grid item xs={12} md={12} justifyContent="center">
                                                    <TextField
                                                        label="Nome do proprietário"
                                                        id="outlined-start-adornment"
                                                        value={nome}
                                                        fullWidth
                                                        onChange={(e)=> setNome(e.target.value) }
                                                        variant="outlined"
                                                        size="small"
                                                        
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Setor"
                                                        id="outlined-start-adornment"
                                                        value={setor}
                                                        fullWidth
                                                        onChange={(e)=>setSetor(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Telefone"
                                                        id="outlined-start-adornment"
                                                        value={telefone}
                                                        fullWidth
                                                        onChange={(e)=>setTelefone(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="marca"            
                                                        id="outlined-start-adornment"
                                                        value={marca}
                                                        fullWidth
                                                        onChange={(e)=>setMarca(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Modelo"                                                    
                                                        id="outlined-start-adornment"
                                                        value={modelo}
                                                        fullWidth
                                                        onChange={(e)=>setModelo(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Cor"                                                       
                                                        id="outlined-start-adornment"
                                                        value={cor}
                                                        fullWidth
                                                        onChange={(e)=>setCor(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField
                                                        label="Placa"                                                        
                                                        id="outlined-start-adornment"
                                                        value={placa}
                                                        fullWidth
                                                        onChange={(e)=>setPlaca(e.target.value)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <div className="Spacer"></div>
                                        
                                            </>
                                     
                             
                            </Grid>

                        </>
                    }
                    footer={

                        <Grid container justifyContent="space-around" >
                            {/* <Collapse> */}
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={theme} >
                                    <Box m={0.5}>
                                        <Button
                                            onClick={() => atualizarCadastro()}
                                            variant="contained"
                                            color="primary"

                                        >Salvar Atualização</Button>
                                    </Box>

                                </ThemeProvider>
                            </StyledEngineProvider>

                            {/* </Collapse> */}
                            <Box m={1} className="ButtonPrimary" >
                                <Button variant="contained" color="success" onClick={() => setOpenModalAtualizarDeletar(false)}>Fechar</Button>
                            </Box>
                        </Grid>

                    }
                />
            </Box>
        </Container>
    );


}
const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAtualizarVeiculo)
