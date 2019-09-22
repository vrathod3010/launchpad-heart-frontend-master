import axios from 'axios';

//const baseURL = process.env.REACT_APP_BASE_URL + '/api/';

  const baseURL = 'http://launchpad-heart-lb.herokuapp.com' + '/api/';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  responseType: 'json'
});
