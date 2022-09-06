import React, { useReducer, createContext, useEffect, useState } from "react";
import { LoginPrincipal } from "../firebase/callers";
import AsyncStorage from '@react-native-async-storage/async-storage';



// import cafeApi from "../api/cafeApi";
import {  Usuario, LoginData, UsuarioStorage } from "../interfaces/appInterfaces";
import { signInWithGoogle } from "../firebase/providers";
// import { AuthReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string;
    // token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( ) => void;
    signIn: ( loginData: LoginData) => void;
    // signInStorage: ( user: UsuarioStorage ) => void;
    // signIn: () => void;
    checkUsuario: () => void;
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
    
        checkUsuario();
        
    }, [])

    const checkUsuario =  async () => {

        const user =  await getData();

        if (!user.uid || user.uid === undefined){
            dispatch({ 
                status: "not-authenticated",
                user: '',
                errorMessage: ''
        })
        };
    
        if( user.uid !== undefined){
            dispatch({
                status: "authenticated",
                user,
                errorMessage: ''
            }) 
            // signInStorage( checkYaLoggeado );
        }
    
    }

    const getData = async () => {
        try {
    
        const usuarioQuest: any = await AsyncStorage.getItem('usuario');
        const usuarioRegistrado  = JSON.parse( usuarioQuest);
    
        if (!usuarioRegistrado){
            return{}
        };
        if ( usuarioRegistrado.uid !== ''){
            return usuarioRegistrado;
            } else {
                return {}
            }
    
        } catch(e) {
        // error reading value
        console.log(e);
        }
    }


    // const checkUser = async () => {

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

    // }

    // const signInStorage = async ( user: UsuarioStorage ) => {
        
    //                 dispatch({
    //                     status: "authenticated",
    //                     user,
    //                     errorMessage: ''
    //                 })    
    //     };

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
        await AsyncStorage.removeItem( 'usuario' );
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
            removeError,
            // signInStorage,
            checkUsuario
        }}>
            { children }
        </AuthContext.Provider>
    )
}