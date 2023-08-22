import "./App.module.css";
import SkattekortPage from "./pages/Skattekort.page";
import { useEffect } from "react";
import { initGrafanaFaro } from "./util/grafanaFaro";

const App = () => {
  useEffect(() => {
    initGrafanaFaro();
  }, []);

  return <SkattekortPage />;
};

export default App;
