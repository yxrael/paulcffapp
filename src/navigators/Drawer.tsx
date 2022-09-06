import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoginScreen } from '../screens/LoginScreen';
import { Ajustes } from '../screens/Ajustes';
import { MiCuenta } from '../screens/MiCuenta';
// import { ListadoCafesAmerica } from '../screens/ListadoCafesAmerica';
import { MisPedidos } from '../screens/MisPedidos';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { ListadoCafesStack } from './ListadoCafesStack';
// import { checkUsuario } from '../firebase/providers';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Background } from '../components/Background';
// import { color } from 'react-native-reanimated';
// import { UsuarioStorage } from '../interfaces/appInterfaces';


const Drawer = createDrawerNavigator();

export const MyDrawer = () => {

    // const usuarioRegistrado: any = getData();

    // useEffect( () => {
    //     checkUsuario();
    // }, [])
    
    const { status } = useContext(AuthContext);

    if ( status !== 'authenticated'){
        return (
            <LoginScreen />
        )
    }

  return (
    <Drawer.Navigator
    
        screenOptions={{

            drawerPosition: 'left',
            // drawerType: width >= 768 ? 'permanent' : 'front'
            headerStyle: {
                height: 30
            },
            // header: () => <Cabecera/>
            headerTitleStyle: {
                fontSize: 18
            }
        }}
        drawerContent={ (  ) => <MenuInterno /> } 
        
    >

      <Drawer.Screen name="MrChava" component={ListadoCafesStack} />
      <Drawer.Screen name="Ajustes" component={Ajustes} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="MiCuenta" component={MiCuenta} />
      <Drawer.Screen name="MisPedidos" component={MisPedidos} />

    </Drawer.Navigator>
  );
}

const MenuInterno = (  ) => {

    const navigation = useNavigation<any>();
    // const { status } = useContext( AuthContext );

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
                    onPress={ () => navigation.navigate('MiCuenta')
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