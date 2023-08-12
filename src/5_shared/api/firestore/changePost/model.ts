import {
	descriptionT,
	titleT,
	Post,
	previewURLT,
	PreviewArray,
} from "5_shared/models";

export type changePostFn = (
	post: Post,
	title: titleT,
	description: descriptionT,
	previews: PreviewArray | previewURLT[]
) => void;
