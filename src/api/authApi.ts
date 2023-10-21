import {storageKey} from '../constants';
import httpClient from '../libs/axios';
import {getStorage} from '../utils';

const {emailKey, profileKey} = storageKey;

const authApi = {
  checkUser: async (email: string) => {
    try {
      const res = await httpClient.get(`/users/check-user/${email}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return {success: false};
    }
  },
  register: async (user: RegisterFormType) => {
    const {firstName, lastName, password, phoneNumber} = user;
    const email = await getStorage(emailKey);
    try {
      const res = await httpClient.post('/users/register', {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return {success: false};
    }
  },
  checkOTP: async (otp: string) => {
    const email = await getStorage(emailKey);
    try {
      const res = await httpClient.post('/users/check-otp', {
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
      const res = await httpClient.post('/users/refresh-otp', {email});
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  signIn: async (password: string) => {
    const profileString = await getStorage(profileKey);
    const profile: ProfileType = JSON.parse(profileString!);
    const {email} = profile;
    console.log(profile)
    try {
      const res = await httpClient.post('/users/login', {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
};
export default authApi;
