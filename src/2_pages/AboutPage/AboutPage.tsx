import Editor from "3_widgets/Editor";
// import NotFound from "4_features/NotFound/NotFound";
import useFindPost from "5_shared/hooks/useFindPost";
import { ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";
import style from "./AboutPage.module.scss";

export const AboutPage: React.FC = () => {
	return (
		<>
			<div>About</div>
		</>
	);
};
