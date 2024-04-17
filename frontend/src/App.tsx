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
import Item from "./pages/Item";
import ItemCreate from "./pages/ItemCreate";
import { ItemProvider } from "./contexts/ItemContext";
import ItemUpdate from "./pages/ItemUpdate";
import Items from "./pages/Items";
import UserOrders from "./pages/UserOrders";
import OrderCreate from "./pages/OrderCreate";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<VendorProvider>
					<ItemProvider>
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
					</ItemProvider>
				</VendorProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
