import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

interface venueType {
	id?: number;
	name: string;
	capacity: number;
	type: string;
}

interface venueAction {
	type: string;
	payload: {
		id?: number;
		name: string;
		capacity: number;
		type: string;
	};
}

const initialState = {
	id: 0,
	name: "",
	capacity: 0,
	type: "",
};

const VenueContext = createContext<any>({});

const reducer = (state: venueType, action: venueAction) => {
	switch (action.type) {
		case "venue/get":
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				capacity: action.payload.capacity,
				type: action.payload.type,
			};
		default:
			return state;
	}
};

const VenueProvider = ({ children }) => {
	const [venue, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const getVenueById = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/venues/${id}`,
			});
			if (res.statusText === "OK") {
				dispatch({
					type: "venue/get",
					payload: res.data.data,
				});
			}
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
		}
	};
	const getVenueEvents = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/venues/${id}/schedule`,
			});
			if (res.statusText === "OK") {
				dispatch({
					type: "venue/get",
					payload: res.data.data,
				});
			}
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
		}
	};

	const getAllVenues = async () => {
		try {
			const res = await axios({
				method: "get",
				url: "http://localhost:8000/venues",
			});
			if (res.data.data.length === 0) return [];
			return res.data.data;
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
			return [];
		}
	};

	const createVenue = async (name: string, capacity: number, type: string) => {
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8000/venues/create",
				data: {
					name,
					capacity,
					type,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/venue/${res.data.data.id}`);
			}
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
		}
	};
	const updateVenue = async (
		id: number,
		name: string,
		capacity: number,
		type: string,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/venues/${id}/update`,
				data: {
					name,
					capacity,
					type,
				},
			});

			if (res.statusText === "OK") {
				navigate("/venue");
			}
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
		}
	};
	const deleteVenue = async (id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/venues/${id}/delete`,
			});
			if (res.statusText === "OK") {
				navigate("/venue");
			}
		} catch (err) {
			console.log("Error while querying for venue:", err.message);
		}
	};

	const getVenueEventsCallback = useCallback(getVenueEvents, []);
	const getVenueByIdCallback = useCallback(getVenueById, []);
	const getAllVenuesCallback = useCallback(getAllVenues, []);
	const createVenueCallback = useCallback(createVenue, []);
	const updateVenueCallback = useCallback(updateVenue, []);
	const deleteVenueCallback = useCallback(deleteVenue, []);

	return (
		<VenueContext.Provider
			value={{
				venue,
				getVenueEventsCallback,
				getVenueByIdCallback,
				getAllVenuesCallback,
				createVenueCallback,
				updateVenueCallback,
				deleteVenueCallback,
			}}
		>
			{children}
		</VenueContext.Provider>
	);
};

const useVenue = () => {
	const context = useContext(VenueContext);
	return context;
};

export { VenueProvider, useVenue };
