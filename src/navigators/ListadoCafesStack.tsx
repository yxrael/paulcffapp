import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ConfirmaPedido } from '../screens/ConfirmaPedido';
import { RevisaPedido } from '../screens/RevisaPedido';
import { ListadoCafesTabs } from './ListadoCafesTabs';
import { ScreenStackHeaderConfig } from 'react-native-screens';

const Stack = createStackNavigator();

export const ListadoCafesStack = () => {

  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
          
    >
      <Stack.Screen name="ListadoCafesTabs" component={ListadoCafesTabs} />
      <Stack.Screen name="RevisaPedido" component={RevisaPedido} />
      <Stack.Screen name="ConfirmaPedido" component={ConfirmaPedido}/>
    </Stack.Navigator>
  );
}