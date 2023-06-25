import axios from 'axios'
const BASEURL ='http://localhost:6777'

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance;