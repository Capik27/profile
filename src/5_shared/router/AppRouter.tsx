import { Routes, Route, Navigate } from "react-router-dom";
import {
	MAIN_ROUTE,
	CREATE_ROUTE,
	CONTACTS_ROUTE,
	EDIT_ROUTE,
	ERROR_ROUTE,
	ABOUT_ROUTE,
	POST_ROUTE,
} from "./paths";

import CreatePage from "2_pages/CreatePage";
import EditPage from "2_pages/EditPage";
import AboutPage from "2_pages/AboutPage";
import ContactsPage from "2_pages/ContactsPage";
import MainPage from "2_pages/MainPage";
import PostPage from "2_pages/PostPage";
import NotFound from "4_features/NotFound/NotFound";
import useAdmin from "5_shared/hooks/useAdmin";

const AppRouter: React.FC = () => {
	const isAdmin = useAdmin();
	return (
		<Routes>
			<Route index element={<MainPage />} />
			<Route path={`${POST_ROUTE}/:id`} element={<PostPage />} />
			<Route path={ABOUT_ROUTE} element={<AboutPage />} />
			<Route path={CONTACTS_ROUTE} element={<ContactsPage />} />
			{isAdmin && (
				<>
					<Route path={CREATE_ROUTE} element={<CreatePage />} />
					<Route path={`${EDIT_ROUTE}/:id`} element={<EditPage />} />
				</>
			)}

			<Route path={ERROR_ROUTE} element={<NotFound />} />
			<Route path={"*"} element={<Navigate to={MAIN_ROUTE} />} />
		</Routes>
	);
};

export default AppRouter;
