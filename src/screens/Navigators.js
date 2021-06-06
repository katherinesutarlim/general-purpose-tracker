import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ListScreen from './ListScreen';
import FormScreen from './FormScreen';

const ListNavigator = createStackNavigator();

const ListTabs = () => (
  <ListNavigator.Navigator>
    <ListNavigator.Screen name="List" component={ListScreen} />
    <ListNavigator.Screen name="Form" component={FormScreen} />
  </ListNavigator.Navigator>
);

const MainTabNavigator = createBottomTabNavigator();

const MainTabs = () => (
  <MainTabNavigator.Navigator>
    <MainTabNavigator.Screen name="Tracked" component={ListTabs} />
    <MainTabNavigator.Screen name="Home" component={HomeScreen} />
  </MainTabNavigator.Navigator>
);

export default MainTabs;
