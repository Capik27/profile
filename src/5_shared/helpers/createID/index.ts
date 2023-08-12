import { createIDFn } from "./model";

const createID: createIDFn = () => {
	return new Date().getTime().toString();
};

export default createID;
