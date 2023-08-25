import { storage } from "5_shared/api/config";
import { uploadPreviewFn } from "./model";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadPreview: uploadPreviewFn = async (id, preview) => {
	const path = `${id}/${preview.name}`;
	const storageRef = ref(storage, path);

	const res = await uploadBytes(storageRef, preview);
	console.log("uploadBytes", res);
	return await getDownloadURL(storageRef);
};

export default uploadPreview;
