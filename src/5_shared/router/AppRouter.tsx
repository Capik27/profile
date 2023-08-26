import { Routes, Route } from "react-router-dom";
import { MAIN_ROUTE, CREATE_ROUTE, EDIT_ROUTE, ERROR_ROUTE } from "./paths";

import CreatePage from "2_pages/CreatePage";
import EditPage from "2_pages/EditPage";
import MainPage from "2_pages/MainPage";
import NotFound from "4_features/NotFound/NotFound";

const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path={"*"} element={<MainPage />} />
			<Route path={CREATE_ROUTE} element={<CreatePage />} />
			<Route path={`${EDIT_ROUTE}/:id`} element={<EditPage />} />
			<Route path={ERROR_ROUTE} element={<NotFound />} />
			{/* <Route
				path={"*"}
				element={<Navigate to={ERROR_ROUTE} replace={true} />}
			/> */}
		</Routes>
	);
};

export default AppRouter;
