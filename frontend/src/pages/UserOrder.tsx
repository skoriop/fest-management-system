import Navbar from "@/components/Navbar";
import { useItem } from "@/contexts/ItemContext";
import { useOrder } from "@/contexts/OrderContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserOrder() {
	const { id, orderid } = useParams();
	const { order, getUserOrderByIdCallback, deleteOrderCallback } = useOrder();
	const { item, getItemByIdCallback } = useItem();
	const [render, setRender] = useState([]);
	useEffect(() => {
		async function getUserOrderById() {
			await getUserOrderByIdCallback(id, orderid);
		}
		getUserOrderById();
	}, [getUserOrderByIdCallback, id, orderid]);

	useEffect(() => {
		async function cartRender() {
			let res = [];
			for (const cart_item of order.cart_items) {
				const ans = await axios({
					method: "get",
					url: `http://localhost:8000/items/${cart_item.item_id}`,
				});
				res = [
					...res,
					{ name: ans.data.data.name, quantity: cart_item.quantity },
				];
			}
			setRender(res);
		}
		cartRender();
	}, [getItemByIdCallback, item.name, order.cart_items]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-24 pb-4">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-16 space-y-4 w-1/3">
				<h1 className="mx-auto text-4xl font-bold text-yellow-200">
					{order.id}
				</h1>
				<h3 className="text-center text-xl">
					{new Date(order.created_at).toLocaleString()}
				</h3>
				{render.map((el) => {
					return (
						<div className="flex flex-col space-y-4 items-center">
							<div className="flex space-x-2">
								<h3 className="text-2xl font-bold text-yellow-100">
									{el.name}
								</h3>
								<h3 className="text-xl flex space-x-4">{el.quantity}</h3>
							</div>
						</div>
					);
				})}
				<button
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
					onClick={async () => {
						await deleteOrderCallback(id, orderid);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default UserOrder;
