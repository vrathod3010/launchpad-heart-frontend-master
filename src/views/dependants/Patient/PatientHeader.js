import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {Add, Edit} from '@material-ui/icons';
import { PatientsContext } from 'contexts/patient/PatientsContext';

const useStyles = makeStyles(theme => ({
  header:{
    marginBottom: 50,
  },
  searchBarContainer: {
    display: 'flex',
  },
  searchBar:{
    //padding: theme.spacing(2),
    margin: 'auto',
    width: 500
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export const PatientHeader = () => {
  const classes = useStyles();
  const {setQuery} = useContext(PatientsContext);
  const {editFlag, setEditFlag} = useContext(PatientsContext);
  const {selectedPatient} = useContext(PatientsContext);
  return (
    <Grid className = {classes.header} container spacing={3}>
      <Grid item className = {classes.searchBarContainer} xs={9}>
        <TextField
          id="patient-search"
          label="Patient Search"
          type="search"
          defaultValue = ""
          onChange = {(e)=>setQuery(e.target.value)}
          className={classes.searchBar}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <Button className={classes.button} variant="contained" color="primary">
          Add
          <Add />
        </Button>
        {!selectedPatient?"":
        <Button className={classes.button} variant="contained" color="primary" onClick={()=>setEditFlag(!editFlag)}>
          Edit
          <Edit />
        </Button>}
      </Grid> 
    </Grid>
    
  );
}