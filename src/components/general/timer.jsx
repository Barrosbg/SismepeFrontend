import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import ProgressoCircularComTexto from './progressoCircularComTexto';


const useStyles = makeStyles({
  description: {
    width: '100%',
    textAlign: 'center',
    marginTop: '20px'
  }
});

function formatTime(time) {
  return `${parseFloat(Math.abs(time)).toFixed(1)}s`;
}

export default function Timer({startTime = 30, description, showText = true, height = 100, thickness = 4, color="primary"}) {

  const [time, setTime] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    let intervalId = time > 0 && setTimeout(() => setTime(time - 0.01 - 0.100), 100);
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => setTime(startTime), []);

  return <>
    <Typography
      variant="overline"
      display="block"
      className={classes.description}
    >
      {description}
    </Typography>

    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <ProgressoCircularComTexto
        height={height}
        thickness={thickness}
        value={(100 / startTime) * time}
        valueText={showText ? formatTime(time) : ""}
        color={color}
      />
    </Grid>
  </>;
}