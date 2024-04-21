import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useClub } from "@/contexts/ClubContext";
import { useEffect, useState } from "react";

function Clubs() {
	const { getAllClubsCallback } = useClub();
	const [clubs, setClubs] = useState([]);
	useEffect(() => {
		async function getAllClubs() {
			const data = await getAllClubsCallback();
			setClubs(data);
		}
		getAllClubs();
	}, [getAllClubsCallback]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to="/club/create"
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Create Club
			</Link>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{clubs.map((club) => {
					return (
						<Link
							to={`/club/${club.id}`}
							className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 hover:scale-105"
						>
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								{club.name}
							</h1>
							<h3 className="text-center text-xl">{club.description}</h3>
							<h3 className="text-center text-xl">{club.members} members</h3>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Clubs;
