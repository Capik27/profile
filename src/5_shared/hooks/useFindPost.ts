import { useSelector } from "react-redux";
import { RootState } from "5_shared/store";
import { DocumentData } from "firebase/firestore";

const useFindPost = (id: string) => {
	const posts = useSelector((state: RootState) => state.data.posts);
	let post: DocumentData | undefined;
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].id === id) {
			post = posts[i];
			break;
		}
	}
	return post;
};

export default useFindPost;
