import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
	id: "",
	email: "",
	name: "",
	phone_number: null,
	from_bits: true,
	bits_id: "",
	spent: 0,
	affiliation: "",
};

interface userType {
	id: string;
	email: string;
	name: string;
	phone_number: number | null;
	from_bits: boolean;
	bits_id: string;
	spent: number;
	affiliation: string;
}

interface userAction {
	type: string;
	payload: {
		id?: string;
		email?: string;
		name?: string;
		phone_number?: number | null;
		from_bits?: boolean;
		bits_id?: string;
		spent?: number;
		affiliation?: string;
	};
}

const UserContext = createContext<any>({});

function reducer(state: userType, action: userAction) {
	switch (action.type) {
		case "user/get":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
				name: action.payload.name,
				bits_id: action.payload.bits_id,
				spent: action.payload.spent,
				affiliation: action.payload.affiliation || "",
				phone_number: action.payload.phone_number || null,
				from_bits: action.payload.from_bits,
			};
		default:
			return state;
	}
}

const UserProvider = ({ children }) => {
	const [user, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const getUserById = async (id: string) => {
		const res = await axios({
			method: "get",
			url: `http://localhost:8000/user/${id}`,
		});

		dispatch({ type: "user/get", payload: res.data.data });
	};

	const createUser = async (
		name: string,
		email: string,
		phone_number: number,
		aff: string | null,
	) => {
		const from_bits = email.split("@")[1] === "hyderabad.bits-pilani.ac.in";
		const bits_id = from_bits ? email.split("@")[0] : null;
		const affiliation = aff.length === 0 ? null : aff;
		const body = {
			name,
			phone_number,
			email,
			from_bits,
			bits_id,
			affiliation,
			spent: 0,
		};
		console.log(body);
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8000/user/create/",
				data: body,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			});
			if (res.statusText === "OK") {
				navigate(`/user/${res.data.data.id}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteUser = async (id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/user/${id}/delete`,
			});

			if (res.statusText === "OK") {
				navigate("/user/create");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const updateUser = async (
		name: string,
		email: string,
		phone_number: number,
		aff: string | null,
		id: string,
	) => {
		const from_bits = email.split("@")[1] === "hyderabad.bits-pilani.ac.in";
		const bits_id = from_bits ? email.split("@")[0] : null;
		const affiliation = from_bits ? null : aff;

		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/user/${id}/update`,
				data: {
					name,
					email,
					phone_number,
					from_bits,
					bits_id,
					affiliation,
					spent: user.spent,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/user/${id}`);
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	const getUserByIdCallback = useCallback(getUserById, []);
	const createUserCallback = useCallback(createUser, []);
	const deleteUserCallback = useCallback(deleteUser, []);
	const updateUserCallback = useCallback(updateUser, []);

	return (
		<UserContext.Provider
			value={{
				user,
				getUserByIdCallback,
				createUserCallback,
				deleteUserCallback,
				updateUserCallback,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
const useUser = () => {
	const context = useContext(UserContext);
	return context;
};

export { UserProvider, useUser };
