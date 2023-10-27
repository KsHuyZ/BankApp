import axios from 'axios';
import {getStorage} from '../utils';
import {storageKey} from '../constants/index';

const {profileKey, refreshTokenKey} = storageKey;

const httpClient = axios.create({
  baseURL: 'https://banka-8las.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const refreshTokenFunc = async (refreshToken: string | null, email: string) => {
  try {
    const res = await httpClient.post('/auth/refresh-token', {
      refreshToken,
      email,
    });
    console.log('respone', res.data);
    return res.data.accessToken;
  } catch (error) {
    return {success: false};
  }
};

httpClient.interceptors.response.use(
  response => response,
  async error => {
    console.log('That error :D', error.response.status);
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const refreshToken = await getStorage(refreshTokenKey);
        const profileString = await getStorage(profileKey);
        const profile = JSON.parse(profileString!);
        const newAccessToken = await refreshTokenFunc(
          refreshToken,
          profile.email,
        );
        console.log('new access', newAccessToken);
        originalRequest.headers = {
          Authorization: 'Bearer ' + newAccessToken,
        };
        // httpClient.defaults.headers.Authorization = 'Bearer ' + newAccessToken;
        // axios.defaults.headers.Authorization = 'Bearer ' + newAccessToken;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Handle the token refresh error, e.g., log out the user
        throw refreshError;
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;
