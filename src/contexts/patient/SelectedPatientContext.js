import React, { createContext, useState } from 'react';

export const SelectedPatientContext = createContext();

export const SelectedPatientProvider = (props) => {
  const { children } = props;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [listPatients, setListPatients] = useState([]);
  const [query, setQuery] = useState("");
  return <SelectedPatientContext.Provider value={{ listPatients, setListPatients, selectedPatient, setSelectedPatient, query, setQuery }} >{children}</SelectedPatientContext.Provider>
}