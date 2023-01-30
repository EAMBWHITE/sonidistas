import { initializeApp } from "firebase/app";
import {
  DocumentReference,
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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getData = async (setFecha: any) => {
  const querySnapshot = await getDocs(collection(db, "fechas"));

  let rolData: any[] = [];

  await querySnapshot.forEach(async (item) => {
    let newItem = { ...(item.data() as any) };
    console.log(newItem);
    if (newItem.responsables.principal && newItem.responsables.soporte) {
      const sonidistaPrincipal = doc(
        db,
        `usuario/${newItem.responsables.principal}`
      );

      let dataPrincipal = await getDoc(sonidistaPrincipal);
      if (dataPrincipal.exists()) {
        newItem.responsables.datos_principal = dataPrincipal.data() as any;
      }

      const sonidistaSoporte = doc(
        db,
        `usuario/${newItem.responsables.soporte}`
      );

      let dataSoporte = await getDoc(sonidistaSoporte);
      if (dataSoporte.exists()) {
        newItem.responsables.datos_soporte = dataSoporte.data() as any;
      }

      rolData.push(newItem);
    } else {
      rolData.push(newItem);
    }
  });
  return rolData;
};
