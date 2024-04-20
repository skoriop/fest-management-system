import Navbar from "@/components/Navbar";
import { useEvent } from "@/contexts/EventContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventUpdate() {
	const { id, eventid } = useParams();
	const {
		event,
		getEventByIdCallback,
		updateEventCallback,
		deleteEventCallback,
	} = useEvent();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startTime, setStartTime] = useState(new Date().toISOString());
	const [endTime, setEndTime] = useState(new Date().toISOString());
	const [fee, setFee] = useState(0);
	useEffect(() => {
		console.log(event.start_time);
		console.log(event.end_time);
		getEventByIdCallback(eventid);
		setName(event.name);
		setDescription(event.description);
		setStartTime(event.start_time.replace("+00:00", ""));
		setEndTime(event.end_time.replace("+00:00", ""));
		setFee(event.fee);
	}, [
		getEventByIdCallback,
		eventid,
		event.description,
		event.name,
		event.start_time,
		event.end_time,
		event.fee,
	]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start events-center space-y-12">
			<Navbar />
			<div className="flex flex-col self-center w-fit border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Update Event</h1>
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
					<div className="text-2xl">Description</div>
					<textarea
						className="text-black text-center p-1 border-2 border-slate-600"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Start Time</div>
					<input
						type="datetime-local"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">End Time</div>
					<input
						type="datetime-local"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Fee</div>
					<input
						type="number"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={fee}
						onChange={(e) => setFee(+e.target.value)}
					/>
				</div>
				<div className="flex">
					<button
						className="font-bold py-3 px-6 flex gap-2 events-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							updateEventCallback(
								eventid,
								name,
								description,
								startTime,
								endTime,
								fee,
								id,
							);
						}}
						type="submit"
					>
						Update
					</button>
					<button
						className="font-bold py-3 px-6 text-2xl flex gap-2 events-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							deleteEventCallback(eventid);
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

export default EventUpdate;
