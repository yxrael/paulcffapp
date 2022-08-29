import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { UnidadPedido } from '../interfaces/appInterfaces';
import { DetallePedido } from './DetallePedido';
// import { Producto } from '../context/ProductContext';

interface Props {
    nombre: string,
    date: string,
    seleccionShort: UnidadPedido[]
}

export const PedidoIndividual = ( {nombre, date, seleccionShort }: Props ) => {

    return (
        <View>
            <Text style={{ fontWeight: 'bold'}}>{ date }</Text>
            <Text>=======</Text> 
            <FlatList 
                data={ seleccionShort }
                renderItem={ ( {item} ) => (
                    <DetallePedido 
                        seleccionShort={ item }
                    />                   
                )}
                keyExtractor={ item => String(item.id) }
            />
        </View>
    );
}

const styles = StyleSheet.create({

});