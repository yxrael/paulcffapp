import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginData } from '../interfaces/appInterfaces';
import { FirebaseAuth, FirebaseDB } from './config';
import { collection, getDocs } from "firebase/firestore";


export const signInWithGoogle = async( { correo, password }: LoginData) => {

    try {

        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, correo, password);
        const {displayName, email, photoURL, uid } = userCredential.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
        
    } catch (error) {
        // console.log(error)
        return { ok: false, error }
    }

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