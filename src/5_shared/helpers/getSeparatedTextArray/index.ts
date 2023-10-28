import { getSeparatedTextArrayFn } from "./model";

const getSeparatedTextArray: getSeparatedTextArrayFn = (text) => {
	return text.split(';').map(s=>s.trim())
};

export default getSeparatedTextArray;
