import React,  { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';
import * as dummyListPatients from './dummyListPatients.json';
import API from 'helpers/api.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PatientList = () => {
  const {listPatients, setListPatients} = useContext(PatientsContext);
  //setListPatients(dummyListPatients.patients); //TODO: take data from database
  useEffect(()=>{
    API.getPatients(setListPatients);
  },[])
  const {selectedPatient, setSelectedPatient} = useContext(PatientsContext);
  const {query, setQuery} = useContext(PatientsContext);
  const classes = useStyles();
  const renderPatientListItem = (patient) =>{
    let lowerCaseQuery = query.toLowerCase();
    if (patient.firstName.toLowerCase().includes(lowerCaseQuery) || patient.middleName.toLowerCase().includes(lowerCaseQuery) 
      || patient.lastName.toLowerCase().includes(lowerCaseQuery))
      return (
        <div key = {patient.id}>
          <ListItem button selected={selectedPatient === patient} onClick = {()=>{
              setSelectedPatient(patient);
            }}>
            <ListItemText primary = {patient.firstName + " " + patient.middleName + " " + patient.lastName}/>
          </ListItem>
          <Divider/>
        </div>
        
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
