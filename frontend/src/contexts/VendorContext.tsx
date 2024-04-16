import React, {
	createContext,
	useCallback,
	useContext,
	useReducer,
} from "react";

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

const VendorContext = createContext({
	vendor: initialState,
	getVendorByIdCallback: async (id: string) => {},
	getAllVendorsCallback: () => [],
	createVendorCallback: (body: vendorType) => {},
	updateVendorCallback: (body: vendorType) => {},
	nameCallback: (name: string) => {},
	descriptionCallback: (description: string) => {},
});

const reducer = (state: vendorType, action: vendorAction) => {
	switch (action.type) {
		case "vendor/get":
			return {
				...state,
				name: action.payload.name,
				description: action.payload.description,
			};
		case "vendor/name": {
			return {
				...state,
				name: action.payload.name,
			};
		}
		case "vendor/description": {
			return {
				...state,
				description: action.payload.name,
			};
		}
		default:
			return state;
	}
};

const VendorProvider = ({ children }) => {
	const [vendor, dispatch] = useReducer(reducer, initialState);

	const getVendorById = async (id: string) => {
		const data = {
			name: "Vendor1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
		};
		dispatch({
			type: "vendor/get",
			payload: data,
		});
	};

	const getAllVendors = () => {
		const data = [
			{
				id: "1234",
				name: "Vendor1",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
			},
			{
				id: "1111",
				name: "Vendor2",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
			},
			{
				id: "1115",
				name: "Vendor3",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
			},
			{
				id: "1116",
				name: "Vendor4",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
			},
		];

		return data;
	};

	const createVendor = (body: vendorType) => {};
	const updateVendor = (body: vendorType) => {};
	const name = (name: string) => {
		dispatch({ type: "/vendor/name", payload: { name } });
	};
	const description = (description: string) => {
		dispatch({ type: "/vendor/description", payload: { description } });
	};

	const getVendorByIdCallback = useCallback(getVendorById, []);
	const getAllVendorsCallback = useCallback(getAllVendors, []);
	const createVendorCallback = useCallback(createVendor, []);
	const updateVendorCallback = useCallback(updateVendor, []);
	const nameCallback = useCallback(name, []);
	const descriptionCallback = useCallback(description, []);
	return (
		<VendorContext.Provider
			value={{
				vendor,
				getVendorByIdCallback,
				getAllVendorsCallback,
				createVendorCallback,
				updateVendorCallback,
				nameCallback,
				descriptionCallback,
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

export { VendorProvider, VendorContext, useVendor };
