import firebaseApp from "../api/clientApp";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import {
  FechaType,
  UsuarioType,
} from "../../components/types/firebaseTypes.type";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../context/snackbar";

export type useFireBaseApiType = {
  sonidistas: UsuarioType[];
  saveFecha: (fecha: FechaType) => void;
  fechas: FechaType[];
};

const db = getFirestore(firebaseApp);

export const getData = async (): Promise<{ data: FechaType[] }> => {
  const today = new Date();

  const q = query(collection(db, "fechas"), where("fecha", ">=", today));

  const querySnapshot = await getDocs(q);

  let rolData: FechaType[] = [];

  querySnapshot.forEach((item) => {
    let rol = item.data() as FechaType;
    rol.id = item.id;
    rolData.push(rol);
  });
  return {
    data: rolData.sort((a, b) => a.fecha.toMillis() - b.fecha.toMillis()),
  };
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

  //update the context
  // context?.setListFechas(list as FechaType[]);

  return {
    data: list as FechaType[],
  };
};

export const saveFecha = async (fecha: FechaType) => {
  const docRef = await addDoc(collection(db, "fechas"), fecha);
};

export const getSonidistas = async () => {
  const querySnapshot = await getDocs(collection(db, "usuario"));

  const convertData: any[] = [];

  querySnapshot.forEach((item) => {
    const user = item.data();
    convertData.push({
      id: item.id,
      label: user.nombre,
    });
  });

  return {
    data: convertData,
  };
};

export default function useFireBaseApi(): useFireBaseApiType {
  const [listSonidistas, setListSonidistas] = useState<any[]>([]);
  const context = useAppContext();
  const { notifySuccess, notifyError } = useSnackbar();

  useEffect(() => {
    const dataResponsables = async () => {
      const fechas = await getResponsables();
      const { data } = fechas;
      context.setListFechas(data);
    };

    const dataSonidistas = async () => {
      const list = await getSonidistas();
      const { data } = list;
      setListSonidistas(data);
    };

    dataResponsables();
    dataSonidistas();
  }, []);

  const handeSaveFecha = (fecha: FechaType) => {
    //validate date already exist
    const prevDate = context.listFechas.find(
      (e) =>
        new Date(e.fecha.toDate()).toISOString() ==
        new Date(fecha.fecha.toDate()).toISOString()
    );

    if (prevDate === undefined) {
      // saveFecha(fecha).then(() =>
      //   context?.setListFechas([...context.listFechas, fecha])
      // );
      notifySuccess("Fecha agregada correctamente");
    } else {
      notifyError("Esa fecha ya existe");
    }
  };

  return {
    fechas: context.listFechas,
    saveFecha: handeSaveFecha,
    sonidistas: listSonidistas,
  };
}
