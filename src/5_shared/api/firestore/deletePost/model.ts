import { FilesArray, uniqueID } from "5_shared/models";

export type deletePostFn = (id: uniqueID, images: FilesArray) => void;
