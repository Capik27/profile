import { Image } from "5_shared/models";
import { SyntheticEvent } from "react";

type dragFn = (e: DragEvent) => void;

export interface Props extends React.HTMLProps<HTMLDivElement> {
	image: Image;
	onClose?: (e: SyntheticEvent, item: Image) => void;
	// onDragStart?: dragFn;
	// onDragLeave?: dragFn;
	// onDragOver?: dragFn;
	// onDragEnd?: dragFn;
	// onDrop?: dragFn;
	// draggable?: boolean;
}

//extends React.HTMLProps<HTMLElement>
