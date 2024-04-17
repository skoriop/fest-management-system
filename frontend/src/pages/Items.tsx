import Navbar from "@/components/Navbar";
import { useItem } from "@/contexts/ItemContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Items() {
	const { id } = useParams();
	const { getAllItemsCallback } = useItem();
	const [items, setItems] = useState([]);
	useEffect(() => {
		async function getAllItems() {
			const data = await getAllItemsCallback(id);
			console.log(data);
			setItems(data);
		}
		getAllItems();
	}, [getAllItemsCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<Link
				to={`/vendor/${id}/item/create`}
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Create Item
			</Link>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{items.map((item) => {
					return (
						<Link
							to={`/vendor/${id}/item/${item.id}`}
							className="flex flex-col items-center border-slate-200 border-2 px-12 py-10 space-y-1
						 hover:scale-105"
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
							<div className="flex items-center space-x-4">
								<h3 className="font-bold text-xl">Stock : </h3>
								<h3 className="text-center text-xl">{item.stock}</h3>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Items;
