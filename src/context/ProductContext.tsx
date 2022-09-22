import React, { createContext, useEffect, useState } from "react";
import { LoginPrincipal } from "../firebase/callers";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { cargaPedidos, cargaProductos, enviaPedidoDB } from "../firebase/providers";
import { Producto, Pedido, UnidadPedido } from '../interfaces/appInterfaces';

type ProductContextProps = {
    productos: Producto[],
    pedidos: Pedido[],
    status: 'checking' | 'loaded' | 'not-loaded',
    loadProductosYPedidos: () => void,
    cambiaCantidadCafeEnPedido: ( id: number, cantidad: number ) => void,
    eliminaCafeEnPedido: ( id: number ) => void,
    modificaObservaciones: ( observaciones: string ) => void,
    modificaBolsas: ( bolsas: number) => void,
    enviaPedido: ( pedido: Pedido ) => void
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

    const enviaPedido = async ( pedido: Pedido ) => {

        dispatch( {
            ...stateProductos,
            status: 'not-loaded'
        } )

        await enviaPedidoDB( pedido );   

        dispatch( productInitialState );

        loadProductosYPedidos();

    }

    const cambiaCantidadCafeEnPedido = ( id: number, cantidad: number ) => {
        const cantidadModificada = stateProductos.productos.map( item => {
            if( item.id === id){
                item.cantidad = cantidad;
            }
            return item
        })
        dispatch( {
            ...stateProductos,
            productos: cantidadModificada
        } )
    }

    const eliminaCafeEnPedido = ( id: number ) => {
        const cantidadModificada = stateProductos.productos.map( item => {
            if( item.id === id){
                item.cantidad = 0;
            }
            return item
        })
        dispatch( {
            ...stateProductos,
            productos: cantidadModificada
        } )
    }

    const modificaBolsas = ( bolsas: number ) => {
        // stateProductos.pedidos[0].bolsas
        // dispatch({ ...stateProductos } )

    }

    const modificaObservaciones = ( observaciones: string ) => {

    }

    return (
        <ProductContext.Provider value={{
            ...stateProductos,
            loadProductosYPedidos,
            cambiaCantidadCafeEnPedido,
            eliminaCafeEnPedido,
            modificaBolsas,
            modificaObservaciones,
            enviaPedido
        }}>
            { children }
        </ProductContext.Provider>
    )
}