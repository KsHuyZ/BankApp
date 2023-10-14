import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import WelcomeScreen from '../screens/Welcome';
import {Home, Welcome} from '../constants';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Welcome} >
          <Stack.Screen
            name={Home}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Welcome}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
