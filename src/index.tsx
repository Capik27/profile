import ReactDOM from "react-dom/client";
import App from "1_app";
import reportWebVitals from "./reportWebVitals";
import {
  //BrowserRouter,
  HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "5_shared/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </>
);

reportWebVitals();
