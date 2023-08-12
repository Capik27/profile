import { descriptionT, titleT, PreviewArray } from "5_shared/models";

export type uploadPostFn = (
	title: titleT,
	description: descriptionT,
	previews: PreviewArray
) => void;
