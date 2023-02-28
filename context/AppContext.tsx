import { createContext, ReactFragment, useContext, useState } from "react";
import { FechaType } from "../components/types/firebaseTypes.type";

export type AppContextType = {
  listFechas: FechaType[];
  setListFechas: (x: FechaType[]) => void;
  admin: boolean;
  setAdmin: (x: boolean) => void;
};

const defaultContext: AppContextType = {
  listFechas: [],
  setListFechas: () => {},
  admin: true,
  setAdmin: (value: boolean) => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const AppContextProvider = ({
  children,
}: {
  children: ReactFragment;
}) => {
  const [listFechas, setListFechas] = useState<FechaType[]>([]);
  const [admin, setAdmin] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        listFechas,
        setListFechas,
        admin,
        setAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
