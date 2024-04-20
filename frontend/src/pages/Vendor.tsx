import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useVendor } from "@/contexts/VendorContext";
import { Link, useParams } from "react-router-dom";

function Vendor() {
	const { id } = useParams();
	const { vendor, getVendorByIdCallback } = useVendor();
	useEffect(() => {
		async function getById() {
			await getVendorByIdCallback(id);
		}
		getById();
	}, [getVendorByIdCallback, id]);

	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 w-1/3">
				<h1 className="mx-auto text-2xl font-bold text-yellow-100">
					{vendor.name}
				</h1>
				<h3 className="text-center text-xl">{vendor.description}</h3>
				<Link
					to={`/vendor/${id}/update`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Update
				</Link>
				<Link
					to={`/vendor/${id}/item`}
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
				>
					Items
				</Link>
			</div>
		</div>
	);
}

export default Vendor;
