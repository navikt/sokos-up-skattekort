import { useEffect } from "react";
import Sok from "./pages/Sok";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
	useEffect(() => {
		initGrafanaFaro();
	}, []);

	return <Sok />;
}
