import { useContext } from "react";
import {
  SnackbarContext,
  SnackbarContextType,
} from "../snackbar/SnackBarContext";

export default function useSnackbar(): SnackbarContextType {
  return useContext(SnackbarContext);
}
