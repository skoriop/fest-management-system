import Navbar from "@/components/Navbar";
import { useOrder } from "@/contexts/OrderContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserOrders() {
	const { id } = useParams();
	const { getUserOrderCallback } = useOrder();
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		async function getUserOrders() {
			const data = await getUserOrderCallback(id);
			setOrders(data);
		}
		getUserOrders();
	}, [getUserOrderCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<Link
				to={`/user/${id}/order/create`}
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Place Orders
			</Link>
			<div className="grid grid-cols-4 gap-12 px-6 py-2">
				{orders.map((order) => {
					return (
						<Link
							to={`/user/${id}/order/${order.id}`}
							className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 hover:scale-105"
						>
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								{order.id}
							</h1>
							<h3 className="text-center text-xl">{order.status}</h3>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default UserOrders;
