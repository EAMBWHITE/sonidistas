import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
} from "@mui/material";
import BasicDatePicker from "./BasicDatePicker";
import useFireBaseApi from "../api/firebaseApi";
import { FechaType, UsuarioType } from "./types/firebaseTypes.type";
import { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";

export default function DrawerAddFecha() {
  const [isOpen, setIsOpen] = useState(false);
  const [responsable, setResponsable] = useState<UsuarioType | null>(null);
  const [soporte, setSoporte] = useState<UsuarioType | null>(null);
  const [fecha, setValue] = useState<Dayjs | null>(null);
  const { saveFecha, sonidistas } = useFireBaseApi();

  const handleSaveFecha = () => {
    debugger;

    // first ltes validate the fields
    if (soporte == null || responsable == null || fecha == null) return null;

    const d = fecha?.toDate() as Date;

    //create object
    const newFecha: FechaType = {
      fecha: Timestamp.fromDate(d),
      responsables: {
        principal: responsable?.id as string,
        datos_principal: responsable as UsuarioType,
        soporte: soporte?.id as string,
        datos_soporte: soporte as UsuarioType,
      },
    };
    saveFecha(newFecha);
    clearForm();
  };

  const clearForm = () => {
    setSoporte(null);
    setResponsable(null);
    setValue(null);
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
        <BasicDatePicker title="Fecha" value={fecha} setValue={setValue} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
        <Autocomplete
          disablePortal
          id="combo-box-principal"
          options={sonidistas}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Respoonsable" />
          )}
          onChange={(event: any, newValue: any) => {
            setResponsable(newValue);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" py="1rem">
        <Autocomplete
          disablePortal
          id="combo-box-soporte"
          options={sonidistas}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Soporte" />}
          onChange={(event: any, newValue: any) => {
            setSoporte(newValue);
          }}
        />
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
