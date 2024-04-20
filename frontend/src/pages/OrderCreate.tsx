import Navbar from "@/components/Navbar";
import { cartType, useOrder } from "../contexts/OrderContext";
import { useEffect, useState } from "react";
import type { itemType } from "../contexts/ItemContext";
import { useParams } from "react-router-dom";

function OrderCreate() {
	const { id } = useParams();
	const { getVendorDataCallback, createOrderCallback } = useOrder();
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState([]);
	useEffect(() => {
		async function getVendorData() {
			const data = await getVendorDataCallback();
			setItems(data);
		}
		getVendorData();
	}, [getVendorDataCallback]);
	function handleAdd(i: itemType) {
		const res = cart.filter((el) => el.item_id === i.id);
		if (res.length === 0) {
			setCart((el) => [...el, { item_id: i.id, quantity: 1 }]);
		} else {
			const rem = cart.filter((el) => el.item_id !== i.id);
			setCart([...rem, { item_id: i.id, quantity: res[0].quantity + 1 }]);
		}
	}
	function handlePlus(id: string) {
		const has = cart.filter((el) => el.item_id === id);
		const notHas = cart.filter((el) => el.item_id !== id);
		has[0].quantity++;
		setCart([...notHas, has[0]]);
	}
	function handleMinus(id: string) {
		const has = cart.filter((el) => el.item_id === id);
		const notHas = cart.filter((el) => el.item_id !== id);
		has[0].quantity--;
		if (has[0].quantity > 0) setCart([...notHas, has[0]]);
		else {
			setCart([...notHas]);
			setItems(() => items.filter((i) => i.id !== id));
		}
	}
	async function handlePlace() {
		createOrderCallback(cart, id);
	}
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<div className="border-2 border-slate-200 min-h-[150px] px-12 py-10 min-w-[400px] text-center flex flex-col items-center space-y-2">
				<h1 className="text-3xl font-bold pb-2 text-yellow-200">Cart</h1>
				{cart.map((el) => {
					const item = items.filter((i) => i.id === el.item_id);
					return (
						<div className="flex space-x-4">
							<h3 className="text-2xl font-bold">{item[0]?.name}</h3>
							<h3 className="text-xl flex space-x-4">
								<button
									className="bg-red-400 px-2 py-1 rounded-full"
									onClick={() => {
										handleMinus(el.item_id, item[0].name);
									}}
								>
									-
								</button>
								<div className="">{el.quantity}</div>
								<button
									className="bg-green-700 px-2 py-1 rounded-full"
									onClick={() => {
										handlePlus(el.item_id, item[0].name);
									}}
								>
									+
								</button>
							</h3>
						</div>
					);
				})}
				{cart.length !== 0 ? (
					<button
						className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={handlePlace}
					>
						Place Order
					</button>
				) : (
					""
				)}
			</div>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{items.map((item: itemType, i: number) => {
					return (
						<div
							className="flex flex-col items-center border-slate-200 border-2 px-12 py-10 space-y-1
						 hover:scale-105"
							key={i}
						>
							<h1 className="mx-auto text-2xl font-bold text-yellow-100 pb-2">
								{item.name}
							</h1>
							<h3 className="text-center text-xl">{item.description}</h3>
							<h3 className="text-center text-xl">
								{item.non_veg ? (
									<span className="text-red-700">Non Veg</span>
								) : (
									<span className="text-green-500">Veg</span>
								)}
							</h3>

							<div className="flex items-center space-x-4">
								<h3 className="font-bold text-xl">Price : </h3>
								<h3 className="text-center text-xl">{item.price}</h3>
							</div>
							<div className="flex items-center space-x-4 pb-4">
								<h3 className="font-bold text-xl">Stock : </h3>
								<h3 className="text-center text-xl">{item.stock}</h3>
							</div>
							<button
								className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
								onClick={() => {
									handleAdd(item);
								}}
							>
								Add to cart
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrderCreate;
