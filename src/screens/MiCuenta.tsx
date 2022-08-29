import React, { useContext } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from './LoginScreen';

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
        <View>
            <Text>Mi Cuenta</Text>
            <Text>{ user?.displayName }</Text>
            <Text>{ user?.uid}</Text>
            <Button
                title='logout'
                onPress={ handleLogout}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});