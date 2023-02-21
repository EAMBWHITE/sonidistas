import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import BasicDatePicker from "./BasicDatePicker";
import { getSonidistas, saveFecha } from "../pages/api/firebaseApi";
import { FechaType } from "./types/firebaseTypes.type";
import { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";

export default function DrawerAddFecha() {
  const [isOpen, setIsOpen] = useState(false);
  const [listSonidistas, setListSonidistas] = useState<any[]>([]);
  const [responsable, setResponsable] = useState("");
  const [soporte, setSoporte] = useState("");
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchSonidistas = async () => {
      const list = await getSonidistas();
      setListSonidistas(list.data);
    };

    fetchSonidistas();
  }, []);

  const handleSaveFecha = () => {
    const d = value?.toDate() as Date;

    //create object
    const fecha: FechaType = {
      fecha: Timestamp.fromDate(d),
      responsables: {
        principal: responsable,
        soporte: soporte,
      },
    };
    saveFecha(fecha);
  };

  const drawerTitle = (
    <Box
      alignItems="center"
      height={34}
      width={[1, 1, 1 / 2]}
      justifyContent={["center", "center", "flex-start"]}
    >
      <Typography variant="h6" align="center">
        Selecciona una fecha
      </Typography>
    </Box>
  );

  const drawerBody = (
    <Box
      width={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
        <BasicDatePicker title="Fecha" value={value} setValue={setValue} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
        {/* <Typography>
          Responsable */}
        <Autocomplete
          disablePortal
          id="combo-box-principal"
          options={listSonidistas}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Respoonsable" />
          )}
          onChange={(event: any, newValue: any) => {
            setResponsable(newValue?.id);
          }}
        />
        {/* </Typography> */}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
        {/* <Typography>
          Soporte */}
        <Autocomplete
          disablePortal
          id="combo-box-soporte"
          options={listSonidistas}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Soporte" />}
          onChange={(event: any, newValue: any) => {
            setSoporte(newValue?.id);
          }}
        />
        {/* </Typography> */}
      </Box>
      <Button onClick={() => handleSaveFecha()}>Agregar</Button>
    </Box>
  );

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Fechas</Button>
      <Drawer
        anchor="right"
        open={isOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: "40vw",
          },
        }}
        onClose={() => setIsOpen(false)}
      >
        <Box
          width={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pt={3}
        >
          <Box
            width={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {drawerTitle}
            {drawerBody}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
