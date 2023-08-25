import { uniqueID, previewNameT } from "5_shared/models";

export type deletePreviewFn = (id: uniqueID, imageName: previewNameT) => void;
