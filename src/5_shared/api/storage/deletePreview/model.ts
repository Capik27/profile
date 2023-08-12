import { uniqueID, previewNameT } from "5_shared/models";

export type deletePreviewFn = (id: uniqueID, previewName: previewNameT) => void;
