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
import CustomizedSnackbar, {
  CustomizedSnackbarsType,
} from "../context/snackbar/CustomSnackbar";

export default function DrawerAddFecha() {
  const [isOpen, setIsOpen] = useState(false);
  const [responsable, setResponsable] = useState<UsuarioType | null>(null);
  const [soporte, setSoporte] = useState<UsuarioType | null>(null);
  const [fecha, setValue] = useState<Dayjs | null>(null);
  const [alertVal, setAlertVal] = useState<CustomizedSnackbarsType | null>(
    null
  );
  const { saveFecha, sonidistas } = useFireBaseApi();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertVal({ open: false });
  };

  const checkSonidista = (sonidista: UsuarioType): boolean => {
    if (sonidista !== null) {
      if (responsable !== null) {
        if (responsable?.nombre === sonidista.nombre) {
          setAlertVal({
            message: "Favor elegir un sonidista diferente",
            open: true,
            severity: "error",
            onClose: handleClose,
          });
          return false;
        }
      }
      if (soporte !== null) {
        if (soporte?.nombre === sonidista.nombre) {
          setAlertVal({
            message: "Favor elegir un sonidista diferente",
            open: true,
            severity: "error",
            onClose: handleClose,
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleSaveFecha = async () => {
    // first ltes validate the fields
    if (soporte == null || responsable == null || fecha == null) {
      setAlertVal({
        message: "Favor llenar todos los campos",
        open: true,
        severity: "error",
        onClose: handleClose,
      });
      return;
    }

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
    const data = await saveFecha(newFecha);
    if (data.ok) {
      setAlertVal({
        message: "Fecha agregada correctamente",
        open: true,
        severity: "success",
        onClose: handleClose,
      });
      clearForm();
    } else {
      setAlertVal({
        message: data.error,
        open: true,
        severity: "error",
        onClose: handleClose,
      });
    }
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
            <TextField {...params} label="Responsable" />
          )}
          onChange={(event: any, newValue: any) => {
            checkSonidista(newValue) && setResponsable(newValue);
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
            checkSonidista(newValue) && setSoporte(newValue);
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
            pt="30vh"
          >
            {drawerTitle}
            {drawerBody}
          </Box>
        </Box>
      </Drawer>
      <CustomizedSnackbar {...alertVal} />
    </>
  );
}
