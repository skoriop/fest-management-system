import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Users() {
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to="/user/create"
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Create User
			</Link>
		</div>
	);
}

export default Users;
