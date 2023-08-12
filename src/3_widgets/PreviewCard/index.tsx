import { Props } from "./model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

const PreviewCard: React.FC<Props> = ({ data }) => {
	return (
		<Card sx={{ maxWidth: 500 }}>
			<CardMedia
				component="img"
				height="200"
				image={data.previewUrls[0]}
				alt={data.previewNames[0]}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{data.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{data.description}
				</Typography>
			</CardContent>
			{true && (
				<CardActions>
					<Button size="small">Edit</Button>
					<Button size="small">Delete</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default PreviewCard;
