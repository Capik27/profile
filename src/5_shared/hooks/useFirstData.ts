import downloadAllPosts from "5_shared/api/firestore/download/allPosts";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";

const useFirstData = () => {
	const [data, setData] = useState<DocumentData[] | undefined>(undefined);

	useEffect(() => {
		downloadAllPosts().then((result) => {
			if (result) {
				console.log("response DATA", result);
				setData(result);
			}
		});
	}, []);

	return data;
};

export default useFirstData;
