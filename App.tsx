import React, {useEffect, useState, useRef} from 'react';
import Navigator from './src/navigation';
import AuthProvider from './src/context/AuthContext';
import {removeStorage} from './src/utils';
import {storageKey} from './src/constants/index';
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
