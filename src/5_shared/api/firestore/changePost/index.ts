import { changePostFn } from "./model";
import { setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "5_shared/api/config";
import { POSTS_PATH } from "../consts";
import deletePreview from "5_shared/api/storage/deletePreview";
import uploadPreview from "5_shared/api/storage/uploadPreview";
import { previewNameT, previewURLT } from "5_shared/models";

const changePost: changePostFn = async (post, title, description, previews) => {
	let previewUrls: previewURLT[] = [];
	let previewNames: previewNameT[] = [];
	const id = post.id;

	if (typeof previews[0] != "string") {
		const names: string[] | File[] = post.previewNames;
		names.forEach(async (itemName, index) => {
			deletePreview(id, itemName);
			const url = await uploadPreview(id, previews[index] as File);
			previewUrls.push(url);
			previewNames.push((previews[index] as File).name);
		});

		// deletePreview(id, previewName);
		// previewURL = await uploadPreview(id, preview);
		// previewName = preview.name;
	}

	const changedPost = {
		...post,
		title,
		description,
		previewUrls,
		previewNames,
		changedAt: serverTimestamp(),
	};

	const docRef = doc(collection(firestore, POSTS_PATH), id);
	return setDoc(docRef, changedPost, { merge: true });
};

export default changePost;
