// import { Usuario } from "../interfaces/appInterfaces";



export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}

interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
    img?:   string;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticaded' }
    | { type: 'logout' }

export const AuthReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            };

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            };

        case 'notAuthenticaded':
            return {
                ...state,
                // errorMessage: 'Not authenticated',
                status: 'not-authenticated',
                token: null,
                user: null
            };

        case 'logout':
            return {
                ...state,
                errorMessage: '',
                status: 'not-authenticated',
                token: null,
                user: null
            }
            
        default:
            return state;
    }


}