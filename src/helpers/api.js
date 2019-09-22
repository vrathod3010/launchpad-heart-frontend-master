import { AccessToken } from 'contexts/helpers'
import {axiosInstance} from './index'

class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    console.log(data)
    if (data)
      return callback(true)
  }

  getPatients(stateHandler) {
    axiosInstance.get("/patients")
      .then((response) => {
        //console.log(response.data);
        stateHandler(response.data);
    })
  }
  
}
const instance = new API();
export default instance;
