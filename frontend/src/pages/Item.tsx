import Navbar from "@/components/Navbar";
import { useItem } from "@/contexts/ItemContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Item() {
	const { id, itemid } = useParams();
	const { item, getItemByIdCallback } = useItem();
	useEffect(() => {
		getItemByIdCallback(itemid);
	}, [getItemByIdCallback, itemid]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 w-2/5">
				<h1 className="mx-auto text-3xl font-bold text-yellow-100 pb-2">
					{item.name}
				</h1>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Description: </p>
					<p className="text-start">{item.description}</p>
				</h3>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Price: </p>
					<p>{item.price}</p>
				</h3>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Type: </p>
					{item.non_veg ? (
						<p className="text-red-500">Non Veg </p>
					) : (
						<p className="text-green-500">Veg</p>
					)}
				</h3>
				<h3 className="flex space-x-4 text-center text-xl mx-16">
					<p className="font-bold">Stock: </p>
					<p>{item.stock}</p>
				</h3>
				<Link
					to={`/vendor/${id}/item/${itemid}/update`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Update
				</Link>
			</div>
		</div>
	);
}

export default Item;
