import 'react-native';
import type {FunctionComponent} from 'react';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {GetIconFunction} from './Icons';
import Icons from './Icons';
import HomeScreen from '../../screens/HomeScreen';
import CalenderScreen from '../../screens/CalenderScreen';
import MyPageScreen from '../../screens/MyPageScreen';
import LibraryScreen from '../../screens/LibraryScreen';
import colors from '../../styles/colors';

const BottomTap = createBottomTabNavigator();

const screenRoutes = {
  Home: [HomeScreen, Icons.Home],
  Calender: [CalenderScreen, Icons.Calendar],
  Library: [LibraryScreen, Icons.Dumbbell],
  MyPage: [MyPageScreen, Icons.User],
} as {[key: string]: [FunctionComponent, GetIconFunction]};

const INITIAL_ROUTE_NAME = 'Home';

function BottomNavigator() {
  return (
    <BottomTap.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.icons.red,
        tabBarInactiveTintColor: colors.icons.gray,
      }}>
      {Object.entries(screenRoutes).map(([name, [component, icon]]) => (
        <BottomTap.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? icon(colors.icons.red) : icon(colors.icons.gray),
          }}
        />
      ))}
    </BottomTap.Navigator>
  );
}

export default BottomNavigator;
