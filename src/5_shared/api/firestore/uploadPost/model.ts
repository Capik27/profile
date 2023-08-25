import { descriptionT, titleT, FilesArray } from "5_shared/models";

export type uploadPostFn = (
	title: titleT,
	description: descriptionT,
	previews: FilesArray
) => void;
