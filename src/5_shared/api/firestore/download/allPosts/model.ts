import { DocumentData } from "firebase/firestore";

export type downloadAllPostsFn = () => Promise<DocumentData[]>;
