import Navbar from "@/components/Navbar";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function User() {
	const { user, getUserByIdCallback } = useUser();
	const { id } = useParams();
	useEffect(() => {
		getUserByIdCallback(id);
	}, [getUserByIdCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-6 w-1/3">
				<h1 className="mx-auto text-2xl font-bold text-yellow-100">
					{user.name}
				</h1>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Email: </p>
					<p>{user.email}</p>
				</h3>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">PhoneNumber: </p>
					<p>{user.phone_number}</p>
				</h3>
				{user.from_bits ? (
					""
				) : (
					<h3 className="flex space-x-4 text-center text-xl mx-16">
						<p className="font-bold">Affiliation: </p>
						<p>{user.affiliation}</p>
					</h3>
				)}
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Spent: </p>
					<p>{user.spent}</p>
				</h3>
				<Link
					to={`/user/${id}/update`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Update
				</Link>
				<Link
					to={`/user/${id}/order`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Orders
				</Link>
				<Link
					to={`/user/${id}/registrations`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Registrations
				</Link>
			</div>
		</div>
	);
}

export default User;
