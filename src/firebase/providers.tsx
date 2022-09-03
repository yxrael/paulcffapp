import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginData } from '../interfaces/appInterfaces';
import { FirebaseAuth, FirebaseDB } from './config';
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UsuarioStorage {
    displayName: string | null, 
    email: string | null,
    photoURL: string | null,
    uid: string | null
}


export const signInWithGoogle = async( { correo, password }: LoginData) => {

    try {

        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
        const {displayName, email, photoURL, uid } = userCredential.user;

        const usuarioRegistrado: UsuarioStorage = {
            displayName, email, photoURL, uid
        };

        storeData( usuarioRegistrado )

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
        
    } catch (error) {
        // console.log(error)
        return { ok: false, error }
    }
} 

const storeData = async (usuarioRegistrado: UsuarioStorage) => {
    console.log( JSON.stringify(usuarioRegistrado))
    try {
      const jsonValue = JSON.stringify(usuarioRegistrado)
    // const jsonValue = 'storage test';
      await AsyncStorage.setItem('@usuario', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

export const checkUsuario =  () => {

    onAuthStateChanged(FirebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}




export const cargaProductos = async () => {

    try {
        const querySnapshot = await getDocs(collection(FirebaseDB, "listado2"));

        let listadoProductos: any = [];

        querySnapshot.forEach( snapHijo  => {
            listadoProductos.push( snapHijo.data());
        });

        return listadoProductos;
        
    } catch (error) {
        // console.log(error)
        return { ok: false, error }
    }
}

export const cargaPedidos = async () => {

    try {
        const querySnapshot = await getDocs(collection(FirebaseDB, "pedidos"));

        let listadoPedidos: any = [];

        querySnapshot.forEach( snapHijo  => {
            listadoPedidos.push( snapHijo.data());
        });

        return listadoPedidos;
        
    } catch (error) {
        // console.log(error)
        return { ok: false, error }
    }
}