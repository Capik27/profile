import Editor from "3_widgets/Editor";
// import NotFound from "4_features/NotFound/NotFound";
import useFindPost from "5_shared/hooks/useFindPost";
import { ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";

const EditPage: React.FC = () => {
	const { id } = useParams();
	const post = useFindPost(id ?? "");

	if (!post) return <Navigate to={ERROR_ROUTE} replace={true} />;

	return (
		<>
			<Editor data={post} />
		</>
	);
};

export default EditPage;
