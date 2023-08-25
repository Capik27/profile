import { storage } from "5_shared/api/config";
import { deletePreviewFn } from "./model";
import { ref, deleteObject } from "firebase/storage";

const deletePreview: deletePreviewFn = async (id, imageName) => {
	const path = `${id}/${imageName}`;
	const previewRef = ref(storage, path);
	await deleteObject(previewRef);
};

export default deletePreview;
