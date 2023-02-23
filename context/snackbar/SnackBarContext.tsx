import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
  SyntheticEvent,
  MouseEventHandler,
} from "react";
import {
  SnackbarCloseReason,
  Snackbar,
  AlertProps,
  SnackbarProps as MuiSnackbarProps,
  Alert,
} from "@mui/material";
import NHSnackbar from "./NHSnackbar";

export type AlertMessageType = string | JSX.Element;

export type NHAlertPropsType = {
  testId?: string;
  actionText?: string;
  actionCallback?: MouseEventHandler;
} & AlertProps;
export type AlertSeverityType = AlertProps["severity"];

export type NotifyOptionsType = {
  title?: string;
  actionText?: string;
  actionCallback?: () => void;
  dismissAfterAction?: boolean;
  disableAutoHide?: boolean;
};

export type SnackbarContextType = {
  notifySuccess: (
    message: AlertMessageType,
    options?: NotifyOptionsType
  ) => void;
  notifyInfo: (message: AlertMessageType, options?: NotifyOptionsType) => void;
  notifyWarning: (
    message: AlertMessageType,
    options?: NotifyOptionsType
  ) => void;
  notifyError: (message: AlertMessageType, options?: NotifyOptionsType) => void;
};

/* eslint-disable no-console */
const defaultSnackbarContext: SnackbarContextType = {
  notifySuccess: (message) => console.log(`Alert [Success]: ${message}`),
  notifyInfo: (message) => console.log(`Alert [Info]: ${message}`),
  notifyWarning: (message) => console.warn(`Alert [Warning]: ${message}`),
  notifyError: (message) => console.error(`Alert [Error]: ${message}`),
};
/* eslint-enable no-console */

export const SnackbarContext = createContext<SnackbarContextType>(
  defaultSnackbarContext
);

type MessageType = NotifyOptionsType & {
  message: AlertMessageType;
  severity: AlertSeverityType;
  key?: number;
};

export type SnackbarProviderPropsType = {
  children: ReactElement;
} & MuiSnackbarProps;

/**
 * Simple wrapper around Snackbar with basic state management baked in. Typically, this context
 * provider should wrap an entire page and components/hooks in that page will call `useSnackbar`
 * to show various alerts.
 *
 * Since an alert can remain on the screen for a while, it's possible that another alert will be
 * queued up with one still on the screen. In that scenario, the current alert will be dismissed
 * and the new one will animate in. There will only be 1 alert shown at any time.
 */
export function SnackbarContextProvider({
  children,
  ...snackbarProps
}: SnackbarProviderPropsType) {
  const [messageQueue, setMessageQueue] = useState<MessageType[]>([]);
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<MessageType | undefined>(
    undefined
  );

  useEffect(() => {
    if (messageQueue.length && !currentMessage) {
      // Set a new snack when we don't have an active one
      setCurrentMessage({ ...messageQueue[0] });
      setMessageQueue((prev) => prev.slice(1));
      setOpen(true);
    } else if (messageQueue.length && currentMessage && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [messageQueue, currentMessage, open]);

  const handleClose = (
    event: Event | SyntheticEvent<unknown, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentMessage(undefined);
  };

  const snackbarContext = useMemo<SnackbarContextType>(() => {
    const appendMessage = (
      message: AlertMessageType,
      severity: AlertSeverityType,
      options: NotifyOptionsType | undefined
    ) => {
      setMessageQueue((prevMessages) => {
        const key = new Date().getTime();
        const newMessage = {
          ...options,
          message,
          severity,
          key,
        };
        return [...prevMessages, newMessage];
      });
    };

    return {
      notifySuccess: (message, options) => {
        appendMessage(message, "success", options);
      },
      notifyInfo: (message, options) => {
        appendMessage(message, "info", options);
      },
      notifyWarning: (message, options) => {
        appendMessage(message, "warning", options);
      },
      notifyError: (message, options) => {
        appendMessage(message, "error", options);
      },
    };
  }, []);

  return (
    <SnackbarContext.Provider value={snackbarContext}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionProps={{
          onExited: handleExited,
        }}
      >
        <div>
          <Alert
            // {...snackbarProps}
            onClose={handleClose}
            sx={{ minWidth: 300 }}
            // title={title}
            elevation={6}
            // severity={severity}
            // variant={variant}
          >
            {/* {message} */}
          </Alert>
        </div>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
