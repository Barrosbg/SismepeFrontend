import React from 'react';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from './title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  context: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#9187878',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 120,
  },
  linkStyle: {
    margin: theme.spacing(1),
  },
}));

export default function Card(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Grid item={true} sm={12} xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Title>{props.title}</Title>
          <div>
            <Link
              color="textSecondary"
              className={classes.linkStyle}
              href="#"
              onClick={preventDefault}
            >
              {props.description}
            </Link>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
