import firebaseApp from "../api/clientApp";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  FechaType,
  UsuarioType,
} from "../../components/types/firebaseTypes.type";

const db = getFirestore(firebaseApp);

export const getData = async (): Promise<{ data: FechaType[] }> => {
  const querySnapshot = await getDocs(collection(db, "fechas"));

  let rolData: FechaType[] = [];

  querySnapshot.forEach((item) => {
    let rol = item.data() as FechaType;

    rolData.push(rol);
  });
  return { data: rolData };
};

export const getResponsables = async () => {
  const fechas = await getData();

  const { data } = fechas;

  const list = await Promise.all(
    data.map(async (rol: FechaType) => {
      if (rol.responsables?.principal) {
        const sonidistaPrincipal = doc(
          db,
          `usuario/${rol.responsables.principal}`
        );

        let dataPrincipal = await getDoc(sonidistaPrincipal);
        rol.responsables.datos_principal = dataPrincipal.data() as UsuarioType;

        const sonidistaSoporte = doc(db, `usuario/${rol.responsables.soporte}`);
        let dataSoporte = await getDoc(sonidistaSoporte);
        rol.responsables.datos_soporte = dataSoporte.data() as UsuarioType;

        return rol;
      }
    })
  );

  return {
    data: list as FechaType[],
  };
};
