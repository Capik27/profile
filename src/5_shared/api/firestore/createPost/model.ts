import { descriptionT, titleT, Post, PreviewArray } from "5_shared/models";

export type createPostFn = (
	title: titleT,
	description: descriptionT,
	previews: PreviewArray
) => Promise<Post>;
