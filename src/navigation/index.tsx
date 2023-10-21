import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home';
import WelcomeScreen from '../screens/Welcome/Welcome';
import RegisterScreen from '../screens/Register/Register';
import EmailValidate from '../screens/Login/components/EmailValidate/EmailValidate';
import TypeOTP from '../screens/Login/components/TypeOTP/TypeOTP';
import LoginScreen from '../screens/Login/Login';
import {SCREEN} from '../constants';
const {Home, Welcome, Validate, OTP, Register, Login} = SCREEN;
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Welcome}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Home} component={HomeScreen} />
        <Stack.Screen name={Welcome} component={WelcomeScreen} />
        <Stack.Screen name={Validate} component={EmailValidate} />
        <Stack.Screen name={OTP} component={TypeOTP} />
        <Stack.Screen name={Register} component={RegisterScreen} />
        <Stack.Screen name={Login} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
