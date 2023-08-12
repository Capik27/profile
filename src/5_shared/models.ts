import { FieldValue } from "firebase/firestore";

export type uniqueID = string;

export type titleT = string;
export type descriptionT = string;
export type previewURLT = string;
export type previewNameT = string;
export type createdAtT = FieldValue;

export type pathT = string;

//////////////////////////////////////////////

export type Preview = File;
export type PreviewArray = Preview[];

export interface Post {
	id: uniqueID;
	title: titleT;
	description: descriptionT;
	previewUrls: previewURLT[];
	previewNames: previewNameT[];
	createdAt: createdAtT;
}
