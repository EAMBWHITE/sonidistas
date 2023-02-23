import {
  SnackbarCloseReason,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material/Snackbar";
import { Alert, AlertProps, Box, Snackbar } from "@mui/material";
// import { Close as MuiCloseIcon } from '@mui/icons-material';
// import SvgIcon from '@mui/material/SvgIcon';
// import { NHFlex, NHAlert } from 'fx-ui';

import type { MouseEventHandler, SyntheticEvent } from "react";
// import type { NHAlertPropsType } from 'fx-ui';

export type NHAlertPropsType = {
  testId?: string;
  actionText?: string;
  actionCallback?: MouseEventHandler;
} & AlertProps;
export type AlertSeverityType = AlertProps["severity"];

export type NHSnackbarPropsType = {
  title?: string;
  message?: string | JSX.Element;
  actionText?: string;
  onActionClick?: MouseEventHandler;
  dismissAfterAction?: boolean;
  severity?: NHAlertPropsType["severity"];
  variant?: "outlined" | "filled" | "standard";
  open: boolean;
  onClose: (
    event: SyntheticEvent<unknown>,
    reason?: SnackbarCloseReason
  ) => void;
  testId?: string;
} & MuiSnackbarProps;

export default function NHSnackbar({
  title,
  message,
  onActionClick,
  autoHideDuration = 6000,
  severity = "success",
  variant = "filled",
  open = false,
  onClose,
  testId = "snackbar-alert",
  ...props
}: NHSnackbarPropsType) {
  // const actionButton = (
  //   <Box height={40} alignItems="center" >
  //     <IconButton size="large" >
  //       {actionIcon}
  //     </IconButton>
  //   </Box>
  // );

  return (
    <Snackbar
      {...props}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      data-testid={testId}
    >
      <div>
        <Alert
          onClose={onClose}
          sx={{ minWidth: 300 }}
          title={title}
          elevation={6}
          severity={severity}
          variant={variant}
          // action={actionButton}
          // actionIcon={
          //   <NHFlex color="white">
          //     <SvgIcon sx={{ fontSize: 40 }}>
          //       <MuiCloseIcon sx={{ fontSize: 40 }} />
          //     </SvgIcon>
          //   </NHFlex>
          // }
        >
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}
