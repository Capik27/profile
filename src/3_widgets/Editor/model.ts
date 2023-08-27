import { Post } from "5_shared/models";
import { DocumentData } from "firebase/firestore";

export type Props = {
	data?: Post | DocumentData;
};

export const CONFIRM_DELAY = 5;
