import React, { useContext } from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProductContext } from '../context/ProductContext';
import { FadeInImage } from './FadeInImage';
// import { Producto } from '../context/ProductContext';

interface Props {
    nombre: string,
    pais: string,
    cantidad: number,
    continente: string,
    descafeinado: boolean,
    disponible: boolean,
    fileName?: string,
    id?: number,
    infoExtra?: string,
    precio: string,
    proceso: string,
    puntos: string,
    rutaURL: string,
    tipoCliente?: string
    url?: string,
    height?: number
};

const windowWidth = Dimensions.get('window').width;

export const DetallePedidoIndividual = ( {
        cantidad, 
        nombre, 
        pais, 
        continente, 
        descafeinado, 
        infoExtra,
        precio, 
        proceso, 
        puntos, 
        rutaURL,
        id,
        height = ((windowWidth * 0.9) * 0.25)}: Props ) => {


    const { eliminaCafeEnPedido } = useContext( ProductContext );
    const totalProducto = parseInt(precio) * cantidad

    const muestraCafe = () => {
        console.log('muestra café')
    }

    const muestraDetalles = () => {
        console.log('muestra detalles');
    }

    const handleBorrar = () => {
        console.log('borra producto');
        eliminaCafeEnPedido( id! )
    }

    return (

    <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ muestraCafe }
        onLongPress={ muestraDetalles }
    >
        <View style={{ }}>
        <LinearGradient 
            colors={['#D2B48C', '#F5DEB3', '#FDF5E6']} 
            style={ {...styles.contenedor, height, flex: 1, flexDirection: 'row' } }>

            {/* envuelve a #1 y  #2 y fila inferior*/}
            <View style={{ flex: 6, flexDirection: 'column'}}>

                    {/* envuelve a #1 y  #2 */}
                    <View style={{ flex: 6, flexDirection: 'row'}}>

                        <View style={ styles.contenedorNombreCafe }>
                            
                            <Text style={ styles.nombre }>{ nombre }</Text>
                            <Text style={ styles.pais }>{ pais }</Text>

                            {
                                ( descafeinado === true ) && 
                                <FadeInImage
                                    uri={ 'https://intl.swisswater.com/wp-content/uploads/2012/12/logo-large.png' }
                                    style={{ 
                                    position: 'absolute',
                                    top: 1,
                                    left: 40,
                                    width: windowWidth * 0.18,
                                    height: windowWidth * 0.18,
                                    borderTopRightRadius: 10,
                                    borderBottomLeftRadius: 7,
                                    opacity: 0.5,
                                    marginTop: 2
                                    }}
                                />
                            }

                        </View >

                        <View style={ styles.contenedorPrecioCantidad }>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>        
                                <Text style={{ fontSize: 20, fontWeight: '800' }}>{ cantidad } kg</Text>    
                            </View>
                            <Text style={{ fontSize: 15 }}>{ totalProducto } €</Text>
                        </View>
                    </View>

            </View>

            {/* envuelve a #3 */}
            <View style={{ flex: 2}}>

                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={ handleBorrar }
                    style={{
                        zIndex: 9999
                    }}
                >
                    <View style={ styles.botonBorrar }>
                        <Ionicons
                            name='trash-outline'
                            style={ styles.iconoBotonBorrar }
                        />

                    </View>
                </TouchableOpacity>

                <Text style={ styles.proceso }>{ proceso }</Text>

                <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>

                <View style={{...styles.rotuladoCategoria, }}>
                    <Text style={ {...styles.categoria } }>{ continente }</Text>
                </View>   
                </View>
            </View>

        </LinearGradient>
        </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#b1d8f0',
        borderRadius: 15,
        marginBottom: 2,
        width: windowWidth * 0.85,
        height: (windowWidth * 0.9) * 0.25,
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
    contenedorNombreCafe : {
        flex: 4,
        justifyContent: 'space-between',
        marginTop: 5,
        marginLeft: 10
    },
    contenedorMatices: {
        margin: 2,
        marginLeft: 10
    },
    contenedorPrecioCantidad : {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 5,
        marginLeft: 10,
    },
    textoMatices: {
        textTransform: 'lowercase',
        fontSize: 12
    },
    nombre: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    pais: {

        fontSize: 14,
        fontWeight: '600',
    },
    proceso: {
        alignSelf: 'flex-end',
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginTop: 5,
        marginRight: 7,
        color: '#FDF5E6'
    },
    rotuladoCategoria: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(168, 99, 57, 0.7)',
        borderTopLeftRadius: 10,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 5,
        marginTop: 15,
    },
    fondoPuntos: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(168, 99, 57, 0.7)',
        height: 30,
        width: 55,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoPuntos: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    categoria: {
        color: 'white'
    },
    imagenFondo: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: -40,
        bottom: -2,
        opacity: 0.3
    },
    botonBorrar: {
        position: 'absolute',
        height: 30,
        width: 30, 
        backgroundColor: 'red',
        borderRadius: 100,
        top: 25,
        right: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconoBotonBorrar: {
        fontSize: 20,
        color: 'white'
    }
});

