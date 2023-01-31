import { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import BasicDatePicker from "./BasicDatePicker";

export default function DrawerAddFecha() {
  const [isOpen, setIsOpen] = useState(false);

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
      <BasicDatePicker title="" />
    </Box>
  );

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Agregar Fecha</Button>
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
          <Box width={1} flexDirection="column" justifyContent="center">
            {drawerTitle}
            {drawerBody}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
