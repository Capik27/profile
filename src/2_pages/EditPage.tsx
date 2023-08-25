import Editor from "3_widgets/Editor";
import downloadPost from "5_shared/api/firestore/download/post";
import useFirstData from "5_shared/hooks/useFirstData";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

const EditPage: React.FC = () => {
	const data = useFirstData();

	const ff = data?.length ? data[0] : undefined;
	console.log("createPage ", data);
	// const [data, setData] = useState<DocumentData | undefined>(undefined);
	//1691856192860
	// useEffect(() => {
	// 	downloadPost("1691856192860").then((result) => {
	// 		if (result) {
	// 			console.log("response", result);
	// 			setData(result);
	// 		}
	// 	});
	// }, []);

	return <>{ff && <Editor data={ff} />}</>;
};

export default EditPage;
