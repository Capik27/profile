import useFindPost from "5_shared/hooks/useFindPost";
import { ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";
import style from "./PostPage.module.scss";

export const PostPage: React.FC = () => {
	const { id } = useParams();
	const post = useFindPost(id ?? "");

	if (!post) return <Navigate to={ERROR_ROUTE} replace={true} />;

	return (
		<>
			<img src={post.images[0].url} />
			<div>{post.title}</div>
			<div>{post.description}</div>
		</>
	);
};
