import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useFireBaseApi from "../api/firebaseApi";
import CustomizedSnackbar, {
  CustomizedSnackbarsType,
} from "../context/snackbar/CustomSnackbar";
import { useAppContext } from "../context/AppContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertVal, setAlertVal] = useState<CustomizedSnackbarsType | null>(
    null
  );
  const { loginWithEmailandPassword } = useFireBaseApi();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setAdmin } = useAppContext();

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLogin();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleLogin = async () => {
    if (email == null || password == null) {
      setAlertVal({
        message: "Favor llenar todos los campos",
        open: true,
        severity: "error",
        onClose: handleClose,
      });
      return;
    }

    const data = await loginWithEmailandPassword(email, password);
    if (data.ok) {
      setAdmin(true);
    } else {
      setAlertVal({
        message: data.error,
        open: true,
        severity: "error",
        onClose: handleClose,
      });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            sx={{
              pb: "1rem",
            }}
            onChange={(value) => {
              setEmail(value.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(value) => {
              setPassword(value.target.value);
            }}
          />
          <Box py={2}>
            <Button
              variant="contained"
              color="info"
              size="medium"
              onClick={handleLogin}
            >
              Iniciar Sesion
            </Button>
          </Box>
        </Box>
      </Modal>
      <CustomizedSnackbar {...alertVal} />
    </div>
  );
}
