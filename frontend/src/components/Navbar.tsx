import { Link } from "react-router-dom";

function Navbar() {
	//Temporary - Should Change Acc to Final Structure
	return (
		<div className="bg-slate-900 w-screen px-4 py-6 flex justify-around">
			<Link
				to="/"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				Home
			</Link>
			<Link
				to="/user"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				User
			</Link>
			<Link
				to="/vendor"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				Vendors
			</Link>
			<Link
				to="/order"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				Orders
			</Link>
			<Link
				to="/club"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				Clubs
			</Link>
			<Link
				to="/venue"
				className="text-2xl uppercase font-bold hover:text-slate-300"
			>
				Venues
			</Link>
		</div>
	);
}

export default Navbar;
