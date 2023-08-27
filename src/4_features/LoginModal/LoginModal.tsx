import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { setAdminMode } from "5_shared/store/adminSlice";
import { ADMIN_KEY, Props } from "./model";
import { useDispatch } from "react-redux";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import TextInput from "4_features/TextInput";
import {
	Alert,
	FormControl,
	IconButton,
	Input,
	FormHelperText,
	InputLabel,
	InputAdornment,
	Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginModal: React.FC<Props> = ({ show, onClose }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};

	const handleChangePass = (e: SyntheticEvent) => {
		setPassword((e.target as HTMLInputElement).value);
	};

	const handleClose = () => {
		setPassword("");
		setShowPassword(false);
		handleAlertClose();
		onClose && onClose();
	};

	const handleAlertClose = () => {
		setAlert(false);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setLoading(true);
		const fakeDelay = setTimeout(() => {
			setLoading(false);
			if (password === ADMIN_KEY) {
				setAlert(true);
				setShowPassword(false);
				dispatch(setAdminMode(true));
				onClose && onClose();
			} else {
				setError(true);
				const timer = setTimeout(() => {
					setError(false);
					clearTimeout(timer);
				}, 3000);
			}
			setPassword("");

			clearTimeout(fakeDelay);
		}, 1000);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			document.body.style.paddingRight = "0px";
		}, 0);
		return () => clearTimeout(timer);
	}, [show]);

	return (
		<>
			<Dialog open={!!show} onClose={handleClose}>
				<form>
					<DialogTitle>Log In</DialogTitle>
					<DialogContent>
						<FormControl error={error} variant="standard">
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								id="password"
								aria-describedby="helper-text"
								autoComplete="off"
								autoFocus
								disabled={loading}
								value={password}
								onChange={handleChangePass}
								type={showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							<FormHelperText id="helper-text">
								{error ? `Incorrect key` : " "}
							</FormHelperText>
						</FormControl>
						{/* <TextInput
							label={"Password"}
							margin="dense"
							variant="standard"
							autoComplete="off"
							autoFocus
							fullWidth
							disabled={loading}
							error={error}
							helperText={error ? `Incorrect key` : " "}
							value={password}
							onChange={handleChangePass}
						/> */}
					</DialogContent>
					<DialogActions>
						<Button disabled={loading} onClick={handleClose}>
							Cancel
						</Button>
						<LoadingButton
							disabled={!password}
							loading={loading}
							type="submit"
							variant="outlined"
							onClick={handleSubmit}
						>
							Submit
						</LoadingButton>
					</DialogActions>
				</form>
			</Dialog>

			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			>
				<Alert
					onClose={handleAlertClose}
					severity="success"
					sx={{ backgroundColor: "greenligth", border: "1px solid #00000050" }}
				>
					You are logged in as administrator!
				</Alert>
			</Snackbar>
		</>
	);
};
