import { useState } from "react";
import Navbar from "../components/Navbar";
import { useVenue } from "@/contexts/VenueContext";

function VenueCreate() {
	const { createVenueCallback } = useVenue();
	const [name, setName] = useState("");
	const [capacity, setCapacity] = useState(0);
	const [type, setType] = useState("");
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="text-5xl font-bold">Venue Portal</div>
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Create Venue</h1>
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
					<div className="text-2xl">Capacity</div>
					<input
						type="number"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={capacity}
						onChange={(e) => setCapacity(parseInt(e.target.value))}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Type</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={type}
						onChange={(e) => setType(e.target.value)}
					/>
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
					onClick={() => {
						createVenueCallback(name, capacity, type);
					}}
				>
					Create
				</button>
			</div>
		</div>
	);
}

export default VenueCreate;
