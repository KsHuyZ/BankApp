import axios from 'axios';
import {getStorage} from '../utils';

const httpClient = axios.create({
  baseURL: 'https://banka-8las.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const accessToken = getStorage('token');
if (accessToken) {
  httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default httpClient;
