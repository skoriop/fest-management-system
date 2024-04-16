import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VendorPortal from "./pages/VendorPortal";
import StudentPortal from "./pages/StudentPortal";
import ClubPortal from "./pages/ClubPortal";
import StudentOrder from "./pages/StudentOrder";
import StudentRegister from "./pages/StudentRegister";
import VendorItems from "./pages/VendorItems";
import ClubEvents from "./pages/ClubEvents";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<StudentPortal />} path="/student" />
				<Route element={<StudentOrder />} path="/student/order" />
				<Route element={<StudentRegister />} path="/student/register" />
				<Route element={<VendorPortal />} path="/vendor" />
				<Route element={<VendorItems />} path="/vendor/items" />
				<Route element={<ClubPortal />} path="/club" />
				<Route element={<ClubEvents />} path="/club/events" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
