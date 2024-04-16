import React, {
	createContext,
	useCallback,
	useContext,
	useReducer,
} from "react";

const initialState = {
	id: "",
	email: "",
	name: "",
	phoneNumber: null,
	fromBits: true,
	bitsId: "",
	spent: 0,
	affiliation: "",
};

interface userType {
	id: string;
	email: string;
	name: string;
	phoneNumber: number | null;
	fromBits: boolean;
	bitsId: string;
	spent: number;
	affiliation: string;
}

interface userAction {
	type: string;
	payload: {
		id?: string;
		email?: string;
		name?: string;
		phoneNumber?: number | null;
		fromBits?: boolean;
		bitsId?: string;
		spent?: number;
		affiliation?: string;
	};
}

const UserContext = createContext({
	user: initialState,
	getUserByIdCallback: (id: string) => {},
	createUserCallback: (
		name: string,
		email: string,
		phoneNumber: number,
		affiliation: string,
	) => {},
	updateUserCallback: (
		name: string,
		email: string,
		phoneNumber: number,
		affiliation: string,
		id: string,
	) => {},
	deleteUserCallback: (id: string) => {},
});

function reducer(state: userType, action: userAction) {
	switch (action.type) {
		case "user/get":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
				name: action.payload.name,
				bitsId: action.payload.bitsId,
				spent: action.payload.spent,
				affiliation: action.payload.affiliation || "",
				phoneNumber: action.payload.phoneNumber || null,
				fromBits: action.payload.fromBits,
			};
		default:
			return state;
	}
}

const UserProvider = ({ children }) => {
	const [user, dispatch] = useReducer(reducer, initialState);

	const getUserById = (id: string) => {
		const data = {
			id: "1234",
			email: "f20220037@gmail.com",
			name: "Kishan",
			phoneNumber: 9600479089,
			fromBits: true,
			bitsId: "",
			spent: 0,
			affiliation: "",
		};
		data.bitsId = data.fromBits ? data.email.split("@")[0] : "";
		dispatch({ type: "user/get", payload: data });
	};

	const createUser = (
		name: string,
		email: string,
		phoneNumber: number,
		aff: string,
	) => {
		const fromBits = email.split("@")[1] === "hyderabad.bits-pilani.ac.in";
		const bitsId = fromBits ? email.split("@")[0] : "";
		const affiliation = fromBits ? "" : aff;
	};

	const deleteUser = (id: string) => {};
	const updateUser = (
		name: string,
		email: string,
		phoneNumber: number,
		aff: string,
		id: string,
	) => {
		const fromBits = email.split("@")[1] === "hyderabad.bits-pilani.ac.in";
		const bitsId = fromBits ? email.split("@")[0] : "";
		const affiliation = fromBits ? "" : aff;
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
