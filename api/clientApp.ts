import { initializeApp } from "firebase/app";

const clientCredentials = {
  apiKey: "AIzaSyCwSsnnN9Xomg51aZFW6JHN7cLIF56nOXE",
  authDomain: "inventario-fe7ab.firebaseapp.com",
  databaseURL: "https://inventario-fe7ab.firebaseio.com",
  projectId: "inventario-fe7ab",
  storageBucket: "inventario-fe7ab.appspot.com",
  messagingSenderId: "343388459620",
  appId: "1:343388459620:web:b294ee7cd61299c6d88571",
};

const app = initializeApp(clientCredentials);

export default app;
