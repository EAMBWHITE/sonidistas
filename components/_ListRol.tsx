import { useCallback, useEffect, useState } from "react";
// import { getData } from "../pages/api/firebaseApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getLocaleDate } from "../pages/api/util";
import { Avatar, ListItemAvatar } from "@mui/material";
import firebaseApp from "../pages/api/clientApp";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ListRol() {
  // const [fechas, setFechas] = useState<any[]>([]);
  const [fechas, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), "fechas"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  fechas?.docs.map((item) => {
    return (
      // <ListItem key={item.responsables.principal}>
      //   <ListItemText
      //     primary={getLocaleDate(item.fecha.toDate())}
      //     primaryTypographyProps={{
      //       fontSize: 20,
      //       fontWeight: "medium",
      //       letterSpacing: 0,
      //       color: "black",
      //     }}
      //     secondary={item.responsables.datos_principal?.nombre}
      //   />
      // </ListItem>
      console.log(item.data())
    );
  });

  return (
    // <>
    //   {fechas.length > 0 ? (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </>
    </List>
    //   ) : (
    //     <CircularProgress color="secondary" />
    //   )}
    // </>
  );
}
