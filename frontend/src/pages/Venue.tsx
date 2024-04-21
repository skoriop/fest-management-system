// import { useContext, useEffect } from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useVenue } from "@/contexts/VenueContext";
import { Link, useParams } from "react-router-dom";
import type { eventType } from "../contexts/EventContext";

function Venue() {
	const { id } = useParams();
	const { venue, getVenueByIdCallback, getVenueEventsCallback } = useVenue();
	const [events, setEvents] = useState([]);
	useEffect(() => {
		async function getById() {
			await getVenueByIdCallback(id);
			const data = await getVenueEventsCallback(id);
			console.log(data);
			setEvents(data);
		}
		getById();
	}, [getVenueByIdCallback, getVenueEventsCallback, id]);

	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 w-1/3">
				<h1 className="mx-auto text-2xl font-bold text-yellow-100">
					ID: {venue.id}
				</h1>
				<h1 className="mx-auto text-2xl font-bold text-yellow-100">
					{venue.name}
				</h1>
				<h3 className="text-center text-xl">{venue.type}</h3>
				<h3 className="text-center text-xl">Capacity: {venue.capacity}</h3>
				<h2 className="text-center text-4xl font-bold">Schedule</h2>
				<div className="grid grid-cols-1 gap-12 px-6 py-2">
					{events.map((event: eventType) => {
						return (
							<div className="flex flex-col members-center border-slate-200 border-2 px-12 py-10 space-y-1">
								<h1 className="mx-auto text-2xl font-bold text-yellow-100 pb-2">
									ID: {event.id}
								</h1>
								<div className="flex events-center space-x-4">
									<h3 className="font-bold text-xl">Name: </h3>
									<h3 className="text-center text-xl">{event.name}</h3>
								</div>
								<div className="flex events-center space-x-4">
									<h3 className="font-bold text-xl">Description: </h3>
									<h3 className="text-center text-xl">{event.description}</h3>
								</div>
								<div className="flex events-center space-x-4">
									<h3 className="font-bold text-xl">Start Time: </h3>
									<h3 className="text-center text-xl">
										{new Date(event.start_time).toLocaleString()}
									</h3>
								</div>

								<div className="flex events-center space-x-4">
									<h3 className="font-bold text-xl">End Time: </h3>
									<h3 className="text-center text-xl">
										{new Date(event.end_time).toLocaleString()}
									</h3>
								</div>

								<div className="flex events-center space-x-4">
									<h3 className="font-bold text-xl">Fee: </h3>
									<h3 className="text-center text-xl">{event.fee}</h3>
								</div>

								<Link
									to={`/event/${event.id}/register`}
									className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
								>
									Register
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Venue;
