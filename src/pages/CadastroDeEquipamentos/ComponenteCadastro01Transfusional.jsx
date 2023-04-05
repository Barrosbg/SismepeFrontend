import React from "react";

export default function Tela (){

    return  <Card>
        <CardContent>
            <Grid container spacing={5} margin="dense" >
                <Grid item xs={12} md={3} >
                    Quantidade de Unidades
                    <div>
                        <TextField
                            label="Medida"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>

                    <div>
                        <TextField
                            label="Quantidade"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={2} >
                    Componentes Modificados
                    <div>
                        sdf <CheckBox />
                        sdf <CheckBox />
                    </div>
                    <div>
                        sdf <CheckBox />
                        sdf <CheckBox />
                    </div>
                    <div>
                        sdf <CheckBox />
                    </div>
                </Grid>

                <Grid item xs={12} md={1.8} >Resultado de Exame
                    Data *
                    <div>
                        <TextField
                            label="Data *"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                    HB g/DL*
                    <div>
                        <TextField
                            label="HB g/DL*"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                    HT % *
                    <div>
                        <TextField
                            label="HT % *"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                    Plaquetas/mm³
                    <div>
                        <TextField
                            label="P. /mm³"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={1.3} ><div className="Spacer"></div>
                    INR
                    <div>
                        <TextField
                            label="INR"
                            id="outlined-start-adornment"
                            value={""}
                            onChange={""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="dense"
                        />
                    </div>
                </Grid>
            </Grid>
        </CardContent>
    </Card>

}