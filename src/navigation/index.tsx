import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home';
import WelcomeScreen from '../screens/Welcome/Welcome';
import RegisterScreen from '../screens/Register/Register';
import EmailValidate from '../screens/Login/components/EmailValidate/EmailValidate';
import TypeOTP from '../screens/Login/components/TypeOTP/TypeOTP';
import HistoryScreen from '../screens/History/History';
import LoginScreen from '../screens/Login/Login';
import NotificationScreen from '../screens/Notification/Notification';
import {SCREEN, storageKey} from '../constants';
import StartScreen from '../screens/Start/Start';
import TransactionScreen from '../screens/Transaction/Transaction';
import TransferSuccessScreen from '../screens/Transaction/components/TransferSuccess';
import MyQRScreen from '../screens/MyQR/MyQR';
import ChartScreen from '../screens/History/components/Chart';
import DetailScreen from '../screens/Detail/Detail';
import {getStorage, newNotification, removeStorage} from '../utils';
import {useAuth, useSocketEvent} from '../hooks';
import ProfileScreen from '../screens/Profile/Profile';

const {
  Home,
  Welcome,
  Validate,
  OTP,
  Register,
  Login,
  History,
  Start,
  Transaction,
  TransferSuccess,
  Notification,
  MyQR,
  Chart,
  Detail,
  Profile,
} = SCREEN;
const {refreshTokenKey} = storageKey;

const Stack = createStackNavigator();

const Navigator = ({navigation}: any) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {profile, updateProfile} = useAuth();
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        console.log(nextAppState);
        if (nextAppState === 'inactive' || nextAppState === 'background') {
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleNavigate = async () => {
    const refreshToken = await getStorage(refreshTokenKey);
    if (refreshToken) {
      removeStorage(refreshTokenKey);
      navigation.navigate(Login, {
        goBack: true,
      });
    }
  };

  const handleReceiveAmount = (newAmount: number) => {
    updateProfile({...profile, balance: newAmount});
    newNotification('You are receive money');
  };

  useSocketEvent('receive_amount', handleReceiveAmount);
  useEffect(() => {
    if (appStateVisible === 'inactive' || appStateVisible === 'background') {
      handleNavigate();
    }
  }, [appStateVisible]);

  return (
    <Stack.Navigator
      initialRouteName={Start}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Home} component={HomeScreen} />
      <Stack.Screen name={Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Validate} component={EmailValidate} />
      <Stack.Screen name={OTP} component={TypeOTP} />
      <Stack.Screen name={Register} component={RegisterScreen} />
      <Stack.Screen name={Login} component={LoginScreen} />
      <Stack.Screen name={Start} component={StartScreen} />
      <Stack.Screen name={Transaction} component={TransactionScreen} />
      <Stack.Screen name={TransferSuccess} component={TransferSuccessScreen} />
      <Stack.Screen name={History} component={HistoryScreen} />
      <Stack.Screen name={Notification} component={NotificationScreen} />
      <Stack.Screen name={MyQR} component={MyQRScreen} />
      <Stack.Screen name={Detail} component={DetailScreen} />
      <Stack.Screen name={Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
