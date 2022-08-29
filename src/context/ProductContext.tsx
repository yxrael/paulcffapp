import React, { createContext, useEffect, useState } from "react";
import { LoginPrincipal } from "../firebase/callers";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { cargaPedidos, cargaProductos } from "../firebase/providers";
import { Producto, Pedido, UnidadPedido } from '../interfaces/appInterfaces';

type ProductContextProps = {
    productos: Producto[],
    pedidos: Pedido[],
    status: 'checking' | 'loaded' | 'not-loaded',
    loadProductosYPedidos: () => void
    // errorMessage: string;
    // // token: string | null;
    // user: Usuario | null;
    // status: 'checking' | 'authenticated' | 'not-authenticated';
    // signUp: ( registerData: RegisterData ) => void;
    // signIn: ( loginData: LoginData) => void;
    // // signIn: () => void;
    // logOut: () => void;
    // removeError: () => void;
}

interface ProductState {
    status: 'checking' | 'loaded' | 'not-loaded',
    productos: Producto[],
    pedidos: Pedido[]
}


const productInitialState:  ProductState = {
    productos: [],
    pedidos: [],
    status: 'checking'
} 

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children}: any) => {

    const [stateProductos, dispatch] = useState( productInitialState );

    useEffect(() => {

        loadProductosYPedidos();
    
        checkProductos();
        
    }, [])


    const checkProductos = async () => {

        // if( stateProductos.user === ''){
        //     return dispatch({ ...stateProductos, status: 'not-authenticated' })
        // }

        // if( stateProductos.user !== ''){
        //     return dispatch({ ...stateProductos, status: 'authenticated' })
        // }

        // if( state.status === 'not-authenticated'){

        // }
      
        // const token = await AsyncStorage.getItem('token');
        // // token no autenticado
        // if ( !token ) return dispatch({ type: 'notAuthenticaded' });

        // // Hay token
        // const resp = await cafeApi.get('/auth');
        // if ( resp.status !== 200 ){
        //     return dispatch({ type: 'notAuthenticaded'});
        // }

        // await AsyncStorage.setItem( 'token', resp.data.token );

        // dispatch({  type: 'signUp',
        //                 payload: {
        //                     token: resp.data.token,
        //                     user: resp.data.usuario
        //     }});

    }

    const loadProductosYPedidos = async ( ) => {

        const listadoProductos = await cargaProductos();
        const listadoPedidos = await cargaPedidos();
        dispatch( {
            ...stateProductos,
            pedidos: listadoPedidos,
            productos: listadoProductos,
            status: 'loaded'
        } )

    };


    // const signUp= async ( { nombre, correo, password, nif }: RegisterData ) => {

    //     // try {
    //     //     const { data } = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password, nif } );
    
    //     //     dispatch({  type: 'signUp',
    //     //                 payload: {
    //     //                     token: data.token,
    //     //                     user: data.usuario
    //     //     }});

    //     //     await AsyncStorage.setItem( 'token', data.token );

    //     //     } catch ( error: any) {
    //     //         dispatch({ 
    //     //             type: 'addError', 
    //     //             payload: error.response.data.errors[0].msg || 'Error. Revisa la información'
    //     //         });
    //     //     }
    // };

    // const logOut= async () => {
    //     // await AsyncStorage.removeItem( 'token' );
    //     return dispatch({ 
    //             status: "not-authenticated",
    //             user: '',
    //             errorMessage: ''
    //     })
    // };

    // const removeError= () => {

    //     return dispatch({
    //         status: "not-authenticated",
    //         user: '',
    //         errorMessage: ''
    //     })
    // };

    return (
        <ProductContext.Provider value={{
            ...stateProductos,
            loadProductosYPedidos
        }}>
            { children }
        </ProductContext.Provider>
    )
}