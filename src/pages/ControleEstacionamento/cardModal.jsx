import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { white } from '@mui/material/colors';
import { black } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { props } from 'rambda';
import { CardHeader, Grid } from '@mui/material';


export default function SimpleCard(props) {
    const useStyles = makeStyles({
        root: {
            minWidth: 300,
            Width: 350,
            maxHeight: 80,
            backgroundColor: props.cor,
            border:"2px solid white",
            borderRadius: 23,
            marginBottom: 12,
            // boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.5)"
        },

        card: {
            textAlign: 'center',
            fontSize: 34,
            color: props.texColor

        },

        title: {
            textAlign: 'center',
            fontSize: 34,
            color: props.texColor

        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = useStyles();

    return (

        <Card className={classes.root} >
            <CardHeader
                className={classes.title}
                title={`${props.texto} : ${props.quantidade}`}

            />
            {/* <CardContent  >
                <Typography className={classes.card} variant="h2" color={props.color} gutterBottom>
                    {props.quantidade}
                </Typography>

            </CardContent> */}
        </Card>

    );
}
