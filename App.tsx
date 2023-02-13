/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigator from './src/components/common/BottomNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
}

export default App;
