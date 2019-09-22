import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, TextField, Typography} from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';

const useStyles = makeStyles(theme => ({
  header:{
    marginBottom: 50,
  },
  searchBar:{
    //padding: theme.spacing(2),
    margin: 'auto',
    width: 500
  }
}));

export const PatientHeader = () => {
  const classes = useStyles();
  const {query, setQuery} = useContext(PatientsContext);
  return (
    <Grid className = {classes.header} container spacing={3}>
      <TextField
        id="patient-search"
        label="Patient Search"
        type="search"
        // value = {query}
        onChange = {(e)=>setQuery(e.target.value)}
        className={classes.searchBar}
        margin="normal"
        variant="outlined"
      />
    </Grid>
    
  );
}