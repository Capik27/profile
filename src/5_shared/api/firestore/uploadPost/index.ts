import { uploadPostFn } from "./model";
import { setDoc, doc, collection } from "firebase/firestore";
import { firestore } from "5_shared/api/config";
import createPost from "../createPost";
import { POSTS_PATH } from "../consts";

const uploadPost: uploadPostFn = async (title, description, previews) => {
	const post = await createPost(title, description, previews);
	const id = post.id;

	const docRef = doc(collection(firestore, POSTS_PATH), id);
	return setDoc(docRef, post, { merge: true });
};

export default uploadPost;
