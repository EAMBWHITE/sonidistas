import { useEffect, useState } from "react";
import querySnapshot from "../pages/api/firebaseApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FechaType } from "./types/firebaseTypes.type";

export default function ListRol() {
  const [fechas, setFechas] = useState<FechaType[]>(querySnapshot || null);

  const getLocaleDate = (date: Date) => {
    var options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options).toUpperCase();
  };

  useEffect(() => {
    console.log(querySnapshot);
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {fechas.map((fecha) => {
        return (
          <ListItem key={fecha.responsables.principal}>
            <ListItemText
              primary={getLocaleDate(fecha.fecha.toDate())}
              secondary={fecha.responsables.principal}
            />
          </ListItem>
        );
      })}
      <ListItem>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}
