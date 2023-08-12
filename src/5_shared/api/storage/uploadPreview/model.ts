import { Preview, previewURLT, uniqueID } from "5_shared/models";

export type uploadPreviewFn = (
	id: uniqueID,
	preview: Preview
) => Promise<previewURLT>;
