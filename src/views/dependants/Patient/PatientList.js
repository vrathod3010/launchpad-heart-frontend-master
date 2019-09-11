import React,  { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { SelectedPatientContext } from '../../../contexts/patient/SelectedPatientContext';
import * as dummyListPatients from './dummyListPatients.json';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PatientList = () => {
  const listPatients = dummyListPatients.patients;
  const {selectedPatient} = useContext(SelectedPatientContext);
  const {setSelectedPatient} = useContext(SelectedPatientContext);
  const classes = useStyles();
  const renderPatientListItem = (patient) =>{
    return (
      <ListItem key = {patient.id} button selected={selectedPatient === patient} onClick = {()=>{
        setSelectedPatient(patient);
      }}>
        <ListItemText primary = {patient.firstName + " " + patient.middleName + " " + patient.lastName}/>
      </ListItem>
    )
  }
  return (
    <List className={classes.root} >
      {listPatients.map((patient) =>{
          return renderPatientListItem(patient);
        })
      }
    </List>
  )
}
