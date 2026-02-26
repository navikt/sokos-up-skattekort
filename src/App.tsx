import { useEffect } from "react";
import TemplatePage from "./pages/TemplatePage";
import { initGrafanaFaro } from "./util/grafanaFaro";
import Form from "./pages/skattekort/Form";

export default function App() {
	useEffect(() => {
		initGrafanaFaro();
	}, []);

	return <Form />;
}
