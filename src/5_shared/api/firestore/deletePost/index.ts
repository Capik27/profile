import { deletePostFn } from "./model";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "5_shared/api/config";
import deletePreview from "5_shared/api/storage/deletePreview";
import { POSTS_PATH } from "../consts";

const deletePost: deletePostFn = async (id, images) => {
	images.forEach((image) => {
		deletePreview(id, image.name);
	});
	await deleteDoc(doc(firestore, POSTS_PATH, id));
};

export default deletePost;
