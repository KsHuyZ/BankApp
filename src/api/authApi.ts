import {storageKey} from '../constants';
import httpClient from '../libs/axios';
import {getStorage, saveStorage} from '../utils';

const {emailKey, profileKey, refreshTokenKey} = storageKey;

const authApi = {
  checkUser: async (email: string) => {
    try {
      const res = await httpClient.get(`/auth/check-user/${email}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return {success: false, message: error.response.data.message};
    }
  },
  register: async (user: RegisterFormType) => {
    const {firstName, lastName, password, phoneNumber} = user;
    const email = await getStorage(emailKey);
    try {
      const res = await httpClient.post('/auth/register', {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
      });
      const result = res.data;
      const {accessToken, refreshToken, user} = result;
      httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
      await saveStorage(refreshTokenKey, refreshToken);
      await saveStorage(profileKey, JSON.stringify(user));
      return result;
    } catch (error) {
      console.log(error.response.data.message);
      return {success: false, message: error.response.data.message};
    }
  },
  checkOTP: async (otp: string) => {
    const email = await getStorage(emailKey);
    try {
      const res = await httpClient.post('/auth/check-otp', {
        email,
        otp: Number(otp),
      });
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  refreshOTP: async () => {
    const email = await getStorage(emailKey);
    try {
      const res = await httpClient.post('/auth/refresh-otp', {email});
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  signIn: async (password: string) => {
    const profileString = await getStorage(profileKey);
    const profile: ProfileType = JSON.parse(profileString!);
    const {email} = profile;
    try {
      const res = await httpClient.post('/auth/login', {
        email,
        password,
      });
      const result = res.data;
      const {accessToken, refreshToken, user} = result;
      httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
      await saveStorage(refreshTokenKey, refreshToken);
      await saveStorage(profileKey, JSON.stringify(user));
      return result;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
};
export default authApi;
