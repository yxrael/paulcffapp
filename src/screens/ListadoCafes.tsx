import React, { useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View} from 'react-native';
import { CafeIndividual } from '../components/CafeIndividual';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { LoginScreen } from './LoginScreen';

export const ListadoCafes = () => {

    const { user, status } = useContext(AuthContext);
    const { productos } = useContext(ProductContext);

    if ( status !== 'authenticated'){
        return (
            <LoginScreen />
        )
    }

    return (
        <View style={{ marginHorizontal: 20}}>
            {/* <Text>LISTADO CAFES</Text>
            <Text>{ user?.uid }</Text> */}
            {/* <Text>{ productos }</Text> */}

            <TouchableOpacity style={{
                    position: 'absolute',
                    zIndex: 9999,
                    backgroundColor: '#9ACD32',
                    height: 50,
                    width: 50,
                    bottom: 30,
                    right: 5,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>OK</Text>
                </View>
            </TouchableOpacity>

            <FlatList 
                data={ productos }
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
                />)}
                keyExtractor={ item => String(item.id) }
                showsVerticalScrollIndicator={ false }
            />

            
            

        </View>
    );
}