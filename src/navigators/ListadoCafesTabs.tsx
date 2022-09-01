import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ListadoCafesAmerica } from '../screens/ListadoCafesAmerica';
import { ListadoCafesAsia } from '../screens/ListadoCafesAsia';
import { ListadoCafesAfrica } from '../screens/ListadoCafesAfrica';
import { ListadoCafesDescafeinados } from '../screens/ListadoCafesDescafeinados';

const Tab = createMaterialTopTabNavigator();

export const ListadoCafesTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="America" component={ListadoCafesAmerica} />
      <Tab.Screen name="Asia" component={ListadoCafesAsia} />
      <Tab.Screen name="Africa" component={ListadoCafesAfrica} />
      <Tab.Screen name="Descafeinados" component={ListadoCafesDescafeinados} />
    </Tab.Navigator>
  );
}