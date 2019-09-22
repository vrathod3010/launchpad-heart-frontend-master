import React, { useEffect } from 'react'
import { PatientsProvider } from '../../../contexts/patient/PatientsContext';
import {PatientList} from './PatientList';
import {PatientInfoTabs} from './PatientInfoTabs';
import {PatientHeader} from './PatientHeader';
import { Grid, TextField, Container } from '@material-ui/core';

export const PatientContainer = () => {
  return (
    <PatientsProvider>
      <Grid container spacing={3}>
        <PatientHeader/>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs = {3}>
          <PatientList/>
        </Grid>
        <Grid item xs = {9}>
          <PatientInfoTabs/>
        </Grid>
      </Grid>
    </PatientsProvider>
  )
}