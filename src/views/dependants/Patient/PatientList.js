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
  const {listPatients, setListPatients} = useContext(SelectedPatientContext);
  setListPatients(dummyListPatients.patients); //TODO: take data from database
  const {selectedPatient, setSelectedPatient} = useContext(SelectedPatientContext);
  const {query, setQuery} = useContext(SelectedPatientContext);
  const classes = useStyles();
  const renderPatientListItem = (patient) =>{
    let lowerCaseQuery = query.toLowerCase();
    if (patient.firstName.toLowerCase().includes(lowerCaseQuery) || patient.middleName.toLowerCase().includes(lowerCaseQuery) 
      || patient.lastName.toLowerCase().includes(lowerCaseQuery))
      return (
        <ListItem key = {patient.id} button selected={selectedPatient === patient} onClick = {()=>{
          setSelectedPatient(patient);
        }}>
          <ListItemText primary = {patient.firstName + " " + patient.middleName + " " + patient.lastName}/>
        </ListItem>
      )
    else return (<div></div>)
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
