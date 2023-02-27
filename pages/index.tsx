import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import ListRol from "../components/_ListRol";
import DrawerAddFecha from "../components/_AddFecha";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <Box pt={5}>
          <DrawerAddFecha />
        </Box>
      </main>
    </>
  );
}
