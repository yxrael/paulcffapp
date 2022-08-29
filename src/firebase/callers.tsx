import { LoginData } from "../interfaces/appInterfaces";
import { signInWithGoogle } from "./providers"

export const LoginPrincipal = async ( { correo, password }: LoginData) => {

    const result = await signInWithGoogle( {correo, password} );
    
    return result

}


// POSIBLE ELIMINACIÓN DE ESTE FICHERO, LLAMADA DIRECTA DE AUTHCONTEXT A PROVIDERS
