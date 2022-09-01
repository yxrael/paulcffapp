import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ListadoCafesAmerica } from '../screens/ListadoCafesAmerica';
import { ListadoCafesAsia } from '../screens/ListadoCafesAsia';
import { ListadoCafesAfrica } from '../screens/ListadoCafesAfrica';
import { ListadoCafesDescafeinados } from '../screens/ListadoCafesDescafeinados';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export const ListadoCafesTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          height: 30,
        },
        tabBarLabelStyle: {
          flex: 1,
          fontSize: 8,
          fontWeight: 'bold',
  
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF8C00'
        },
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: '#8B4513'
        
      }}
    >
      <Tab.Screen
      name="America" component={ListadoCafesAmerica} />
      <Tab.Screen name="Asia" component={ListadoCafesAsia} />
      <Tab.Screen name="Africa" component={ListadoCafesAfrica} />
      <Tab.Screen name="Descafeinados" component={ListadoCafesDescafeinados} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    demo: {
      
    }
});