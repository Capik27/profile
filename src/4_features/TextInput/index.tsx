import { ControlledTextInputProps } from "./model";
import { TextField } from "@mui/material";
import { SyntheticEvent, useState, useEffect } from "react";

const TextInput: React.FC<ControlledTextInputProps> = (props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
    !!props.onChange && props.onChange(e);
  };

  useEffect(() => {
    setValue(props.value as string);
    // console.log(props.label, " // value - ", value);
  }, [props.value]);

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default TextInput;
