import { Image, FilesArray } from "5_shared/models";

export type Props = {
	data?: Image[];
	returnImages?: (items: FilesArray) => void;
};
