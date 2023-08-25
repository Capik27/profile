import { Image, DataURL } from "5_shared/models";

export type createImageFn = (file: File, url: DataURL) => Promise<Image>;
