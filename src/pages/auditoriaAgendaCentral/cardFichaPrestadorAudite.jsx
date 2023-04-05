import React, { useEffect } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, TextField, Grid, Icon, IconButton, Tooltip, Typography } from "@mui/material";


export default function CardFicha(props) {
    // const ficha = props.ficha.pessoatitular ? props.ficha.pessoatitular : ''


    const [expanded, setExpanded] = React.useState(false);

    useEffect(async () => {
        console.log(props)
    }, [])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Card>
                <Typography variant="h5" gutterBottom>
                    Prestador
                </Typography>
                <CardContent>
                    <Grid container fullWidth>
                        {/* <Grid item sm={12} md={3}  >
                            <CardMedia style={{ textAlign: "center", backgroundColor: "#4F92FF", padding: 10, height: "100%", borderRadius: 10 }}>
                                <Avatar style={{ height: '170px', width: '170px', marginLeft: "auto", marginRight: "auto", marginTop: "25px" }} src={props.escala?.prestador?.pessoa?.foto}></Avatar>
                            </CardMedia>
                        </Grid> */}
                        <Grid item sm={12} md={12}  >

                            <Grid container spacing={1} >

                                <Grid item xs={12} sm={6} >
                                    <TextField id="outlined-basic" label="Nome" value={props.escala?.prestador?.pessoa.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>
                                <Grid item xs={12} sm={2} >
                                    <TextField id="outlined-basic" label="Matricula" value={props.escala?.prestador?.pessoa?.matricula} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>
                                <Grid item xs={12} sm={2} >
                                    <TextField id="outlined-basic" label="Conselho" value={props.escala?.prestador?.numeroConselho} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>

                                <Grid item xs={12} sm={2} >
                                    <TextField id="outlined-basic" label="Corpo Clinico" value={props.escala?.prestador?.corpoClinico === 'S' ? "Sim" : "Não"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>
                                <Grid item xs={12} sm={3} >
                                    <TextField id="outlined-basic" label="Posto" value={props.escala?.prestador?.pessoa?.posto?.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>
                                <Grid item xs={12} sm={2} >
                                    <TextField id="outlined-basic" label="Telefone" value={props.escala?.prestador?.pessoa?.telefone} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <Typography variant="h5" gutterBottom>
                    Detalhes da Escala
                </Typography>
                <CardContent>
                    <Grid container spacing={1} >

                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Id" value={props.escala?.escala?.id} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Data de Inclusão" value={props.escala?.escala?.dataInclusao} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Número de dias da semana" value={props.escala?.escala?.nrdiaSemana} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>

                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Número Max de Agendamento" value={props.escala?.escala?.nrmaxAgendamento} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Permitir Ag na Recepção" value={props.escala?.permiteAgendamentoRecepcao === 'S' ? "Sim" : "Não"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Permitir Encaixe" value={props.escala?.escala?.permiteEncaixe === 'S' ? "Sim" : "Não"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Permitir Ag Volta" value={props.escala?.escala?.snAgendamentoVolta === 'S' ? "Sim" : "Não"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <TextField id="outlined-basic" label="Und Atendimento" value={props.escala?.escala?.unidadeAtendimento} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}