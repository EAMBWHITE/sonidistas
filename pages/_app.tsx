import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { SnackbarContextProvider } from "../context/snackbar/SnackBarContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <></>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
