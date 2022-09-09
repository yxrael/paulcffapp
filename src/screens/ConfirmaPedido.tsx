import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { uniqueId } from '../helpers/creaIDAleatorio';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

export const ConfirmaPedido = ( { route }: any) => {

    // const navigation = useNavigation();

    // const navigation = useNavigation<any>();
    const { productos, enviaPedido } = useContext( ProductContext );
    const { user } = useContext(AuthContext);

    let seleccionShort: any = [];

    const seleccion = productos.filter( item => item.cantidad > 0)
    seleccion.forEach(producto => {
        seleccionShort = [...seleccionShort, {
            id: producto.id,
            nombre: producto.nombre,
            pais: producto.pais,
            proceso: producto.proceso,
            cantidad: producto.cantidad
        }]
    });


    const pedidoId = uniqueId('p_');
    const date = moment( new Date() ).format('DD/MM/YYYY');

    const pedido = {
        completado: false,
        date,
        name: user!.displayName,
        pedidoId,
        seleccionShort,
        tipoCliente: user!.photoURL,
        total: route.params.total,
        uid: user!.uid,
        bolsas: route.params.bolsas,
        observaciones: route.params.observaciones
    };

    const handleEnviar = () => {

        enviaPedido( pedido );

        // navigation.navigate('ListadoCafesAmerica');

    }  

    return (
        <View style={{ marginHorizontal: 20, justifyContent: 'space-around'}}>
            <View style={ styles.contenedor}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10}}>PEDIDO ENVIADO</Text>
                <Text>El pedido { pedido.pedidoId }</Text>
                <Text>ha sido enviado.</Text>
                <Text> </Text>
                <Text>Revisa su estado en</Text>
                <Text>la sección "Mis Pedidos"</Text>
            </View>
            <View style={{ width: 200, alignSelf: 'center'}}>
            <Button
                    title='Enviar otro pedido'
                    onPress={ handleEnviar }
                    color='#CD853F'
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    contenedor: {
        backgroundColor: '#FAEBD7',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 30,
        width: windowWidth * 0.85,
        // height: (windowWidth * 0.9) * 0.25,
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 30
    }
});