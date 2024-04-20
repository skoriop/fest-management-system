import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

function Users() {
	const [email, setEmail] = useState("");
	const { getUserByEmailCallback } = useUser();
	async function handleSubmit() {
		await getUserByEmailCallback(email);
	}
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to="/user/create"
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Create User
			</Link>
			<div className="flex flex-col border-slate-200 border-2 px-12 py-16 space-y-8 items-center">
				<h1 className="text-4xl text-yellow-200">Enter Email</h1>
				<div className="flex space-x-4 items-center">
					<div className="text-2xl font-bold">Email</div>
					<input
						type="text"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						className="text-lg text-black text-center py-1"
					/>
				</div>
				<button
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
					onClick={handleSubmit}
					type="submit"
				>
					Login
				</button>
			</div>
		</div>
	);
}

export default Users;
