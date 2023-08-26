import PreviewCard from "4_features/PreviewCard";
import { DocumentData } from "firebase/firestore";
import { Box } from "@mui/material";
import { Props } from "./model";
import style from "./CardList.module.scss";

export const CardList: React.FC<Props> = ({ data }) => {
	return (
		<Box className={style.list}>
			{data?.map((post: DocumentData) => (
				<PreviewCard data={post} key={post.id} />
			))}
		</Box>
	);
};
