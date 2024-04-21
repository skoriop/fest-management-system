import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

interface clubType {
	name: string;
	description: string;
	members: number;
}

interface clubAction {
	type: string;
	payload: {
		name?: string;
		description?: string;
	};
}

const initialState = {
	name: "",
	description: "",
	members: 0,
};

const ClubContext = createContext<any>({});

const reducer = (state: clubType, action: clubAction) => {
	switch (action.type) {
		case "club/get":
			return {
				...state,
				name: action.payload.name,
				description: action.payload.description,
			};
		default:
			return state;
	}
};

const ClubProvider = ({ children }) => {
	const [club, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const getClubById = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/clubs/${id}`,
			});
			if (res.statusText === "OK") {
				dispatch({
					type: "club/get",
					payload: res.data.data,
				});
			}
		} catch (err) {
			console.log("Error while querying for club:", err.message);
		}
	};

	const getAllClubs = async () => {
		try {
			const res = await axios({
				method: "get",
				url: "http://localhost:8000/clubs",
			});
			if (res.data.data.length === 0) return [];
			return res.data.data;
		} catch (err) {
			console.log("Error while querying for club:", err.message);
			return [];
		}
	};

	const createClub = async (name: string, description: string) => {
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8000/clubs/create",
				data: {
					name,
					description,
					members: 0,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/club/${res.data.data.id}`);
			}
		} catch (err) {
			console.log("Error while querying for club:", err.message);
		}
	};
	const updateClub = async (name: string, description: string, id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/clubs/${id}/update`,
				data: { name, description },
			});

			if (res.statusText === "OK") {
				navigate(`/club/${id}`);
			}
		} catch (err) {
			console.log("Error while querying for club:", err.message);
		}
	};
	const addMember = async (id: string, email: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/clubs/${id}/add_member/${email}`,
			});

			if (res.statusText === "OK") {
				navigate(`/club/${id}/members`);
			}
		} catch (err) {
			console.log("Error while querying for club:", err.message);
		}
	};
	const deleteClub = async (id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/clubs/${id}/delete`,
			});
			if (res.statusText === "OK") {
				navigate("/club");
			}
		} catch (err) {
			console.log("Error while querying for club:", err.message);
		}
	};

	const getClubByIdCallback = useCallback(getClubById, []);
	const getAllClubsCallback = useCallback(getAllClubs, []);
	const createClubCallback = useCallback(createClub, []);
	const updateClubCallback = useCallback(updateClub, []);
	const addMemberCallback = useCallback(addMember, []);
	const deleteClubCallback = useCallback(deleteClub, []);

	return (
		<ClubContext.Provider
			value={{
				club,
				getClubByIdCallback,
				getAllClubsCallback,
				createClubCallback,
				updateClubCallback,
				addMemberCallback,
				deleteClubCallback,
			}}
		>
			{children}
		</ClubContext.Provider>
	);
};

const useClub = () => {
	const context = useContext(ClubContext);
	return context;
};

export { ClubProvider, useClub };
