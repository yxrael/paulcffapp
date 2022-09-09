import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginData, Pedido, UsuarioStorage } from '../interfaces/appInterfaces';
import { FirebaseAuth, FirebaseDB } from './config';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const signInWithGoogle = async( { correo, password }: LoginData) => {

    try {

        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
        const {displayName, email, photoURL, uid } = userCredential.user;


        const usuarioRegistrado: UsuarioStorage = {
            displayName, 
            email, 
            photoURL, 
            uid,
        };

        storeData( usuarioRegistrado )

        return {
            ok: true,
            displayName, email, photoURL, uid, errorMessage: ''
        };
        
    } catch (error) {
        // console.log(error)
        return { ok: false, error }
    }
} 

const storeData = async (usuarioRegistrado: UsuarioStorage) => {

    try {
      const jsonValue = JSON.stringify(usuarioRegistrado)

    await AsyncStorage.setItem('usuario', jsonValue );

    } catch (e) {
      // saving error
      console.log(e);
    }
  }

// const getData = async () => {
//     try {

//     const usuarioRegistrado: any = await AsyncStorage.getItem('usuario');

//     if (!usuarioRegistrado){
//         return{}
//     };
//     if ( usuarioRegistrado.uid !== ''){
//         return usuarioRegistrado;
//         } else {
//             return {}
//         }

//     } catch(e) {
//     // error reading value
//     console.log(e);
//     }
// }

// export const checkUsuario =  async () => {

//     const checkYaLoggeado =  await getData();
//     console.log( checkYaLoggeado);

//     if( checkYaLoggeado !== {}){
//         // signInStorage( checkYaLoggeado );
//     }

// }

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

export const enviaPedidoDB = async ( pedido: Pedido ) => {
    
    try {

        await setDoc(doc(FirebaseDB, "pedidos", `${pedido.pedidoId}`), { ...pedido });
        // await setDoc(doc(FirebaseDB, "pedidos", `${pedido.pedidoId}`), {
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        //   } );
        
    } catch (error) {
        console.log( error )
    }

}