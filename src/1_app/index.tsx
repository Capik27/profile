import "./styles/index.scss";
import Layout from "5_shared/ui/Layout";
import CreatePage from "2_pages/CreatePage";
import EditPage from "2_pages/EditPage";

function App() {
	return (
		<Layout>
			<CreatePage />
			<EditPage />
		</Layout>
	);
}

export default App;
