import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import {
	MAIN_ROUTE,
	ABOUT_ROUTE,
	CONTACTS_ROUTE,
	CREATE_ROUTE,
} from "5_shared/router/paths";
import useAdmin from "5_shared/hooks/useAdmin";
import { useDispatch } from "react-redux";
import { toggleAdminMode } from "5_shared/store/adminSlice";

export const NavBar: React.FC = () => {
	const dispatch = useDispatch();
	const isAdmin = useAdmin();

	const handleClick = () => {
		dispatch(toggleAdminMode());
	};

	return (
		<Box className={style.navbar}>
			<h2 className={style.title}>Konstantin Shikhov Page</h2>

			<Box className={style.links}>
				<Link to={MAIN_ROUTE}>
					<Button variant="outlined" color="primary">
						Home
					</Button>
				</Link>

				<Link to={ABOUT_ROUTE}>
					<Button variant="outlined">About</Button>
				</Link>
				<Link to={CONTACTS_ROUTE}>
					<Button variant="outlined">Contacts</Button>
				</Link>

				{isAdmin && (
					<Link to={CREATE_ROUTE}>
						<Button variant="contained" color="secondary">
							Create
						</Button>
					</Link>
				)}
				<Button variant="outlined" color="error" onClick={handleClick}>
					ADMIN
				</Button>
			</Box>
		</Box>
	);
};
