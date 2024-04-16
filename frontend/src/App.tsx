import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import VendorCreate from "./pages/VendorCreate";
import Vendors from "./pages/Vendors";
import Vendor from "./pages/Vendor";
import { VendorProvider } from "./contexts/VendorContext";
import VendorUpdate from "./pages/VendorUpdate";
import { UserProvider } from "./contexts/UserContext";
import UserCreate from "./pages/UserCreate";
import UserUpdate from "./pages/UserUpdate";

function App() {
	return (
		<UserProvider>
			<VendorProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Home />} path="/" />
						//Vendors
						<Route element={<Vendors />} path="/vendor" />
						<Route element={<VendorCreate />} path="/vendor/create" />
						<Route element={<Vendor />} path="/vendor/:id" />
						<Route element={<VendorUpdate />} path="/vendor/:id/update" />
						//Users
						<Route element={<User />} path="/user/:id" />
						<Route element={<UserCreate />} path="/user/create" />
						<Route element={<UserUpdate />} path="/user/:id/update" />
					</Routes>
				</BrowserRouter>
			</VendorProvider>
		</UserProvider>
	);
}

export default App;
