import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Pedido, UnidadPedido } from '../interfaces/appInterfaces';

interface Props {
    seleccionShort: UnidadPedido
}

export const DetallePedido = (  {seleccionShort}: Props) => {
    return (

            <View style={{ 
                flexDirection: 'column', 
                borderBottomColor: 'rgba(100, 149, 237, 0.3)', 
                borderBottomWidth: 1}}>
                <View style={{ flex: 2, flexDirection: 'row'}}>
                    <Text style={{ fontWeight: 'bold', paddingRight: 5, fontSize: 17}}>{ seleccionShort.cantidad }</Text>
                    <Text style={{ marginBottom: 4, fontSize: 17, fontWeight: 'bold'}}>{ seleccionShort.pais }</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{ marginBottom: 6}}>{ seleccionShort.proceso }</Text>
                    
                </View>
                
            </View>
        
    );
}

const styles = StyleSheet.create({

});