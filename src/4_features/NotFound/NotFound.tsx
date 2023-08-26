import { MAIN_ROUTE } from "5_shared/router/paths";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<Box
			sx={{
				display: "grid",
				justifyItems: "center",
				alignContent: "center",
				height: "90vh",
			}}
		>
			<Typography gutterBottom variant="h5" component="h1">
				Not Found
			</Typography>
			<Link to={MAIN_ROUTE}>
				<Button variant="contained" color="primary">
					Back to home
				</Button>
			</Link>
		</Box>
	);
};

export default NotFound;
