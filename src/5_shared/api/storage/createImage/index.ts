import createImageID from "5_shared/helpers/createImageID";
import { createImageFn } from "./model";

const createImage: createImageFn = async (file, url) => {
	return {
		id: createImageID(file),
		name: file?.name,
		url,
	};
};

export default createImage;
