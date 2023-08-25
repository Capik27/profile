import { Props } from "./model";
import { Paper } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import style from "./ImageItem.module.scss";

export const ImageItem: React.FC<Props> = ({ image, onClose }) => {
	const changable = !!onClose;

	return (
		<Paper className={style.item}>
			<img src={image?.url as string} alt={image?.name} />
			{changable && (
				<button className={style.closeBtn} onClick={(e) => onClose(e, image)}>
					<HighlightOffIcon />
				</button>
			)}
		</Paper>
	);
};
