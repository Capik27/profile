import {
	descriptionT,
	titleT,
	Post,
	FilesArray,
	previewNameT,
} from "5_shared/models";
import { DocumentData } from "firebase/firestore";

export type changedData = {
	orderedFiles: FilesArray;
	delete: previewNameT[];
};

export type changePostFn = (
	post: Post | DocumentData,
	title: titleT,
	description: descriptionT,
	previews: changedData
) => void;
