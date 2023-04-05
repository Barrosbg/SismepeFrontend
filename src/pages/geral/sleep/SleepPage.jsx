import React, { Component } from 'react';
import ReactLoading from "react-loading";
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
    root: {
      minWidth: "100%",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
});

export default function SleepPage(){
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Grid
              container
              className={classes.root}
              alignItems="center"
              justifyContent="center"
            >
                <ReactLoading type="spinningBubbles" color="#4253af" />
            </Grid>                
        </Container>
    );
   
}
