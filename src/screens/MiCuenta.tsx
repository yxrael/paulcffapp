import React, { useContext } from 'react';
import {Button, Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from './LoginScreen';

const windowWidth = Dimensions.get('window').width;

export const MiCuenta = () => {

    const { logOut, user, status } = useContext(AuthContext);

    if ( status !== 'authenticated'){
        return (
            <LoginScreen />
        )
    }

    const handleLogout = () => {
        logOut();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
            <View style={ styles.contenedor }>
                <Text style={{ paddingBottom: 5}}>Mi Cuenta:</Text>
                <Text style={{ paddingBottom: 5}}>{ user?.displayName }</Text>
                <Text style={{ paddingBottom: 5}}>{ user?.uid}</Text>
                <Text style={{ paddingBottom: 5}}>Tipo de cliente: { user?.photoURL}</Text>
            </View>
            
            <View style={{ 
                marginBottom:
                Platform.OS === 'ios' ? 100 : 30 
            }}>
                <Button
                    title='Cerrar sesión'
                    onPress={ handleLogout}
                    color='#D2B48C'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#F5DEB3',
        marginHorizontal: 30,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 30,
        marginTop: 30,
        width: windowWidth * 0.85,
        // height: (windowWidth * 0.9) * 0.25,
        justifyContent: 'space-between',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    }
});