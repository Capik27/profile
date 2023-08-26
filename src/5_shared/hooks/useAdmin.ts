import { useSelector } from "react-redux";
import { RootState } from "5_shared/store";

const useAdmin = () => {
	return useSelector((state: RootState) => state.admin.isAdmin);
};

export default useAdmin;
