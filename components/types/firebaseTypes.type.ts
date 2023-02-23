import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type UsuarioType = {
  id?: string;
  activo: boolean;
  nombre: string;
};

export type FechaType = {
  id?: string;
  fecha: Timestamp;
  responsables: {
    principal: string;
    datos_principal?: UsuarioType;
    soporte: string;
    datos_soporte?: UsuarioType;
  };
};
