import React from 'react';
import { Grid } from '@material-ui/core';
import {Details} from '../../Component'
import useStyles from './styles';

const Analatics = () => {
    const classes = useStyles();
  return (
    <div>
      <Grid className={classes.grid} container spacing={0} alignItems="center" 
      justifyContent="center">
        <Grid item xs={12} sm={5} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={5}  className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.last}  >
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Analatics