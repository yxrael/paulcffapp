import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { UnidadPedido } from '../interfaces/appInterfaces';
import { DetallePedido } from './DetallePedido';
// import { Producto } from '../context/ProductContext';

interface Props {
    nombre: string,
    date: string,
    enviado: boolean,
    seleccionShort: UnidadPedido[]
}

const windowWidth = Dimensions.get('window').width;

export const PedidoIndividual = ( {nombre, date, seleccionShort, enviado }: Props ) => {

    return (
        <View>
            <View style={ styles.contenedor }>
                <View style={{ alignItems: 'flex-end', paddingRight: 30, marginBottom: 10}}>
                    {
                        enviado
                        ? <Text>ENVIADO</Text>
                        : <Text>EN PREPARACIÓN</Text>
                    }
                    <Text style={{ fontWeight: 'bold', fontSize: 10}}>{ date }</Text>
                </View>
                
                {/* <Text>=======</Text>  */}
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

            
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#F5DEB3',
        marginHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
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
        marginTop: 10
    }
});