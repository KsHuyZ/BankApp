import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../libs/socket';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

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
  dayjs().format(" 'HH:MM' - YYYY/MM/DD");
};
export const transactionType = {
  RECEIVED: 'RECEIVED',
  SEND: 'SEND',
};
