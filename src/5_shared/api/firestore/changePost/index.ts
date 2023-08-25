import { changePostFn } from "./model";
import { setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "5_shared/api/config";
import { POSTS_PATH } from "../consts";
import deletePreview from "5_shared/api/storage/deletePreview";
import uploadPreview from "5_shared/api/storage/uploadPreview";
import {
	previewNameT,
	previewURLT,
	Image,
	Preview,
	uniqueID,
} from "5_shared/models";
import createImageID from "5_shared/helpers/createImageID";

const changePost: changePostFn = async (
	post,
	title,
	description,
	changedData
) => {
	let previewNames: previewNameT[] = [];
	const id = post.id;
	const delItemsNames = changedData.delete;
	const orderedFiles = changedData.orderedFiles;

	if (delItemsNames.length) {
		delItemsNames.forEach((itemName) => {
			deletePreview(id, itemName);
		});
	}

	const promises: Promise<previewURLT>[] = [];
	for (let i = 0, l = orderedFiles.length; i < l; i++) {
		previewNames.push(orderedFiles[i].name);
		const promise = new Promise<previewURLT>((resolve) => {
			let url: Promise<previewURLT>;
			if (orderedFiles[i] instanceof File) {
				url = uploadPreview(id, orderedFiles[i] as Preview);
			} else {
				url = new Promise<previewURLT>((resolve) => {
					resolve((orderedFiles[i] as Image).url as previewURLT);
				});
			}

			resolve(url);
		});
		promises.push(promise);
	}

	const previewUrls: previewURLT[] = await Promise.all(promises);

	const images: Image[] = previewUrls.map((url, idx) => {
		let imgID: uniqueID;
		if (orderedFiles[idx] instanceof File) {
			imgID = createImageID(orderedFiles[idx] as Preview);
		} else {
			imgID = (orderedFiles[idx] as Image).id;
		}

		return {
			id: imgID,
			name: orderedFiles[idx].name,
			url,
		};
	});

	// const [oldLength, newLength] = [post.images.length, previews.length];
	// if (typeof previews[0] != "string") {
	// 	const names: string[] | File[] = post.previewNames;
	// 	names.forEach(async (itemName, index) => {
	// 		deletePreview(id, itemName);
	// 		const url = await uploadPreview(id, previews[index] as File);
	// 		previewUrls.push(url);
	// 		previewNames.push((previews[index] as File).name);
	// 	});

	// 	// deletePreview(id, previewName);
	// 	// previewURL = await uploadPreview(id, preview);
	// 	// previewName = preview.name;
	// }

	const changedPost = {
		...post,
		title,
		description,
		images,
		changedAt: serverTimestamp(),
	};

	const docRef = doc(collection(firestore, POSTS_PATH), id);
	return setDoc(docRef, changedPost, { merge: true });
};

export default changePost;
