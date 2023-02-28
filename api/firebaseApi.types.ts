import { UserCredential } from "firebase/auth";
import { FechaType, UsuarioType } from "../components/types/firebaseTypes.type";

export type useFireBaseApiType = {
  sonidistas: UsuarioType[];
  saveFecha: (fecha: FechaType) => Promise<PostSaveFechaType>;
  fechas: FechaType[];
  loginWithEmailandPassword: (
    email: string,
    password: string
  ) => Promise<LoginWithEmailType>;
};

export type LoginWithEmailType = {
  ok: boolean;
  user?: UserCredential;
  error?: string;
};

export type PostSaveFechaType = {
  ok: boolean;
  doc?: string;
  error?: string;
};
