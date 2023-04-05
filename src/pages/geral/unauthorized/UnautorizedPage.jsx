import React, { Component } from 'react';
import ReactLoading from "react-loading";
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles({
    root: {
      minWidth: "100%",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
});

export default function UnauthorizedPage(){
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Grid                     
              className={classes.root}
              alignItems="center"
              justifyContent="center"
            >
                <Alert severity="error">
                    <AlertTitle>Não Autorizado</AlertTitle>
                    Você não tem permissão para acessar essa página!
                </Alert>
                
            </Grid>                
        </Container>
    );
   
}
