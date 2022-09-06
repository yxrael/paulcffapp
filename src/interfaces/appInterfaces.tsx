

export interface LoginData {
    correo:   string;
    password: string
}

export interface Producto {
    cantidad: number,
    continente: string,
    descafeinado: boolean,
    disponible: boolean,
    fileName: string,
    id: number,
    infoExtra: string,
    nombre: string,
    pais: string,
    precio: string,
    proceso: string,
    puntos: string,
    rutaURL: string,
    tipoCliente: string
}


export interface Pedido {
    bolsas: string,
    completado: boolean,
    date: string,
    name: string,
    observaciones: string,
    pedidoId: string,
    seleccionShort: UnidadPedido[],
    tipoCliente: string,
    total: number,
    uid: string
}

export interface UnidadPedido {
    cantidad: number,
    id: number,
    nombre: string,
    pais: string,
    proceso: string
}

export interface Usuario {
    displayName: string,
    email: string,
    ok: string,
    photoURL: string,
    uid: string
}



export interface UsuarioStorage {
    displayName: string | null, 
    email: string | null,
    photoURL: string | null,
    uid: string | null
}



