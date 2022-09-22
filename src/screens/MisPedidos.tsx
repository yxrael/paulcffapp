import React, { useContext } from 'react';
import { FlatList, View} from 'react-native';
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

            <FlatList 
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
            />

        </View>
    );
}
