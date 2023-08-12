import { uniqueID } from "5_shared/models";
import { DocumentData } from "firebase/firestore";

export type downloadPostFn = (id: uniqueID) => Promise<DocumentData | null>;
