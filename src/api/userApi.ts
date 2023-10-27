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
};
export default userApi;
