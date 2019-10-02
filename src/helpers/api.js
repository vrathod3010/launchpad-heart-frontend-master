import { AccessToken } from 'contexts/helpers';
import {axiosInstance} from './index';
import { CONSTANTS } from 'helpers/urlConst';
import { replacePlaceHolder } from 'helpers/urlHelper';

class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    console.log(data)
    if (data)
      return callback(true)
  }

  getPatients(stateHandler, responseHandler) {
    axiosInstance.get(CONSTANTS.PATIENTS)
      .then((response) => {
        console.log(response.data);
        stateHandler(response.data);
        responseHandler(true);
    })
  }

  getPatientContact(patientID, stateHandler, responseHandler) {
    axiosInstance.get(replacePlaceHolder(CONSTANTS.PATIENT_CONTACT, patientID))
      .then((response) => {
        console.log(response.data);
        stateHandler(response.data);
        responseHandler(true);
      }).catch((error) => {
        stateHandler(null);
        responseHandler(true);
      });
  }

  getPatientInsurance(patientID, stateHandler, responseHandler) {
    axiosInstance.get(replacePlaceHolder(CONSTANTS.PATIENT_INSURANCE, patientID))
      .then((response) => {
        console.log(response.data);
        stateHandler(response.data);
        responseHandler(true);
      }).catch((error) => {
        stateHandler(null);
        responseHandler(true);
      });
  }

  getPatientSensorData(patientID, stateHandler, responseHandler) {
    axiosInstance.get(replacePlaceHolder(CONSTANTS.PATIENT_SENSOR, patientID))
      .then((response) => {
        console.log(response.data);
        stateHandler(response.data);
        responseHandler(true);
      }).catch((error) => {
        //stateHandler({});
      });
  }

  updatePatient(updatedPatient, patientID, callback, errCallback) {
    axiosInstance.put(replacePlaceHolder(CONSTANTS.PATIENTS_BY_ID, patientID), updatedPatient)
      .then(()=>{
        callback();
      })
      .catch((error)=>{
        console.log(error);
        errCallback(error);
      });
  }

  updateContact(updatedContact, patientID, callback, errCallback) {
    axiosInstance.put(replacePlaceHolder(CONSTANTS.PATIENT_CONTACT, patientID), updatedContact)
      .then(()=>{
        callback();
      })
      .catch((error)=>{
        console.log(error);
        errCallback(error);
      });
  }

  updateInsurace(updatedInsurance, patientID, callback, errCallback) {
    axiosInstance.put(replacePlaceHolder(CONSTANTS.PATIENT_INSURANCE, patientID), updatedInsurance)
      .then(()=>{
        callback();
      })
      .catch((error)=>{
        console.log(error);
        errCallback(error);
      });
  }

  deletePatient(patientID, callback) {
    axiosInstance.delete(replacePlaceHolder(CONSTANTS.PATIENTS_BY_ID, patientID))
      .then(()=>{
        callback();
      })
  }

  createPatient(newPatient, callback, errCallback) {
    axiosInstance.post(CONSTANTS.PATIENTS, newPatient)
      .then((response) => {
        console.log(response.data);
        callback();
        //firstCallback(response.data.id,)
      })
      .catch((error)=>{
        errCallback(error);
      })
  }
  
  createContact(newContact, patientID, callback, errCallback) {
    axiosInstance.post(replacePlaceHolder(CONSTANTS.PATIENT_CONTACT, patientID), newContact)
      .then(()=>{
        callback();
      })
      .catch((error)=>{
        console.log(error);
        errCallback(error);
      });
  }

  createInsurance(newInsurance, patientID, callback, errCallback) {
    axiosInstance.post(replacePlaceHolder(CONSTANTS.PATIENT_INSURANCE, patientID), newInsurance)
      .then(()=>{
        callback();
      })
      .catch((error)=>{
        console.log(error);
        errCallback(error);
      });
  }
}
const instance = new API();
export default instance;
