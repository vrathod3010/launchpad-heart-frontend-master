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
        //stateHandler({});
      });
  }

  getPatientInsurance(patientID, stateHandler, responseHandler) {
    axiosInstance.get(replacePlaceHolder(CONSTANTS.PATIENT_INSURANCE, patientID))
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
  
}
const instance = new API();
export default instance;
