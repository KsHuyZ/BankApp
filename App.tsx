import React from 'react';
import Navigator from './src/navigation';
import AuthProvider from './src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
