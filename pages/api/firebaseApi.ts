import { initializeApp } from "firebase/app";
import { DocumentReference, getFirestore } from "firebase/firestore";
import { collection, getDocs,getDoc } from "firebase/firestore"; 
import { FechaType, UsuarioType } from "../../components/types/firebaseTypes.type";

const firebaseConfig = {
    apiKey: "AIzaSyCwSsnnN9Xomg51aZFW6JHN7cLIF56nOXE",
    authDomain: "inventario-fe7ab.firebaseapp.com",
    databaseURL: "https://inventario-fe7ab.firebaseio.com",
    projectId: "inventario-fe7ab",
    storageBucket: "inventario-fe7ab.appspot.com",
    messagingSenderId: "343388459620",
    appId: "1:343388459620:web:b294ee7cd61299c6d88571"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "fechas"));

let productsWithUser:FechaType[] = []

querySnapshot.forEach(async (doc) => {
  let newItem = {...doc.data() as FechaType};
  if(newItem.responsables.principal|| newItem.responsables.soporte) {
    let userData = await getDoc(newItem.responsables.principal as unknown as DocumentReference);
    if(userData.exists()) {
      newItem.responsables.datos_principal=userData.data() as UsuarioType;
    }
    productsWithUser.push(newItem);
  } else {
    productsWithUser.push(newItem);
  }
});


export default productsWithUser;

