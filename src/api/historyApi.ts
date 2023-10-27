import httpClient from '../libs/axios';
const historyApi = {
  getHistoryLimit: async (id: string) => {
    try {
      const res = await httpClient.get(`/history/get-history-limit/${id}`);
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  getHistorybyUserId: async (id: string) => {
    try {
      const res = await httpClient.get(`/history/get-history/${id}`);
      return res.data;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  }
};
export default historyApi;
