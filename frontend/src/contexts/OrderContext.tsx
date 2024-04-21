import { createContext, useCallback, useContext, useReducer } from "react";
import { useVendor } from "./VendorContext";
import { type itemType, useItem } from "./ItemContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface cartType {
	order_id?: string;
	item_id: string;
	quantity: number;
}
function reducer(state, action) {
	switch (action.type) {
		case "order/get":
			return {
				...state,
				id: action.payload.id,
				status: action.payload.status,
				placed_by: action.payload.placed_by,
				created_at: action.payload.created_at,
				cart_items: action.payload.cart_items,
			};
		default:
			return state;
	}
}

const OrderContext = createContext<any>({});

const OrderProvider = ({ children }) => {
	const [order, dispatch] = useReducer(reducer, {
		status: "Placed",
		id: "",
		placed_by: "",
		created_at: Date.now(),
		cart_items: [],
	});
	const { getAllVendorsCallback } = useVendor();
	const { getAllItemsCallback } = useItem();
	const navigate = useNavigate();

	const createOrder = async (cart: cartType[], id: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/user/${id}/orders/create`,
				data: {
					status: "Placed",
					cart_items: cart,
				},
			});
			if (res.statusText === "OK") {
				navigate(`/user/${id}/order`);
			}
		} catch (err) {
			console.log("Error while querying for order:", err.message);
		}
	};
	const getVendorData = async () => {
		const vendors = await getAllVendorsCallback();
		let data: itemType[] = [];
		for (const vendor of vendors) {
			const items = await getAllItemsCallback(vendor.id);
			data = [...data, ...items];
		}
		return data;
	};

	const getUserOrders = async (id: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/user/${id}/orders`,
			});
			if (res.statusText === "OK") return res.data.data;
			return [];
		} catch (err) {
			console.log("Error while querying for order:", err.message);
		}
	};
	const getUserOrderById = async (uid: string, oid: string) => {
		try {
			const res = await axios({
				method: "get",
				url: `http://localhost:8000/user/${uid}/orders/${oid}`,
			});
			if (res.statusText === "OK")
				dispatch({ type: "order/get", payload: res.data.data });
		} catch (err) {
			console.log("Error while querying for order:", err.message);
		}
	};

	const deleteOrder = async (uid: string, oid: string) => {
		try {
			const res = await axios({
				method: "post",
				url: `http://localhost:8000/user/${uid}/orders/${oid}/delete`,
			});
			if (res.statusText === "OK") navigate(`/user/${uid}/order`);
		} catch (err) {
			console.log("Error while querying for order:", err.message);
		}
	};

	const createOrderCallback = useCallback(createOrder, []);
	const getVendorDataCallback = useCallback(getVendorData, []);
	const getUserOrderCallback = useCallback(getUserOrders, []);
	const getUserOrderByIdCallback = useCallback(getUserOrderById, []);
	const deleteOrderCallback = useCallback(deleteOrder, []);
	return (
		<OrderContext.Provider
			value={{
				order,
				createOrderCallback,
				getVendorDataCallback,
				getUserOrderCallback,
				getUserOrderByIdCallback,
				deleteOrderCallback,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
const useOrder = () => {
	const context = useContext(OrderContext);
	return context;
};

export { OrderProvider, useOrder, type cartType };
