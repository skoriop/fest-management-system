// import { useContext, useEffect } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useClub } from "@/contexts/ClubContext";
import { Link, useParams } from "react-router-dom";

function Club() {
	const { id } = useParams();
	const { club, getClubByIdCallback } = useClub();
	useEffect(() => {
		async function getById() {
			await getClubByIdCallback(id);
		}
		getById();
	}, [getClubByIdCallback, id]);

	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 w-1/3">
				<h1 className="mx-auto text-2xl font-bold text-yellow-100">
					{club.name}
				</h1>
				<h3 className="text-center text-xl">{club.description}</h3>
				<h3 className="text-center text-xl">{club.members} members</h3>
				<Link
					to={`/club/${id}/update`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Update
				</Link>
				<Link
					to={`/club/${id}/members`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Members
				</Link>
				<Link
					to={`/club/${id}/events`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Manage Events
				</Link>
			</div>
		</div>
	);
}

export default Club;
