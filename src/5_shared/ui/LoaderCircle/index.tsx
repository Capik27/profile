import { CircularProgress, Box } from "@mui/material";

const LoaderCircle: React.FC = () => {
	return (
		<Box
			sx={{
				display: "flex",
				height: 400,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress color="primary" size={75} />
		</Box>
	);
};

export default LoaderCircle;
