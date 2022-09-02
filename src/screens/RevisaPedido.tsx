import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import { DetallePedidoIndividual } from '../components/DetallePedidoIndividual';
import { ProductContext } from '../context/ProductContext';
import { Producto } from '../interfaces/appInterfaces';

export const RevisaPedido = () => {

    const navigation = useNavigation<any>();

    const { productos } = useContext( ProductContext );
    // const [seleccion, setSeleccion] = useState<Producto[]>([])

    const seleccion = productos.filter( item => item.cantidad > 0)

    useEffect(() => {
      if( seleccion.length === 0){
        navigation.goBack();
      }
    }, [seleccion])
    
    let totalPedido: number = 0;
    seleccion.map( (item) =>{
        totalPedido = totalPedido + (item.cantidad * parseInt( item.precio ))
    });


    return (
        <View>
            <Text>CONFIRMA PEDIDO</Text>

            <View style={{ marginHorizontal: 20}}>
            {/* <Text>LISTADO CAFES</Text>
            <Text>{ user?.uid }</Text> */}
            {/* <Text>{ productos }</Text> */}

            <FlatList 
                data={ seleccion }
                renderItem={ ( {item} ) => (
                <DetallePedidoIndividual 
                    nombre={ item.nombre }
                    pais={ item.pais }
                    precio={ item.precio }
                    cantidad={ item.cantidad }
                    continente={ item.continente }
                    descafeinado={ item.descafeinado }
                    infoExtra={ item.infoExtra }
                    proceso={ item.proceso }
                    puntos={ item.puntos }
                    rutaURL={ item.rutaURL }
                    disponible={ item.disponible }
                    id={ item.id}
                />)}
                keyExtractor={ item => String(item.id) }
                showsVerticalScrollIndicator={ false }
                ListFooterComponent={ <View style={{height: 100}}/>}
            />
            </View>

            <Text>TODO:</Text>
            <Text>Añadir bolsas</Text>
            <Text>Total pedido { totalPedido } €</Text>
            <Text>IVA no incluído</Text>
            <Text>Observaciones:</Text>

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