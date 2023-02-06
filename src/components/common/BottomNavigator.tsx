import 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CalenderScreen from '../../screens/CalenderScreen';
import MyPageScreen from '../../screens/MyPageScreen';
import LibraryScreen from '../../screens/LibraryScreen';

const Tab = createBottomTabNavigator();

const screenRoutes = {
  Home: HomeScreen,
  Calender: CalenderScreen,
  Library: LibraryScreen,
  MyPage: MyPageScreen,
};

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries(screenRoutes).map(([name, component]) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}

export default BottomNavigator;
