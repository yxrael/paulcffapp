import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ConfirmaPedido = () => {

    const navigation = useNavigation<any>();

    return (
        <View>
            <Text>PEDIDO CONFIRMADO</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});