import React, { useReducer, createContext, useEffect, useState } from "react";
import { LoginPrincipal } from "../firebase/callers";
// import AsyncStorage from '@react-native-async-storage/async-storage';



// import cafeApi from "../api/cafeApi";
import {  Usuario, LoginData } from "../interfaces/appInterfaces";
import { signInWithGoogle } from "../firebase/providers";
// import { AuthReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string;
    // token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( ) => void;
    signIn: ( loginData: LoginData) => void;
    // signIn: () => void;
    logOut: () => void;
    removeError: () => void;
}

interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    // token: string | null;
    errorMessage: string;
    // user: Usuario | null;
    user: any
}


const authInitialState:  AuthState = {
    status: 'checking',
    // token: null,
    user: null,
    errorMessage: ''
} 

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children}: any) => {

    // const [state, dispatch] = useReducer( AuthReducer, authInitialState );
    const [state, dispatch] = useState( authInitialState );

    useEffect(() => {
    
        checkUser();
        
    }, [])


    const checkUser = async () => {

        // if( state.user === ''){
        //     return dispatch({ ...state, status: 'not-authenticated' })
        // }

        // if( state.user !== ''){
        //     return dispatch({ ...state, status: 'authenticated' })
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

    const signIn = async ( { correo, password }: LoginData ) => {
    // const signIn = async ( ) => {

        try {

            // const result = await LoginPrincipal( {correo, password} );
            const result = await signInWithGoogle( {correo, password} );

            // console.log( result.ok );
            if( result.ok ){
                dispatch({
                    status: "authenticated",
                    user: result,
                    errorMessage: ''
                })
            } else {
                dispatch({
                    status: "not-authenticated",
                    user: '',
                    errorMessage: 'error'
                })
            }

            
        } catch (error) {
            
        }

        // try {

        //     const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } );
        //     dispatch({  type: 'signUp',
        //                 payload: {
        //                     token: data.token,
        //                     user: data.usuario
        //     }});

        //     await AsyncStorage.setItem('token', data.token );

        // } catch (error: any) {
        //     dispatch({ 
        //         type: 'addError', 
        //         payload: error.response.data.msg || 'Información incorrecta'
        // });
        // }

    };
    const signUp= async (  ) => {

        // try {
        //     const { data } = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password, nif } );
    
        //     dispatch({  type: 'signUp',
        //                 payload: {
        //                     token: data.token,
        //                     user: data.usuario
        //     }});

        //     await AsyncStorage.setItem( 'token', data.token );

        //     } catch ( error: any) {
        //         dispatch({ 
        //             type: 'addError', 
        //             payload: error.response.data.errors[0].msg || 'Error. Revisa la información'
        //         });
        //     }
    };

    const logOut= async () => {
        // await AsyncStorage.removeItem( 'token' );
        return dispatch({ 
                status: "not-authenticated",
                user: '',
                errorMessage: ''
        })
    };

    const removeError= () => {

        return dispatch({
            status: "not-authenticated",
            user: '',
            errorMessage: ''
        })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )
}