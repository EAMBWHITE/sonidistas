import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getLocaleDate } from "../pages/api/util";
import { Avatar, ListItemAvatar } from "@mui/material";
import { getResponsables } from "../pages/api/firebaseApi";
import { FechaType } from "./types/firebaseTypes.type";

export default function ListRol() {
  const [listFechas, setFechas] = useState<FechaType[]>([]);

  useEffect(() => {
    const data = async () => {
      const fechas = await getResponsables();
      const { data } = fechas;
      setFechas(data);
    };
    data();
  }, []);

  const listItemFechas = listFechas?.map((item: any) => {
    return (
      <ListItem key={item?.responsables?.principal}>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={getLocaleDate(item?.fecha?.toDate())}
          primaryTypographyProps={{
            fontSize: 18,
            fontWeight: "medium",
            letterSpacing: 0,
            color: "Black",
          }}
          secondary={`${item?.responsables?.datos_principal?.nombre} - ${item?.responsables?.datos_soporte?.nombre}`}
          secondaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
            letterSpacing: 0,
            color: "black",
          }}
        />
      </ListItem>
    );
  });

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {listItemFechas}
    </List>
  );
}
