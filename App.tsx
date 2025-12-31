import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App; // 🔥 THIS WAS MISSING
