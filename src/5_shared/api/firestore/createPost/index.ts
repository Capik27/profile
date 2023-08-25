import createID from "5_shared/helpers/createID";
import { createPostFn } from "./model";
import { serverTimestamp } from "firebase/firestore";
import uploadPreview from "5_shared/api/storage/uploadPreview";
import {
	previewNameT,
	previewURLT,
	Image,
	TypedImage,
	Preview,
} from "5_shared/models";
import createImageID from "5_shared/helpers/createImageID";

const createPost: createPostFn = async (title, description, previews) => {
	const id = createID();
	const previewNames: previewNameT[] = [];

	const promises: Promise<previewURLT>[] = [];
	for (let i = 0, l = previews.length; i < l; i++) {
		previewNames.push(previews[i].name);
		const promise = new Promise<previewURLT>((resolve) => {
			if (!(previews[i] as Image).id) {
				const url: Promise<previewURLT> = uploadPreview(
					id,
					previews[i] as Preview
				);
				resolve(url);
			}
		});
		promises.push(promise);
	}

	const previewUrls: previewURLT[] = await Promise.all(promises);

	const images: Image[] = previewUrls.map((url, idx) => ({
		id: createImageID(previews[idx] as Preview),
		name: previews[idx]?.name,
		url,
	}));

	return {
		id,
		title,
		description,
		images,
		createdAt: serverTimestamp(),
	};
};

export default createPost;
