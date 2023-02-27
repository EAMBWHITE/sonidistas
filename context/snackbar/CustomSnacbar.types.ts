import { MouseEventHandler } from "react";
import { AlertProps } from "@mui/material";

export type NHAlertPropsType = {
  testId?: string;
  actionText?: string;
  actionCallback?: MouseEventHandler;
} & AlertProps;
export type AlertSeverityType = AlertProps["severity"];
