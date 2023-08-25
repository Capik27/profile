import { uniqueID } from "5_shared/models";

export type createImageIDFn = (file: File) => uniqueID;
