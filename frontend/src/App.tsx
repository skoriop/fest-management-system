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
import ClubEvents from "./pages/ClubEvents";
import { EventProvider } from "./contexts/EventContext";
import AddEvent from "./pages/AddEvent";
import EventUpdate from "./pages/EventUpdate";
import Events from "./pages/Events";
import EventRegister from "./pages/EventRegister";
import UserRegistrations from "./pages/UserRegistrations";
import Venues from "./pages/Venues";
import { VenueProvider } from "./contexts/VenueContext";
import VenueCreate from "./pages/VenueCreate";
import Venue from "./pages/Venue";
import VendorSales from "./pages/VendorSales";
import VendorOrders from "./pages/VendorOrders";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<VendorProvider>
					<ClubProvider>
						<ItemProvider>
							<MemberProvider>
								<OrderProvider>
									<EventProvider>
										<VenueProvider>
											<Routes>
												<Route element={<Home />} path="/" />
												//Venues
												<Route element={<Venues />} path="/venue" />
												<Route element={<Venue />} path="/venue/:id" />
												<Route element={<VenueCreate />} path="/venue/create" />
												//Events
												<Route element={<Events />} path="/event" />
												<Route
													element={<EventRegister />}
													path="/event/:id/register"
												/>
												//Clubs
												<Route element={<Clubs />} path="/club" />
												<Route element={<ClubCreate />} path="/club/create" />
												<Route element={<Club />} path="/club/:id" />
												<Route
													element={<ClubUpdate />}
													path="/club/:id/update"
												/>
												<Route
													element={<ClubMembers />}
													path="/club/:id/members"
												/>
												<Route
													element={<ClubEvents />}
													path="/club/:id/events"
												/>
												<Route
													element={<AddEvent />}
													path="/club/:id/events/add"
												/>
												<Route
													element={<EventUpdate />}
													path="/club/:id/events/:eventid/update"
												/>
												<Route
													element={<AddMember />}
													path="/club/:id/members/add"
												/>
												//Vendors
												<Route element={<Vendors />} path="/vendor" />
												<Route
													element={<VendorCreate />}
													path="/vendor/create"
												/>
												<Route element={<Vendor />} path="/vendor/:id" />
												<Route
													element={<VendorUpdate />}
													path="/vendor/:id/update"
												/>
												//Users
												<Route element={<Users />} path="/user" />
												<Route element={<User />} path="/user/:id" />
												<Route element={<UserCreate />} path="/user/create" />
												<Route
													element={<UserUpdate />}
													path="/user/:id/update"
												/>
												<Route
													element={<VendorSales />}
													path="/vendor/:id/sales"
												/>
												//Items
												<Route element={<Items />} path="vendor/:id/item" />
												<Route
													element={<Item />}
													path="vendor/:id/item/:itemid"
												/>
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
													element={<UserRegistrations />}
													path="user/:id/registrations"
												/>
												<Route
													element={<UserOrder />}
													path="user/:id/order/:orderid"
												/>
											</Routes>
										</VenueProvider>
										<Routes>
											<Route element={<Home />} path="/" />
											//Events
											<Route element={<Events />} path="/event" />
											<Route
												element={<EventRegister />}
												path="/event/:id/register"
											/>
											//Clubs
											<Route element={<Clubs />} path="/club" />
											<Route element={<ClubCreate />} path="/club/create" />
											<Route element={<Club />} path="/club/:id" />
											<Route element={<ClubUpdate />} path="/club/:id/update" />
											<Route
												element={<ClubMembers />}
												path="/club/:id/members"
											/>
											<Route element={<ClubEvents />} path="/club/:id/events" />
											<Route
												element={<AddEvent />}
												path="/club/:id/events/add"
											/>
											<Route
												element={<EventUpdate />}
												path="/club/:id/events/:eventid/update"
											/>
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
											<Route
												element={<VendorSales />}
												path="/vendor/:id/sales"
											/>
											<Route
												element={<VendorOrders />}
												path="/vendor/:id/orders"
											/>
											//Users
											<Route element={<Users />} path="/user" />
											<Route element={<User />} path="/user/:id" />
											<Route element={<UserCreate />} path="/user/create" />
											<Route element={<UserUpdate />} path="/user/:id/update" />
											//Items
											<Route element={<Items />} path="vendor/:id/item" />
											<Route
												element={<Item />}
												path="vendor/:id/item/:itemid"
											/>
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
									</EventProvider>
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
