import React, { useEffect } from 'react'
import { PatientsProvider } from '../../../contexts/patient/PatientsContext';
import {PatientList} from './PatientList';
import {PatientInfoTabs} from './PatientInfoTabs';
import {PatientHeader} from './PatientHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Container, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grid:{
    display: 'flex'
  },
  gridItem:{
    backgroundColor: "#edf4ff",
  },
  divider:{
    flexBasic: '5%'
  }
}));

export const PatientContainer = () => {
  const classes = useStyles();
  return (
    <PatientsProvider>
      <Grid container spacing={3}>
        <PatientHeader/>
      </Grid>
      <Grid container className = {classes.grid} spacing={0}>
        <Grid item xs = {3}>
          <h2>Patients List</h2>
          <PatientList/>
        </Grid>
        <Grid item className = {classes.divider}>
          <Divider variant="middle" orientation="vertical"/>
        </Grid>    
        <Grid item xs>
          <PatientInfoTabs/>
        </Grid>
      </Grid>
    </PatientsProvider>
  )
}