import { useSelector } from "react-redux";
import { RootState } from "5_shared/store";

const useUpdatePosts = () => {
	return useSelector((state: RootState) => state.data.update);
};

export default useUpdatePosts;
