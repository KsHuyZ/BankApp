import React from 'react';
import Navigator from './src/navigation';
import AuthProvider from './src/context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;
