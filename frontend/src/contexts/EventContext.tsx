import axios from "axios";
import { useContext, useReducer, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
	id: "",
	name: "",
	description: "",
	start_time: "",
	end_time: "",
	fee: 0,
	organizer_id: 0,
};

interface eventType {
	id?: string;
	name: string;
	description: string;
	start_time: Date;
	end_time: Date;
	fee: number;
	organizer_id: number;
}

interface actionType {
	type: string;
	payload: {
		id?: string;
		name: string;
		description: string;
		start_time: Date;
		end_time: Date;
		fee: number;
		organizer_id: number;
	};
}

const reducer = (state: eventType, action: actionType) => {
	switch (action.type) {
		case "event/get":
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description || "",
				start_time: action.payload.start_time,
				end_time: action.payload.end_time,
				fee: action.payload.fee,
				organizer_id: action.payload.organizer_id,
			};
		default:
			return state;
	}
};
const EventContext = createContext<any>({});

function EventProvider({ children }) {
	const [event, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	const getAllEvents = async () => {
		try {
			const res = await axios({
				method: "get",
				url: "http://localhost:8000/events/",
			});
			if (res.statusText === "OK") {
				if (res.data.data.length === 0) return [];
				return res.data.data;
			}
			return [];
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const getEventById = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/events/${id}`,
			});
			if (res.statusText === "OK") {
				dispatch({ type: "event/get", payload: res.data.data });
			}
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const createEvent = async (
		name: string,
		description: string,
		start_time: Date,
		end_time: Date,
		fee: number,
		organizer_id: number,
		venue_list: string,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8000/events/create",
				data: {
					name,
					description,
					start_time,
					end_time,
					fee,
					organizer_id,
					venues: venue_list.split(",").map((x) => x.trim()),
				},
			});
			if (res.statusText === "OK") {
				navigate(`/club/${organizer_id}/events`);
			}
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const updateEvent = async (
		id: number,
		name: string,
		description: string,
		start_time: Date,
		end_time: Date,
		fee: number,
		organizer_id: number,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/events/${id}/update`,
				data: {
					name,
					description,
					start_time,
					end_time,
					fee,
					organizer_id,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/club/${organizer_id}/events`);
			}
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const getAllRegistrations = async (id: number) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/user/${id}/registrations`,
			});
			if (res.statusText === "OK") {
				if (res.data.data.length === 0) return [];
				return res.data.data;
			}
			return [];
		} catch (err) {
			console.log("Error while querying for registrations", err.message);
		}
	};

	const registerEvent = async (id: number, email: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/events/${id}/register/${email}`,
				data: {
					email,
				},
			});
			if (res.statusText === "OK") {
				navigate("/event");
			}
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const deleteEvent = async (id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/events/${id}/delete`,
			});
			if (res.statusText === "OK") {
				navigate(0);
			}
		} catch (err) {
			console.log("Error while querying for event", err.message);
		}
	};

	const getAllEventsCallback = useCallback(getAllEvents, []);
	const getEventByIdCallback = useCallback(getEventById, []);
	const getAllRegistrationsCallback = useCallback(getAllRegistrations, []);
	const registerEventCallback = useCallback(registerEvent, []);
	const createEventCallback = useCallback(createEvent, []);
	const updateEventCallback = useCallback(updateEvent, []);
	const deleteEventCallback = useCallback(deleteEvent, []);
	return (
		<EventContext.Provider
			value={{
				event,
				getAllEventsCallback,
				getEventByIdCallback,
				getAllRegistrationsCallback,
				registerEventCallback,
				createEventCallback,
				updateEventCallback,
				deleteEventCallback,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}

const useEvent = () => {
	const context = useContext(EventContext);
	return context;
};

export { EventProvider, useEvent, type eventType };
