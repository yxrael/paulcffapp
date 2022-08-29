import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import { PedidoIndividual } from '../components/PedidoIndividual';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { Pedido } from '../interfaces/appInterfaces';
import { LoginScreen } from './LoginScreen';


export const MisPedidos = () => {

    let pedidosCliente: Pedido[] = [];
    

    const { user, status } = useContext(AuthContext);
    const { pedidos } = useContext(ProductContext);

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
            <Text>MIS PEDIDOS</Text>
            <Text>{ user?.uid }</Text>
            <Text>{ user?.displayName }</Text>
            <Text>******</Text>

            <FlatList 
                data={ pedidosCliente }
                renderItem={ ( {item} ) => (
                <PedidoIndividual 
                    nombre={ item.name }
                    date={ item.date}
                    seleccionShort={ item.seleccionShort }
                />)}
                keyExtractor={ item => String(item.pedidoId) }
            />
            

        </View>
    );
}

const styles = StyleSheet.create({

});