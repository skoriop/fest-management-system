import axios from "axios";
import { useContext, useReducer, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
	id: "",
};

interface memberType {
	id: string;
}

interface actionType {
	type: string;
	payload: {
		id: string;
	};
}

const reducer = (state: memberType, action: actionType) => {
	switch (action.type) {
		case "member/get":
			return {
				...state,
				id: action.payload.id,
			};
		default:
			return state;
	}
};
const MemberContext = createContext<any>({});

function MemberProvider({ children }) {
	const [member, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	const getAllMembers = async (id: number) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/clubs/${id}/members`,
			});
			console.log(res);
			if (res.statusText === "OK") {
				if (res.data.data.length === 0) return [];
				return res.data.data;
			}
			return [];
		} catch (err) {
			console.log("Error while querying for members", err.message);
		}
	};

	const addMember = async (id: number, userid: number) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/clubs/${id}/add_member`,
				data: {
					id: userid,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/club/${id}/members`);
			}
		} catch (err) {
			console.log("Error while querying for member", err.message);
		}
	};

	const removeMember = async (id: number, userid: number) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/clubs/${id}/remove_member`,
				data: {
					id: userid,
				},
			});
			if (res.statusText === "OK") {
				navigate(0);
			}
		} catch (err) {
			console.log("Error while querying for member", err.message);
		}
	};

	const getAllMembersCallback = useCallback(getAllMembers, []);
	const addMemberCallback = useCallback(addMember, []);
	const removeMemberCallback = useCallback(removeMember, []);
	return (
		<MemberContext.Provider
			value={{
				member,
				getAllMembersCallback,
				addMemberCallback,
				removeMemberCallback,
			}}
		>
			{children}
		</MemberContext.Provider>
	);
}

const useMember = () => {
	const context = useContext(MemberContext);
	return context;
};

export { MemberProvider, useMember };
