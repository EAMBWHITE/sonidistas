import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch } from "react";
import { Typography } from "@mui/material";

type BasicDatePickerType = {
  title: string;
  value: Dayjs | null;
  setValue: Dispatch<React.SetStateAction<Dayjs | null>>;
};

export default function BasicDatePicker({
  title,
  value,
  setValue,
}: BasicDatePickerType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <Typography>
        Fecha */}
      <DatePicker
        label={title}
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      {/* </Typography> */}
    </LocalizationProvider>
  );
}
