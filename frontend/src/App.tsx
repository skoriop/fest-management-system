import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VendorCreate from "./pages/VendorCreate";
import Vendors from "./pages/Vendors";
import Vendor from "./pages/Vendor";
import { VendorProvider } from "./contexts/VendorContext";
import VendorUpdate from "./pages/VendorUpdate";

function App() {
	return (
		<VendorProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Home />} path="/" />
					//Vendors
					<Route element={<Vendors />} path="/vendor" />
					<Route element={<VendorCreate />} path="/vendor/create" />
					<Route element={<Vendor />} path="/vendor/:id" />
					<Route element={<VendorUpdate />} path="/vendor/:id/update" />
				</Routes>
			</BrowserRouter>
		</VendorProvider>
	);
}

export default App;
