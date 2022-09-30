import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { uniqueId } from '../helpers/creaIDAleatorio';
import moment from 'moment'

import { DetallePedidoIndividual } from '../components/DetallePedidoIndividual';
import { ProductContext } from '../context/ProductContext';
import { useForm } from '../hooks/useForm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { AuthContext } from '../context/AuthContext';


const windowWidth = Dimensions.get('window').width;

export const RevisaPedido = () => {

    const navigation = useNavigation<any>();
    const [bolsas, setBolsas] = useState(0);

    const { observaciones, onChange }= useForm({
                observaciones: ''
     });

    const { productos, status, enviaPedido} = useContext( ProductContext );
    const { user } = useContext(AuthContext);

    const seleccion = productos.filter( item => item.cantidad > 0)
    let seleccionShort: any = [];

    // useEffect(() => {
    //   if( seleccion.length === 0){
    //     navigation.goBack();
    //   }
    // }, [ seleccion ])
    
    let totalPedido: number = 0;
    seleccion.map( (item) =>{
        totalPedido = totalPedido + (item.cantidad * parseInt( item.precio ))
    });

    // if ( status !== 'loaded'){
    //     return(
    //         <LoadingScreen/>
    //     )
    // }

    const handleMas = () => {
        setBolsas( bolsas +1 )
    }

    const handleMenos = () => {
        if(bolsas > 0){
            setBolsas( bolsas -1 )
        }
    }

    const handleEnviar = () => {

        if ( status !== 'loaded'){
            return(
                <LoadingScreen/>
            )
        }

        if(seleccion.length === 0 && bolsas === 0){
            return
        }

        const total =  totalPedido + (bolsas * 0.50);

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
            total,
            uid: user!.uid,
            bolsas,
            observaciones
        };

        enviaPedido( pedido );

        navigation.navigate('ConfirmaPedido', {pedido});

    }

    // if ( status !== 'loaded'){
    //     return(
    //         <LoadingScreen/>
    //     )
    // }




    return (
                
        <View>

            <View 
                style={{
                    position: 'absolute',
                    zIndex: 8888,
                    backgroundColor: 'black',
                    height: 50,
                    width: 50,
                    bottom: 29,
                    right: 8,
                    borderRadius: 100,
                    opacity: 0.3
                }}
            />

            <TouchableOpacity 
                    activeOpacity={ 0.8 }
                    onPress={ handleEnviar }
                    // onPress={ () => navigation.navigate('ConfirmaPedido', { 
                    //     observaciones,
                    //     bolsas, 
                    //     total: totalPedido + (bolsas * 0.50) })}
                    style={{
                    position: 'absolute',
                    zIndex: 9999,
                    backgroundColor: '#9ACD32',
                    height: 50,
                    width: 50,
                    bottom: 30,
                    right: 5,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    
                    elevation: 3,
                    }}>
                <View>
                    <Ionicons name='chevron-forward-outline' size={35} color='#808000'/>
                </View>
            </TouchableOpacity>
        <ScrollView
            nestedScrollEnabled={ true } 
        >

            <View style={{ marginHorizontal: 20}}>

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
                ListHeaderComponent=<View style={{ height: 20}}/>
                ListFooterComponent={ <View style={{height: 20}}/>}
            />
            </View>
            
            <View style={{ marginHorizontal: 20}}>

                <View style={ styles.contenedor }>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>¿Añadir bolsas?</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    onPress={ handleMenos }
                                >
                                    <Ionicons name='caret-back-outline' size={35} color='#808000'/>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 35 }}>{ bolsas }</Text>
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    onPress={ handleMas }
                                >
                                    <Ionicons name='caret-forward-outline' size={35} color='#808000'/>
                                </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 18}}>Importe total bolsas { bolsas * 0.50 } €</Text>
                        <Text style={{ fontSize: 16, marginLeft: 30}}>(50 cts/unidad)</Text>
                    </View>
                    
                </View>
                
                <View style={ styles.contenedor }>
                    <View style={{ flexDirection: 'column'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Observaciones: </Text>
                        <TextInput
                            placeholder='Observaciones del pedido'
                            onChangeText={ ( value ) => onChange( value, 'observaciones')}
                            value={ observaciones }
                            autoCapitalize='none'
                            autoCorrect={ false }
                            style={{
                                height: 60,
                                fontSize: 18,
                            }}
                        />
                    </View>
                </View>

                <View style={ {...styles.contenedor, 
                    height: 70, backgroundColor: '#DEB887', 
                    alignItems: 'flex-end', 
                    paddingRight: 50} }>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Total pedido: { totalPedido + (bolsas * 0.50)} €</Text>
                    <Text>IVA no incluído</Text>
                </View>

            </View>

            <View style={{ height: 200 }}></View>
            
        </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({

    contenedor: {
        backgroundColor: '#FAEBD7',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 6,
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
    },
  
});