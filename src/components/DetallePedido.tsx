import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Pedido, UnidadPedido } from '../interfaces/appInterfaces';

interface Props {
    seleccionShort: UnidadPedido
}

export const DetallePedido = (  {seleccionShort}: Props) => {
    return (
        
            <View>
                <Text>{ seleccionShort.cantidad }</Text>
                <Text>{ seleccionShort.nombre }</Text>
                <Text>{ seleccionShort.pais }</Text>
                <Text>{ seleccionShort.proceso }</Text>
                <Text>------</Text> 
            </View>
        
    );
}

const styles = StyleSheet.create({

});