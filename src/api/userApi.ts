import httpClient from '../libs/axios';

const userApi = {
  getUserNamebyCardNumber: async (cardNumber: string) => {
    try {
      const res = await httpClient.get(`/users/card-number/${cardNumber}`);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return {success: false, message: error.response.data.message};
    }
  },
  updateProfile: async (
    _id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
  ) => {
    try {
      const res = await httpClient.put('/users/update-profile', {
        _id,
        firstName,
        lastName,
        phoneNumber,
      });
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  changePassword: async (
    _id: string,
    oldPassword: string,
    newPassword: string,
    retypePassword: string,
  ) => {
    try {
      const res = await httpClient.put('/users/change-password', {
        _id,
        oldPassword,
        newPassword,
        retypePassword,
      });
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
};
export default userApi;
