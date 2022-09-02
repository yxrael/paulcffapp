import React from 'react';
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
import { ListadoCafesTabs } from './ListadoCafesTabs';
import { ProductContext } from '../context/ProductContext';
import { ListadoCafesStack } from './ListadoCafesStack';
// import { Background } from '../components/Background';
// import { color } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {


    // const { status } = useContext( AuthContext );

    // { 
    //     ( status !== 'authenticated')
    //     && 
    //     (
    //         <LoginScreen />
    //     )
    // }  

    // const Cabecera = () => {
    //     return (
    //         <Image 
    //             source={ require('../../assets/logoChava.png')}
    //             style={{ backgroundColor: 'white', height: 50, width: 300}}
    //         />
    //     )
    // }

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

      {/* <Drawer.Screen name="MrChava" component={ListadoCafesTabs} /> */}
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