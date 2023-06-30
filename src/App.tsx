import "./App.module.css";
import Skattekortvisning from "./pages/Skattekortvisning";
import skattekortData from "../mock/skattekortMedTilleggsopplysning.json";

const App = ({ gjelderId }: { gjelderId?: string }) => {
  return <> {skattekortData && <Skattekortvisning data={skattekortData} />}</>;
};

export default App;
