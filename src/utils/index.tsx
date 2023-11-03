import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../libs/socket';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime);

export const saveStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const getStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const removeStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const clearStorage = async () => {
  AsyncStorage.clear();
};

export const formatNumber = (value: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
  const formatedValue = numericValue.toLocaleString();
  return formatedValue;
};

export const socketEmit = (event: string, data?: any) => {
  socket.emit(event, data);
};

export const socketOn = (event: string, callback: (data: any) => void) => {
  socket.on(event, data => {
    callback(data);
  });
};

export const getCurrentTime = () => {
  return dayjs().format(' HH:mm - YYYY/MM/DD');
};
export const transactionType = {
  RECEIVED: 'RECEIVED',
  SEND: 'SEND',
};

export const newNotification = (message: string) => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {channelId: '1', channelName: 'name'},
      created => console.log(`Created channel return ${created}`),
    );
    PushNotification.localNotification({
      title: 'New notification - Financial',
      message,
      channelId: '1',
    });
  }
};
export const calFromDate = (input: string) => {
  const parts = input.split(' ');
  const time = parts[0];
  const date = parts[1];
  const dateParts = date.split('/');
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];

  const reversedDateTime = year + '/' + month + '/' + day + ' ' + time;
  const output = dayjs(reversedDateTime).fromNow();
  return output;
};
