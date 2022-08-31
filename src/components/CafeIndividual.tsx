import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    infoExtra: string,
    precio: string,
    proceso: string,
    puntos: string,
    rutaURL: string,
    tipoCliente?: string
    url?: string,
    height?: number
};

const windowWidth = Dimensions.get('window').width;

export const CafeIndividual = ( {
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
        height = ((windowWidth * 0.9) * 0.35)}: Props ) => {

    const muestraCafe = () => {
        // navigation.navigate('DetalleOferta', {
        //   // oferta: oferta, negocio: establecimiento, url: url, testNegocio
        //   oferta: oferta, negocio
        // } );
        console.log('muestra café')
    }

    const muestraDetalles = () => {
        console.log('muestra detalles');
    }


    const handleMas = () => {
        console.log('aumentar cantidad');
    }

    const handleMenos = () => {
        console.log('disminuir cantidad');
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
                            {/* <Text style={ {} }>{ nombre }</Text> */}
                            <Text style={ styles.pais }>{ pais }</Text>
                            {/* <Text style={ styles.proceso }>{ proceso }</Text> */}
                            {
                                ( descafeinado === true ) && 
                                <FadeInImage
                                    uri={ 'https://intl.swisswater.com/wp-content/uploads/2012/12/logo-large.png' }
                                    style={{ 
                                    position: 'absolute',
                                    top: 5,
                                    left: 50,
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
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    onPress={ handleMenos }
                                >
                                    <Ionicons name='caret-back-outline' size={35} color='#808000'/>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 35 }}>{ cantidad }</Text>
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    onPress={ handleMas }
                                >
                                    <Ionicons name='caret-forward-outline' size={35} color='#808000'/>
                                </TouchableOpacity>
                            </View>

                            
                            <Text style={{ fontSize: 15, fontWeight: '800' }}>{ precio } €/ kg</Text>
                        </View>
                    </View>

                <View style={ styles.contenedorMatices }>
                    <Text style={ styles.textoMatices }>{infoExtra}</Text>
                </View>

            </View>

            {/* envuelve a #3 */}
            <View style={{ flex: 2}}>

                <Text style={ styles.proceso }>{ proceso }</Text>

                <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>

                <View style={{...styles.fondoPuntos, }}>
                    <Text style={ styles.textoPuntos }>{ puntos }</Text>
                </View>


                <View style={{...styles.rotuladoCategoria, }}>
                    <Text style={ {...styles.categoria } }>{ continente }</Text>
                    {/* <Text style={{} }>{ pais }</Text> */}
                </View>   
                </View>
            </View>

            {/* <Image 
                source={ require('../../assets/logoasempro.png')}
                style={ styles.imagenFondo }
            /> */}

        </LinearGradient>
        </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#b1d8f0',
        borderRadius: 15,
        marginBottom: 5,
        width: windowWidth * 0.9,
        height: (windowWidth * 0.9) * 0.35,
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
        marginTop: 15
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
    }
});

