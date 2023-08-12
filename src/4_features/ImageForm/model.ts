import { PreviewArray, previewURLT } from "5_shared/models";

export type Props = {
	data?: ArrayBuffer[] | previewURLT[];
	returnImages?: (items: PreviewArray) => void;
};
