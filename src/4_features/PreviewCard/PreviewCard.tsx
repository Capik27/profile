import { Props } from "./model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import style from "./PreviewCard.module.scss";
import useAdmin from "5_shared/hooks/useAdmin";
import { Link } from "react-router-dom";
import { EDIT_ROUTE, POST_ROUTE } from "5_shared/router/paths";

export const PreviewCard: React.FC<Props> = ({ data }) => {
	const isAdmin = useAdmin();

	return (
		<>
			<Card>
				<CardMedia
					component="img"
					height="300"
					image={data.images[0].url}
					alt={data.images[0].name}
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						className={style.title}
					>
						{data.title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						className={style.onerow}
					>
						{data.description}
					</Typography>
				</CardContent>

				<CardActions>
					<Link to={`${POST_ROUTE}/${data.id}`}>
						<Button>More</Button>
					</Link>
					{isAdmin && (
						<Link to={`${EDIT_ROUTE}/${data.id}`}>
							<Button>Edit</Button>
						</Link>
					)}
				</CardActions>
			</Card>
		</>
	);
};
