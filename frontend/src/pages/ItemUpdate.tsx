import Navbar from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { useItem } from "@/contexts/ItemContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemUpdate() {
	const { id, itemid } = useParams();
	const { item, getItemByIdCallback, updateItemCallback, deleteItemCallback } =
		useItem();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [nonveg, setNonveg] = useState(false);
	useEffect(() => {
		getItemByIdCallback(itemid, id);
		setName(item.name);
		setDescription(item.description);
		setPrice(item.price);
		setStock(item.stock);
		setNonveg(item.non_veg);
	}, [
		getItemByIdCallback,
		id,
		item.description,
		item.name,
		item.non_veg,
		item.price,
		item.stock,
		itemid,
	]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Update Item</h1>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Name</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Price</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={price}
						onChange={(e) => setPrice(+e.target.value)}
					/>
				</div>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Stock</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={stock}
						onChange={(e) => setStock(+e.target.value)}
					/>
				</div>
				<div className="flex space-x-6 items-center">
					<div className="text-2xl">Veg/Non-Veg</div>
					<Switch
						className="data-[state=unchecked]:bg-green-500 data-[state=checked]:bg-red-500"
						checked={nonveg}
						onCheckedChange={(checked) => setNonveg(checked)}
					/>
					<p>{nonveg ? "NON-VEG" : "VEG"}</p>
				</div>
				<div className="flex justify-between space-x-4 pb-4">
					<div className="text-2xl">Description</div>
					<textarea
						className="text-black text-center p-1 border-2 border-slate-600"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="flex">
					<button
						className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							updateItemCallback(
								name,
								description,
								price,
								nonveg,
								stock,
								id,
								itemid,
							);
						}}
						type="submit"
					>
						Update
					</button>
					<button
						className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
						onClick={() => {
							deleteItemCallback(id, itemid);
						}}
						type="submit"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default ItemUpdate;
