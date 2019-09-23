import React, { createContext, useState } from 'react';

export const PatientsContext = createContext();

export const PatientsProvider = (props) => {
  const { children } = props;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [listPatients, setListPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  return <PatientsContext.Provider value={{ listPatients, setListPatients, selectedPatient, setSelectedPatient, query, setQuery, editFlag, setEditFlag }} >{children}</PatientsContext.Provider>
}