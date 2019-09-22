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
  
}
const instance = new API();
export default instance;
