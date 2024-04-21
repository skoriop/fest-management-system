import Navbar from "@/components/Navbar";
import { useEvent } from "@/contexts/EventContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventRegister() {
	const { id } = useParams();
	const { event, getEventByIdCallback, registerEventCallback } = useEvent();
	const [email, setEmail] = useState("");
	useEffect(() => {
		getEventByIdCallback(id);
	}, [id, getEventByIdCallback]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start events-center space-y-12">
			<Navbar />
			<div className="flex flex-col self-center w-fit border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">
					Register for Event
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
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Email</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex">
					<button
						className="font-bold py-3 px-6 flex gap-2 events-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							registerEventCallback(id, email);
						}}
						type="submit"
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default EventRegister;
