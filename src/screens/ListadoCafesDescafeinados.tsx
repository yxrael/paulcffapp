import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CafeIndividual } from '../components/CafeIndividual';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { LoadingScreen } from './LoadingScreen';
import { LoginScreen } from './LoginScreen';
import { Producto } from '../interfaces/appInterfaces';

//v31.08

export const ListadoCafesDescafeinados = () => {

    let listaDescafeinados: Producto[] = []

    const { user } = useContext(AuthContext);
    const { productos, status } = useContext(ProductContext);
    const navigation = useNavigation<any>();

    if( user?.photoURL === 'admin'){
        listaDescafeinados = productos.filter( 
            cafe => cafe.descafeinado === true
            );

    } else {
        listaDescafeinados = productos.filter( 
            cafe => cafe.disponible === true 
            && cafe.descafeinado === true
            && cafe.tipoCliente === user?.photoURL
            );
    }


    // if ( status !== 'authenticated'){
    //     return (
    //         <LoginScreen />
    //     )
    // }

    if ( status !== 'loaded'){
        return(
            <LoadingScreen/>
        )
    }

    const handleNext = () => {
        navigation.navigate('RevisaPedido');
    }

    return (

    <View style={{ flex: 1}}>

        <TouchableOpacity 
                activeOpacity={ 0.8 }
                onPress={ handleNext }
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
            <Ionicons 
                name={
                    ( user?.photoURL === 'admin') ? 'add-outline' : 'chevron-forward-outline'
                }
                    size={35} color='#808000'
            />

                {/* <Text style={{ fontWeight: 'bold' }}>OK</Text> */}
            </View>
        </TouchableOpacity>

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



        <View style={{ marginHorizontal: 20}}>
            {/* <Text>LISTADO CAFES</Text>
            <Text>{ user?.uid }</Text> */}
            {/* <Text>{ productos }</Text> */}

            

            <FlatList 
                data={ listaDescafeinados }
                renderItem={ ( {item} ) => (
                <CafeIndividual 
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
                    tipoCliente={ item.tipoCliente }
                    id={ item.id}
                />)}
                keyExtractor={ item => String(item.id) }
                showsVerticalScrollIndicator={ false }
                ListFooterComponent={ <View style={{height: 200}}/>}
            />

        </View>

    </View>
 
    );
}