import React, { createContext, useState } from 'react';

export const SelectedPatientContext = createContext();

export const SelectedPatientProvider = (props) => {
  const { children } = props;
  const [selectedPatient, setSelectedPatient] = useState(null);
  return <SelectedPatientContext.Provider value={{ selectedPatient, setSelectedPatient }} >{children}</SelectedPatientContext.Provider>
}