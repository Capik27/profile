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
export type DataURL = previewURLT | ArrayBuffer;
export type FilesArray = (Preview | Image)[];

export type TypedFile = File & { id: uniqueID };
export type TypedImage = Image & { id: uniqueID };
export type ExportedFilesArray = (TypedFile | TypedImage)[];

export interface Post {
	id: uniqueID;
	title: titleT;
	description: descriptionT;
	images: Image[];
	createdAt: createdAtT;
}

export interface Image {
	id: uniqueID;
	name: previewNameT;
	url: DataURL;
}
