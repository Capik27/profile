import "./styles/index.scss";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Layout from "5_shared/ui/Layout";
import AppRouter from "5_shared/router/AppRouter";
import NavBar from "3_widgets/NavBar";

function App() {
  return (
    <Layout>
      <NavBar />
      <main id="content">
        <AppRouter />
      </main>
    </Layout>
  );
}

export default App;
