import { useSelector } from "react-redux";
import { RootState } from "5_shared/store";

const useUpdatePosts = () => {
	const update = useSelector((state: RootState) => state.data.update);
	console.log("hook update", update);
	return update;
};

export default useUpdatePosts;
