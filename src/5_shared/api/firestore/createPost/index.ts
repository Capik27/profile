import createID from "5_shared/helpers/createID";
import { createPostFn } from "./model";
import { serverTimestamp } from "firebase/firestore";
import uploadPreview from "5_shared/api/storage/uploadPreview";
import { previewNameT, previewURLT } from "5_shared/models";

const createPost: createPostFn = async (title, description, previews) => {
	const id = createID();
	let previewUrls: previewURLT[] = [];
	const previewNames: previewNameT[] = [];

	console.log("previews", previews);

	const promises: Promise<previewURLT>[] = [];
	for (let i = 0, l = previews.length; i < l; i++) {
		previewNames.push(previews[i].name);
		const promise = new Promise<previewURLT>((resolve) => {
			const url: Promise<previewURLT> = uploadPreview(id, previews[i]);
			resolve(url);
		});
		promises.push(promise);
	}

	Promise.all(promises).then((result) => {
		previewUrls = result;
	});

	// previews.forEach(async (item) => {
	// 	const url = await uploadPreview(id, item);
	// 	previewUrls.push(url);
	// 	previewNames.push(item.name);
	// });

	return {
		id,
		title,
		description,
		previewUrls,
		previewNames,
		createdAt: serverTimestamp(),
	};
};

export default createPost;
