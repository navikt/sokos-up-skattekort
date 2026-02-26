import { useEffect } from "react";
import Form from "./pages/skattekort/Sok";
import TemplatePage from "./pages/TemplatePage";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
	useEffect(() => {
		initGrafanaFaro();
	}, []);

	return <Form />;
}
