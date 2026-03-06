import { useEffect } from "react";
import Hovedside from "./pages/Hovedside";
import { initGrafanaFaro } from "./util/grafanaFaro";

export default function App() {
	useEffect(() => {
		initGrafanaFaro();
	}, []);

	return <Hovedside />;
}
