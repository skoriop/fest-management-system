import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

interface vendorType {
	name: string;
	description: string;
}

interface vendorAction {
	type: string;
	payload: {
		name?: string;
		description?: string;
	};
}

const initialState = {
	name: "",
	description: "",
};

const VendorContext = createContext<any>({});

const reducer = (state: vendorType, action: vendorAction) => {
	switch (action.type) {
		case "vendor/get":
			return {
				...state,
				name: action.payload.name,
				description: action.payload.description,
			};
		default:
			return state;
	}
};

const VendorProvider = ({ children }) => {
	const [vendor, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const getVendorById = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/vendor/${id}`,
			});
			if (res.statusText === "OK") {
				dispatch({
					type: "vendor/get",
					payload: res.data.data,
				});
			}
		} catch (err) {
			console.log("Error while querying for vendor:", err.message);
		}
	};

	const getAllVendors = async () => {
		try {
			const res = await axios({
				method: "get",
				url: "http://localhost:8000/vendor",
			});
			if (res.data.data.length === 0) return [];
			return res.data.data;
		} catch (err) {
			console.log("Error while querying for vendor:", err.message);
			return [];
		}
	};

	const createVendor = async (name: string, description: string) => {
		try {
			const res = await axios({
				method: "post",
				url: "http://localhost:8000/vendor/create",
				data: {
					name,
					description,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/vendor/${res.data.data.id}`);
			}
		} catch (err) {
			console.log("Error while querying for vendor:", err.message);
		}
	};
	const updateVendor = async (
		name: string,
		description: string,
		id: string,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/vendor/${id}/update`,
				data: { name, description },
			});

			if (res.statusText === "OK") {
				navigate(`/vendor/${id}`);
			}
		} catch (err) {
			console.log("Error while querying for vendor:", err.message);
		}
	};
	const deleteVendor = async (id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/vendor/${id}/delete`,
			});
			if (res.statusText === "OK") {
				navigate("/vendor");
			}
		} catch (err) {
			console.log("Error while querying for vendor:", err.message);
		}
	};

	const getVendorByIdCallback = useCallback(getVendorById, []);
	const getAllVendorsCallback = useCallback(getAllVendors, []);
	const createVendorCallback = useCallback(createVendor, []);
	const updateVendorCallback = useCallback(updateVendor, []);
	const deleteVendorCallback = useCallback(deleteVendor, []);

	return (
		<VendorContext.Provider
			value={{
				vendor,
				getVendorByIdCallback,
				getAllVendorsCallback,
				createVendorCallback,
				updateVendorCallback,
				deleteVendorCallback,
			}}
		>
			{children}
		</VendorContext.Provider>
	);
};

const useVendor = () => {
	const context = useContext(VendorContext);
	return context;
};

export { VendorProvider, useVendor };
