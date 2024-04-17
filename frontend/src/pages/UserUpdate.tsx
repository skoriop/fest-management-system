import Navbar from "@/components/Navbar";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserUpdate() {
	const params = useParams();
	const { user, getUserByIdCallback, updateUserCallback, deleteUserCallback } =
		useUser();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [affiliation, setAffiliation] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	useEffect(() => {
		getUserByIdCallback(params.id);
		setName(user.name);
		setEmail(user.email);
		setPhoneNumber(user.phone_number);
		setAffiliation(user.affiliation);
	}, [
		getUserByIdCallback,
		params.id,
		user.affiliation,
		user.email,
		user.name,
		user.phone_number,
	]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Update User</h1>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Name</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Phone Number</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4 ">
					<div className="text-2xl">Email</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				{email.split("@")[1] !== "hyderabad.bits-pilani.ac.in" ? (
					<div className="flex justify-between space-x-4 pb-4">
						<div className="text-2xl">Affiliation</div>
						<input
							type="text"
							className="text-black text-center p-1 border-2 border-slate-600"
							value={affiliation}
							onChange={(e) => setAffiliation(e.target.value)}
						/>
					</div>
				) : (
					""
				)}
				<div className="flex">
					<button
						className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							updateUserCallback(
								name,
								email,
								+phoneNumber,
								affiliation,
								params.id,
							);
						}}
						type="submit"
					>
						Update
					</button>

					<button
						className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							deleteUserCallback(params.id);
						}}
						type="submit"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserUpdate;
