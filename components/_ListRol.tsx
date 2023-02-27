import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getLocaleDate } from "../api/util";
import { Avatar, ListItemAvatar } from "@mui/material";
import useFireBaseApi, { getResponsables } from "../api/firebaseApi";
import { FechaType } from "./types/firebaseTypes.type";

export default function ListRol() {
  const { fechas } = useFireBaseApi();

  const listItemFechas = fechas?.map((item: FechaType) => {
    return (
      <ListItem key={item?.id}>
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
