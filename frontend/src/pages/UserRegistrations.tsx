import Navbar from "@/components/Navbar";
import { useEvent } from "@/contexts/EventContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserRegistrations() {
	const { id } = useParams();
	const { getAllRegistrationsCallback } = useEvent();
	const [registrations, setRegistrations] = useState([]);
	useEffect(() => {
		async function getUserRegistrations() {
			const data = await getAllRegistrationsCallback(id);
			console.log(data);
			setRegistrations(data);
		}
		getUserRegistrations();
	}, [getAllRegistrationsCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to={"/event"}
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				View Events
			</Link>
			<h2 className="font-bold py-3 px-6 text-4xl flex gap-2 items-centertext-slate-300 w-fit mx-auto">
				View Registrations
			</h2>
			<div className="grid grid-cols-3 gap-8 px-6 py-2">
				{registrations.map((registration) => {
					return (
						<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								{registration.name}
							</h1>
							<h3 className="text-center text-xl">
								{registration.description}
							</h3>
							<h3 className="text-center text-xl">Fee: {registration.fee}</h3>
							<h3 className="text-center text-xl">
								Start Time: {new Date(registration.start_time).toLocaleString()}
							</h3>
							<h3 className="text-center text-xl">
								End Time: {new Date(registration.end_time).toLocaleString()}
							</h3>
							<div className="flex events-center space-x-4">
								<h3 className="font-bold text-xl">Venues: </h3>
								<h3 className="text-center text-xl">
									{registration.venues.map((x) => x.name).join(", ")}
								</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default UserRegistrations;
