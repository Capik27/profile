import { TextFieldProps } from "@mui/material";
import { SyntheticEvent } from "react";

type onChangeFn = { onChange: (e: SyntheticEvent) => void };

export type ControlledTextInputProps = TextFieldProps & onChangeFn;
