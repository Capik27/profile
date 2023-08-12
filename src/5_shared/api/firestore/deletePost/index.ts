import { deletePostFn } from "./model";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "5_shared/api/config";
import deletePreview from "5_shared/api/storage/deletePreview";
import { POSTS_PATH } from "../consts";

const deletePost: deletePostFn = async ({ id, previewNames }) => {
	previewNames.forEach((itemName) => {
		deletePreview(id, itemName);
	});
	await deleteDoc(doc(firestore, POSTS_PATH, id));
};

export default deletePost;
