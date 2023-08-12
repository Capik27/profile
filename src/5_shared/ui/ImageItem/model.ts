import { previewURLT } from "5_shared/models";
import { SyntheticEvent } from "react";

export type Props = {
	data: previewURLT | ArrayBuffer;
	onClose?: (e: SyntheticEvent, item: previewURLT | ArrayBuffer) => void;
};
