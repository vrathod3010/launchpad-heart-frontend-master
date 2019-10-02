import React,  { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { PatientsContext } from 'contexts/patient/PatientsContext';
import * as dummyListPatients from './dummyListPatients.json';
import API from 'helpers/api.js';
import {LoadingComponent} from 'components/common/loading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    maxHeight:800,
    overflow: 'auto'
  },
}));

export const PatientList = () => {
  const {listPatients, setListPatients} = useContext(PatientsContext);
  //setListPatients(dummyListPatients.patients); //TODO: take data from database
  const {selectedPatient, setSelectedPatient} = useContext(PatientsContext);
  const {setEditFlag} = useContext(PatientsContext);
  const {query, setQuery} = useContext(PatientsContext);
  const {refresh, setRefresh} = useContext(PatientsContext);
  const [serverResponse, setServerResponse] = useState(false);
  useEffect(()=>{
    if (refresh === true)
    {
      API.getPatients(setListPatients, setServerResponse);
      setRefresh(false);
    }
  },[refresh])
  const classes = useStyles();
  const renderPatientListItem = (patient) =>{
    let lowerCaseQuery = query.toLowerCase();
    if (patient.firstName.toLowerCase().includes(lowerCaseQuery) || patient.middleName.toLowerCase().includes(lowerCaseQuery) 
      || patient.lastName.toLowerCase().includes(lowerCaseQuery))
      return (
        <div key = {patient.id}>
          <ListItem button selected={selectedPatient === patient} onClick = {()=>{
              setSelectedPatient(patient);
              setEditFlag(false);
            }}>
            <ListItemText primary = {patient.firstName + " " + patient.middleName + " " + patient.lastName}/>
          </ListItem>
          <Divider/>
        </div>
        
      )
    else return (<div key = {patient.id}></div>)
  }
  return (
    !serverResponse? 
      <LoadingComponent/> :
      <List className={classes.root} >
        {listPatients.map((patient) =>{
            return renderPatientListItem(patient);
          })
        }
      </List>
    
  )
}
