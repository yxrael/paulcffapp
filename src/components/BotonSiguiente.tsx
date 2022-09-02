import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BotonSiguiente = () => {

    const navigation = useNavigation<any>();

    const handleNext = () => {
        console.log('pagina siguiente');
        navigation.navigate('RevisaPedido');
    }

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
                <Ionicons name='chevron-forward-outline' size={35} color='#808000'/>

                    {/* <Text style={{ fontWeight: 'bold' }}>OK</Text> */}
                </View>
            </TouchableOpacity>
        </View>
    );
}
