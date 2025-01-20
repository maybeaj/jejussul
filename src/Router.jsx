import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/index";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;