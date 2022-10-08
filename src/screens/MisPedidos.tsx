import React, { useContext, useEffect } from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet} from 'react-native';
import { PedidoIndividual } from '../components/PedidoIndividual';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { Pedido } from '../interfaces/appInterfaces';
import { LoginScreen } from './LoginScreen';

import { query, orderBy, limit } from "firebase/firestore";

const windowWidth = Dimensions.get('window').width;



export const MisPedidos = () => {

    let pedidosCliente: Pedido[] = [];
    

    const { user, status } = useContext(AuthContext);
    const { pedidos, loadProductosYPedidos } = useContext(ProductContext);

    useEffect(() => {
        loadProductosYPedidos();
    }, [  ])

    // loadProductosYPedidos();
    

    if ( status !== 'authenticated'){
        return (
            <LoginScreen />
        )
    }

    if( user?.uid ){
        pedidosCliente = pedidos.filter( item => item.uid === user!.uid )
    }

      
    return (
        <View>

            {
                (pedidosCliente.length > 0)
                ?
                (<FlatList 
                    data={ pedidosCliente }
                    renderItem={ ( {item} ) => (
                    <PedidoIndividual 
                        nombre={ item.name }
                        date={ item.date}
                        seleccionShort={ item.seleccionShort }
                        enviado={ item.completado }
                    />)}
                    keyExtractor={ item => String(item.pedidoId) }
                    ListHeaderComponent={<View style={{ height: 30}}/>}
                    ListFooterComponent={<View style={{ height: 100}}/>}
                    showsVerticalScrollIndicator={ false }
                />)

                :
                (
                    <View style={{ marginHorizontal: 20, justifyContent: 'space-around'}}>
            <View style={ styles.contenedor}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 30}}>No tienes pedidos</Text>
                <Text style={ styles.textoContenedor }>Entra en la sección</Text>
                <Text style={ styles.textoContenedor }>"Listado de Cafés"</Text>
                <Text style={ styles.textoContenedor }>y tus encargos</Text>
                <Text style={ styles.textoContenedor }>aparecerán en</Text>
                <Text style={ styles.textoContenedor }>esta sección</Text>
            </View>
            <View style={{ width: 200, alignSelf: 'center'}}>
            </View>
            
        </View>
                )

            }

            

        </View>
    );
}

const styles = StyleSheet.create({

    contenedor: {
        backgroundColor: '#FAEBD7',
        borderRadius: 15,
        paddingVertical: 40,
        paddingHorizontal: 10,
        marginBottom: 40,
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
    },
    textoContenedor: {
        fontSize: 20
    }
});
