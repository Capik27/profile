import { getDocs, collection, DocumentData } from "firebase/firestore";
import { POSTS_PATH } from "../../consts";
import { downloadAllPostsFn } from "./model";
import { firestore } from "5_shared/api/config";

const downloadAllPosts: downloadAllPostsFn = async () => {
	const docCollection = collection(firestore, POSTS_PATH);
	const queryDocs = await getDocs(docCollection);
	const result: DocumentData[] = [];
	if (queryDocs.empty) return result;
	queryDocs.forEach(async (doc) => {
		const data = doc.data();
		result.push(data);
	});
	return result;
};

export default downloadAllPosts;
