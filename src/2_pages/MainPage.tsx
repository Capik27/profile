import CardList from "4_features/CardList";
import downloadAllPosts from "5_shared/api/firestore/download/allPosts";
import useGetPosts from "5_shared/hooks/useGetPosts";
import useUpdatePosts from "5_shared/hooks/useUpdatePosts";
import { setDataPosts, setUpdate } from "5_shared/store/postsSlice";
import { Box } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MainPage: React.FC = () => {
	const dispatch = useDispatch();
	const update = useUpdatePosts();
	const storePosts = useGetPosts();
	const [data, setData] = useState<DocumentData[]>(update ? [] : storePosts);

	const fetchPosts = () => {
		downloadAllPosts().then((result) => {
			if (result) {
				setData(result);
				dispatch(setUpdate(false));
				dispatch(setDataPosts(result));
			}
		});
	};

	useEffect(() => {
		if (update) {
			fetchPosts();
		}
	}, [update]);

	if (!data.length) return <Box>Loading...</Box>;

	console.log("MAIN RERENDER");

	return (
		<>
			<CardList data={data} />
		</>
	);
};

export default MainPage;
