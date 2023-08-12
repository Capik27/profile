import { ControlledTextInputProps } from "./model";
import { TextField } from "@mui/material";
import { SyntheticEvent, useState, useEffect } from "react";

const TextInput: React.FC<ControlledTextInputProps> = (props) => {
	const [value, setValue] = useState(props.value || "");

	const handleChange = (e: SyntheticEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setValue(value);
	};

	useEffect(() => {
		console.log(props.label, " // value - ", value);
	});

	return <TextField {...props} value={value} onChange={handleChange} />;
};

export default TextInput;
