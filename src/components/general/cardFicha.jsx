import React from "react"
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, TextField, Grid, Icon, IconButton, Tooltip, Typography } from "@mui/material";
export default function CardFicha(props) {
    // const ficha = props.ficha.pessoatitular ? props.ficha.pessoatitular : ''
    return (
        <Card>
    {/* style={{border:"1px solid red"}}  */}
           <CardContent>
                <Grid container fullWidth>
                    <Grid item sm={12} md={3}  >
                        <CardMedia style={{ textAlign: "center", backgroundColor: "#4F92FF", padding: 10, height:"100%", borderRadius:10}}>
                            <Avatar style={{ height: '170px', width: '170px', marginLeft: "auto", marginRight: "auto" , marginTop:"25px"  }} src={props.avatar}></Avatar>
                        </CardMedia>
                    </Grid>
                    <Grid item sm={12} md={9}  >

                        <Grid container spacing={1} >
                            <Grid item xs={12} sm={6} >
                                <TextField id="outlined-basic" label="Nome" value={props.ficha.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={3} >
                                <TextField id="outlined-basic" label="CPF" value={props.ficha.cpf} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={3} >
                                <TextField id="outlined-basic" label="Dt Nascimento" value={props.ficha.dataNascimento} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField id="outlined-basic" label="Nome Mãe" value={props.ficha.nomeMae} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField id="outlined-basic" label="Nome Pai" value={props.ficha.nomepai} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={3} >
                                <TextField id="outlined-basic" label="Est Civil" value={props.ficha.estadoCivil} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>

                            <Grid item xs={12} sm={3} >
                                <TextField id="outlined-basic" label="Matricula" value={props.ficha.matricula} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>

                            <Grid item xs={12} sm={2} >
                                <TextField id="outlined-basic" label="Corporação" value={props.ficha.corporacao == 6 ? "PMPE" : "CBPE"} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <TextField id="outlined-basic" label="Dt da Inspeção" value={props.dtCadastro} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField id="outlined-basic" label="Posto" value={props.ficha.posto.nome} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField id="outlined-basic" label="Ome" value={props.ficha.ome ? props.ficha.ome.descricao : ''} disabled variant="outlined" placeholder="Titular" fullWidth={true} margin="dense" />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                </CardContent>
        </Card>
    )
}