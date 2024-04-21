import axios from "axios";
import { useContext, useReducer, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
	id: "",
	name: "",
	description: "",
	price: 0,
	non_veg: false,
	stock: 0,
	vendor_id: "",
};

interface itemType {
	id: string;
	name: string;
	description: string;
	price: number;
	non_veg: boolean;
	stock: number;
	vendor_id: string;
}

interface actionType {
	type: string;
	payload: {
		id?: string;
		name?: string;
		description?: string;
		price?: number;
		non_veg?: boolean;
		stock?: number;
		vendor_id?: string;
	};
}

const reducer = (state: itemType, action: actionType) => {
	switch (action.type) {
		case "item/get":
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description || "",
				price: action.payload.price,
				non_veg: action.payload.non_veg,
				stock: action.payload.stock,
				vendor_id: action.payload.vendor_id,
			};
		default:
			return state;
	}
};
const ItemContext = createContext<any>({});

function ItemProvider({ children }) {
	const [item, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	const getAllItems = async (vid: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/vendor/${vid}/items`,
			});
			if (res.statusText === "OK") {
				if (res.data.data.length === 0) return [];
				return res.data.data;
			}
			return [];
		} catch (err) {
			console.log("Error while querying for item", err.message);
		}
	};

	const getItemById = async (iid: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/items/${iid}`,
			});
			if (res.statusText === "OK") {
				dispatch({ type: "item/get", payload: res.data.data });
			}
		} catch (err) {
			console.log("Error while querying for item", err.message);
		}
	};

	const createItem = async (
		name: string,
		description: string,
		price: number,
		non_veg: boolean,
		stock: number,
		vid: string,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/vendor/${vid}/items/create`,
				data: {
					name,
					description,
					price,
					non_veg,
					stock,
					vendor_id: vid,
				},
			});
			if (res.statusText === "OK") {
				navigate(`vendor/${vid}/item/${res.data.data.id}`);
			}
		} catch (err) {
			console.log("Error while querying for item", err.message);
		}
	};

	const updateItem = async (
		name: string,
		description: string,
		price: number,
		non_veg: boolean,
		stock: number,
		vid: string,
		iid: string,
	) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/vendor/${vid}/items/${iid}/update`,
				data: {
					name,
					description,
					price,
					non_veg,
					stock,
					vendor_id: vid,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/vendor/${vid}/item/${iid}`);
			}
		} catch (err) {
			console.log("Error while querying for item", err.message);
		}
	};

	const deleteItem = async (vid: string, iid: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/vendor/${vid}/items/${iid}/delete`,
			});
			if (res.statusText === "OK") {
				navigate(`/vendor/${vid}/item`);
			}
		} catch (err) {
			console.log("Error while querying for item", err.message);
		}
	};

	const getAllItemsCallback = useCallback(getAllItems, []);
	const getItemByIdCallback = useCallback(getItemById, []);
	const createItemCallback = useCallback(createItem, []);
	const updateItemCallback = useCallback(updateItem, []);
	const deleteItemCallback = useCallback(deleteItem, []);
	return (
		<ItemContext.Provider
			value={{
				item,
				getAllItemsCallback,
				getItemByIdCallback,
				createItemCallback,
				updateItemCallback,
				deleteItemCallback,
			}}
		>
			{children}
		</ItemContext.Provider>
	);
}

const useItem = () => {
	const context = useContext(ItemContext);
	return context;
};

export { ItemProvider, useItem, type itemType };
