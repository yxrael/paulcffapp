
import React, { useContext, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";



import {StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ListadoCafes } from './ListadoCafes';
import { LoadingScreen } from './LoadingScreen';
import { LoginScreen } from './LoginScreen';
import { ProductContext } from '../context/ProductContext';
import { MyDrawer } from '../navigators/Drawer';



export const InicioScreen = () => {

    const { user, status, signIn } = useContext(AuthContext);
    // const { loadProductosYPedidos, productos, pedidos } = useContext(ProductContext);


    if( status === "checking") return <LoadingScreen />

    // useEffect(() => {
    //     loadProductos();
    // }, []);

    // TODO: useEffect a onAuthStateChange para actualizar estado sesión

    return (
        <View>
            {/* <Text>MR CHAVA INICIO</Text> */}
            {
                (status === 'authenticated')
                ? (
                    <MyDrawer />
                )

                : (
                    <LoginScreen />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({

});