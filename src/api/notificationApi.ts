import httpClient from '../libs/axios';
const notificationApi = {
  getUnseenNotifi: async (id: string) => {
    try {
      const res = await httpClient.get(`/notifi/count-noti/${id}`);
      console.log('count', res.data.count);
      return res.data.count;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  getNotificationByUserId: async (id: string) => {
    try {
      const res = await httpClient.get(`/notifi/get-notifi/${id}`);
      console.log('count', res.data.count);
      return res.data.notifications;
    } catch (error) {
      return {success: false, message: error.response.data.message};
    }
  },
  seenNotifi: (id: string) => {
    httpClient.get(`/notifi/seen-notifi/${id}`);
  },
};
export default notificationApi;
