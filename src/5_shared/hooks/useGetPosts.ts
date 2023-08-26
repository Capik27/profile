import { useSelector } from "react-redux";
import { RootState } from "5_shared/store";

const useGetPosts = () => {
	return useSelector((state: RootState) => state.data.posts);
};

export default useGetPosts;
