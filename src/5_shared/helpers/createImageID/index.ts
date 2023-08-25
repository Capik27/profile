import { createImageIDFn } from "./model";

const createImageID: createImageIDFn = (file) => {
	return (new Date().getTime() + file.lastModified).toString() + file.size;
};

export default createImageID;
