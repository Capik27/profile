import "./styles/index.scss";
import Layout from "5_shared/ui/Layout";
import AppRouter from "5_shared/router/AppRouter";
import NavBar from "3_widgets/NavBar";

function App() {
	return (
		<Layout>
			<NavBar />
			<AppRouter />
		</Layout>
	);
}

export default App;
