import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, Fab, Button, Container, TextField, Grid, Box } from '@mui/material';
import { fetchBackdrop } from '../../actions/geral/actions';
import { filtrarFichaPorId } from './actions';
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import consts from "../../constants";
import Divider from '@mui/material/Divider';
import moment from 'moment';
import DialogHeaderFooter from '../../components/general/dialogHeaderFooter';
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work
moment.locale('pt') // without this line it didn't work

function validaGuiaExames(props) {

    const [numeroFicha, setNumeroFicha] = useState(null);
    const [ficha, setFicha] = useState([]);
    const [pacienteBusca, setPacienteBusca] = useState(null)
    const [ExibirListaExames, setExibirListaExames] = useState(false);
    const [hidden, sethidden] = useState(false);
    const [hiddenBtnAdicionar, setHiddenBtnAdicionar] = useState(true);
    const [ModalOpen, setModalOpen] = useState(false);


    const ChangeNumeroFicha = async (num) => {
        let id = num.target.value
        setNumeroFicha(id)

    }
    const buscarFicha = async () => {
        let valida = await filtrarFichaPorId(numeroFicha.replace(/^0+/, ''))
        if (valida.status === 200) {
            setFicha([valida.data])
            setModalOpen(true)
            setNumeroFicha('')
        }

    }
    const verificaAprovacao = (id) =>{
        
        let situacao = ''
        switch(id){
            case 'A':
                situacao = "APROVADO";
            break;
            case 'S':
                situacao = "SOLICITADO";
            break;        
        }

        return situacao

    }


    return (

        <Container>
            <Card>
                <CardHeader
                    title="Validar Ficha de Solicitação de Exame"
                />
                <CardContent>
                    <Grid spacing={1}xs={12} md={12} alignItems='center' justifyContent='center' display="flex">
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" fullWidth value={numeroFicha} onChange={ChangeNumeroFicha} size="small" label="N° Ficha" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarFicha}>Buscar Ficha</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <DialogHeaderFooter
                title="Solicitação de Exame"
                idComponent="referencia-familiar"
                handleClickClose={setModalOpen}
                isOpen={ModalOpen}
                direction="row"
                closeButton
                alignItems="center"
                maxWidth="md"
                children={
                    <Grid display="flex" container alignItems="center" >
                        {
                            ficha && ficha.length ? ficha.map((item) => {
                                console.log("ei", ficha)
                                return (
                                    <Grid container spacing={2}>
                                        <Grid container display="flex" spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="outlined-basic" fullWidth disabled label="Paciente" value={item.paciente.pessoa.nome} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField id="outlined-basic" fullWidth disabled label="Dt Nascimento" value={item.paciente.pessoa.dataNascimento} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField id="outlined-basic" fullWidth disabled label="Sexo" value={item.paciente.pessoa.sexo === 'M' ? "Masculino" : "Feminino"} variant="outlined" margin="dense" />
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container display="flex" spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField id="outlined-basic" fullWidth disabled label="OME" value={item.ome.descricao} variant="outlined" margin="dense" />
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container display="flex" spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="outlined-basic" fullWidth disabled label="Prestador Solicitante" value={item.prestadorSolicitante.nome} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField id="outlined-basic" fullWidth disabled label="Conselho" value={item.prestadorSolicitante.numeroConselho} variant="outlined" margin="dense" />
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container display="flex" spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField id="outlined-basic" fullWidth disabled label="CID" value={item.cid.abreviacao} variant="outlined" margin="dense" />
                                            </Grid>
                                        </Grid>
                                        <Grid container display="flex" spacing={2}>
                                            {item.itSolicitacoes.map((item, id) => {
                                                return (
                                                    <>
                                                        <Grid item xs={12} sm={4}>
                                                            <TextField id="outlined-basic" fullWidth disabled label={"Especificação"} value={item.procedimento.especificacao} variant="outlined" margin="dense" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <TextField id="outlined-basic" fullWidth disabled label={"Referencia"} value={item.procedimento.referencia} variant="outlined" margin="dense" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <TextField id="outlined-basic" fullWidth disabled label={"Grupo"} value={item.procedimento.grupo.descricao} variant="outlined" margin="dense" />
                                                        </Grid>
   
                                                    </>

                                                )
                                            })}
                                        </Grid>
                                        <Grid container display="flex" spacing={2}>
                                            <Grid item xs={12} sm={3}>
                                                <TextField id="outlined-basic" fullWidth disabled label={"Justificativa"} value={item.justificativa} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <TextField id="outlined-basic" fullWidth disabled label={"Dt de Cadastro"} value={item.dataCadastro} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <TextField id="outlined-basic" fullWidth disabled label={"Dt Validade"} value={item.dataValidade} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <TextField id="outlined-basic" fullWidth disabled label={"Situação"} value={verificaAprovacao(item.situacao)} variant="outlined" margin="dense" />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField id="outlined-basic" fullWidth disabled label={"N° Ficha"} value={item.formatedId} variant="outlined" margin="dense" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            }) : []}
                    </Grid>
                }
                footer={
                    <Box display="flex">
                        <Box m={1} className="ButtonPrimary" >
                            {/* <Button onClick={this.handleClickSalvarENovo} variant="outlined" color="success">Salvar e Continuar</Button> */}
                        </Box>
                        <Box m={1} className="fabButton " >
                            {/* <Button onClick={this.handleSalvarCadastro} variant="outlined" color="primary">Salvar</Button> */}
                        </Box>
                    </Box>
                }
            />


        </Container>
    )

}

export default (validaGuiaExames);