import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { ProductContext } from '../context/ProductContext';

export const RevisaPedido = () => {

    const { productos } = useContext( ProductContext );
const seleccion = productos.filter( item => item.cantidad > 0)

    const navigation = useNavigation<any>();

    return (
        <View>
            <Text>CONFIRMA PEDIDO</Text>
            {
                seleccion.map( item => (
                <View>
<Text>{ item!.nombre }</Text>
<Text>{ item!.cantidad }</Text>
                </View>
                
                ))
            }
            <Button
                title='Volver'
                onPress={ () => navigation.goBack()}
            />
            <Button
                title='Enviar'
                onPress={ () => navigation.navigate('ConfirmaPedido')}
            />
        </View>

    );
}

const styles = StyleSheet.create({

});