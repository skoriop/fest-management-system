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
import Users from "./pages/Users";
import Clubs from "./pages/Clubs";
import ClubCreate from "./pages/ClubCreate";
import { ClubProvider } from "./contexts/ClubContext";
import { MemberProvider } from "./contexts/MemberContext";
import Club from "./pages/Club";
import ClubUpdate from "./pages/ClubUpdate";
import ClubMembers from "./pages/ClubMembers";
import AddMember from "./pages/AddMember";
import UserOrders from "./pages/UserOrders";
import OrderCreate from "./pages/OrderCreate";
import { OrderProvider } from "./contexts/OrderContext";
import UserOrder from "./pages/UserOrder";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<VendorProvider>
					<ClubProvider>
						<ItemProvider>
							<MemberProvider>
								<OrderProvider>
									<Routes>
										<Route element={<Home />} path="/" />
										//Clubs
										<Route element={<Clubs />} path="/club" />
										<Route element={<ClubCreate />} path="/club/create" />
										<Route element={<Club />} path="/club/:id" />
										<Route element={<ClubUpdate />} path="/club/:id/update" />
										<Route element={<ClubMembers />} path="/club/:id/members" />
										<Route
											element={<AddMember />}
											path="/club/:id/members/add"
										/>
										//Vendors
										<Route element={<Vendors />} path="/vendor" />
										<Route element={<VendorCreate />} path="/vendor/create" />
										<Route element={<Vendor />} path="/vendor/:id" />
										<Route
											element={<VendorUpdate />}
											path="/vendor/:id/update"
										/>
										//Users
										<Route element={<Users />} path="/user" />
										<Route element={<User />} path="/user/:id" />
										<Route element={<UserCreate />} path="/user/create" />
										<Route element={<UserUpdate />} path="/user/:id/update" />
										//Items
										<Route element={<Items />} path="vendor/:id/item" />
										<Route element={<Item />} path="vendor/:id/item/:itemid" />
										<Route
											element={<ItemCreate />}
											path="vendor/:id/item/create"
										/>
										<Route
											element={<ItemUpdate />}
											path="vendor/:id/item/:itemid/update"
										/>
										//Orders
										<Route
											element={<OrderCreate />}
											path="user/:id/order/create"
										/>
										<Route element={<UserOrders />} path="user/:id/order" />
										<Route
											element={<UserOrder />}
											path="user/:id/order/:orderid"
										/>
									</Routes>
								</OrderProvider>
							</MemberProvider>
						</ItemProvider>
					</ClubProvider>
				</VendorProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
