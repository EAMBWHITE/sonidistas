import { createContext, ReactFragment, useContext, useState } from "react";
import { FechaType } from "../components/types/firebaseTypes.type";

export type AppContextType = {
  listFechas: FechaType[];
  setListFechas: (x: FechaType[]) => void;
};

const defaultContext: AppContextType = {
  listFechas: [],
  setListFechas: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const AppContextProvider = ({
  children,
}: {
  children: ReactFragment;
}) => {
  const [listFechas, setListFechas] = useState<FechaType[]>([]);

  return (
    <AppContext.Provider
      value={{
        listFechas,
        setListFechas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
