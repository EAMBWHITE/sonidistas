import Head from "next/head";
import styles from "../styles/Home.module.css";
import ListRol from "../components/_ListRol";
import DrawerAddFecha from "../components/_AddFecha";
import { Box } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import Login from "../components/_Login";

export default function Home() {
  const { admin } = useAppContext();
  return (
    <>
      <Head>
        <title>Sonidistas Bethel Tercera Iglesia Bautista</title>
        <meta
          name="description"
          content="Sitio web para ver rol de los sonidistas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ListRol />
        <Box pt={5}>{admin === true ? <DrawerAddFecha /> : <Login />}</Box>
      </main>
    </>
  );
}
