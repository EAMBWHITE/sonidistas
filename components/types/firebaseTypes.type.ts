import { DocumentSnapshot, Timestamp } from "firebase/firestore"

export type UsuarioType={
    activo:boolean,
    nombre:string
}

export type FechaType={
    id:DocumentSnapshot,
    fecha:Timestamp,
    responsables:{
        principal:string,        
        datos_principal?:UsuarioType,
        soporte:string,
        datos_soporte?:UsuarioType,
    }
}