import Navbar from "@/components/Navbar";
import { useClub } from "@/contexts/ClubContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ClubUpdate() {
	const params = useParams();
	const { club, getClubByIdCallback, updateClubCallback, deleteClubCallback } =
		useClub();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	useEffect(() => {
		getClubByIdCallback(params.id);
		setName(club.name);
		setDescription(club.description);
	}, [getClubByIdCallback, params.id, club.description, club.name]);

	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Update Club</h1>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Name</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4 pb-4">
					<div className="text-2xl">Description</div>
					<textarea
						className="text-black text-center p-1 border-2 border-slate-600"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex">
					<button
						className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							updateClubCallback(name, description, params.id);
						}}
						type="submit"
					>
						Update
					</button>

					<button
						className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							deleteClubCallback(params.id);
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

export default ClubUpdate;
