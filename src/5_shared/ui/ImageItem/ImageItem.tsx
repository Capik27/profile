import { Props } from "./model";
import { Paper } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import style from "./ImageItem.module.scss";

export const ImageItem: React.FC<Props> = ({ data, onClose }) => {
	const changable = !!onClose;

	return (
		<Paper className={style.item}>
			<img src={data as string} alt={data as string} />
			{changable && (
				<button className={style.closeBtn} onClick={(e) => onClose(e, data)}>
					<HighlightOffIcon />
				</button>
			)}
		</Paper>
	);
};
