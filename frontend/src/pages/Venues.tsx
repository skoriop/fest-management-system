import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useVenue } from "@/contexts/VenueContext";
import { useEffect, useState } from "react";

function Venues() {
	const { getAllVenuesCallback } = useVenue();
	const [venues, setVenues] = useState([]);
	useEffect(() => {
		async function getAllVenues() {
			const data = await getAllVenuesCallback();
			setVenues(data);
		}
		getAllVenues();
	}, [getAllVenuesCallback]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to="/venue/create"
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Create Venue
			</Link>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{venues.map((venue) => {
					return (
						<Link
							to={`/venue/${venue.id}`}
							className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4"
						>
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								ID: {venue.id}
							</h1>
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								{venue.name}
							</h1>
							<h3 className="text-center text-xl">{venue.type}</h3>
							<h3 className="text-center text-xl">{venue.capacity} members</h3>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Venues;
