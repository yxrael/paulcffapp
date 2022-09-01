import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoginScreen } from '../screens/LoginScreen';
import { Ajustes } from '../screens/Ajustes';
import { MiCuenta } from '../screens/MiCuenta';
import { ListadoCafesAmerica } from '../screens/ListadoCafesAmerica';
import { MisPedidos } from '../screens/MisPedidos';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { ListadoCafesTabs } from './ListadoCafesTabs';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {

    const { status } = useContext( AuthContext );

    // { 
    //     ( status !== 'authenticated')
    //     && 
    //     (
    //         <LoginScreen />
    //     )
    // }  

  return (
    <Drawer.Navigator
        screenOptions={{
            drawerPosition: 'left',
            // drawerType: width >= 768 ? 'permanent' : 'front'
        }}
        drawerContent={ (  ) => <MenuInterno /> } 
    >

      <Drawer.Screen name="MrChava" component={ListadoCafesTabs} />
      <Drawer.Screen name="Ajustes" component={Ajustes} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="MiCuenta" component={MiCuenta} />
      <Drawer.Screen name="MisPedidos" component={MisPedidos} />

    </Drawer.Navigator>
  );
}



const MenuInterno = (  ) => {

    const navigation = useNavigation<any>();
    const { status } = useContext( AuthContext );

    return (

        <DrawerContentScrollView>
            <View style={{ marginTop: 80, marginLeft: 20}}>
                <TouchableOpacity 
                    style={{ flexDirection: 'row'}}
                    onPress={ () => navigation.navigate( 'MrChava' )}     
                >
                    <Ionicons 
                        name='cafe-outline'
                        size={30}
                    />
                    <Text style={{ marginLeft: 20, marginBottom: 30, fontSize: 17}}>Listado Cafés</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ flexDirection: 'row'}}
                    onPress={ () => navigation.navigate( 'MisPedidos' )}     
                >
                    <Ionicons 
                        name='calendar-outline'
                        size={30}
                    />
                    <Text style={{ marginLeft: 20, marginBottom: 30, fontSize: 17}}>Mis Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ flexDirection: 'row'}}
                    onPress={ () => 
                        // ( status === 'authenticated')
                        // ? navigation.navigate('MiCuenta')
                        // : navigation.navigate('LoginScreen')
                        navigation.navigate('MiCuenta')
                    }     
                >
                    <Ionicons 
                        name='person-outline'
                        size={30}
                    />
                    <Text style={{ marginLeft: 20, fontSize: 17, marginBottom: 30}}>Mi cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ flexDirection: 'row'}}
                    onPress={ () => navigation.navigate('Ajustes')}     
                >
                    <Ionicons 
                        name='options-outline'
                        size={30}
                    />
                    <Text style={{ marginLeft: 20, fontSize: 17, marginBottom: 30}}>Ajustes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ flexDirection: 'row'}}
                    // onPress={ () => navigation.navigate('Navigator')}    
                    onPress={ () => navigation.goBack() }    
                >
                    <Ionicons 
                        name='arrow-undo-outline'
                        size={30}
                    />
                    <Text style={{ marginLeft: 20, fontSize: 17}}>Volver</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}