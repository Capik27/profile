import { getDoc, doc } from "firebase/firestore";
import { POSTS_PATH } from "../../consts";
import { downloadPostFn } from "./model";
import { firestore } from "5_shared/api/config";

const downloadPost: downloadPostFn = async (id) => {
	const docRef = doc(firestore, POSTS_PATH, id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

export default downloadPost;
