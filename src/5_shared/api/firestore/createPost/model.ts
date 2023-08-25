import { descriptionT, titleT, Post, FilesArray } from "5_shared/models";

export type createPostFn = (
	title: titleT,
	description: descriptionT,
	previews: FilesArray
) => Promise<Post>;
