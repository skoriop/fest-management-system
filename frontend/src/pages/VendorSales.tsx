import Navbar from "@/components/Navbar";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VendorSales() {
	const { id } = useParams();
	const { getVendorSalesCallback } = useVendor();
	const [sales, setSales] = useState([]);
	useEffect(() => {
		async function getVendorSales() {
			const res = await getVendorSalesCallback(id);
			setSales(res);
		}
		getVendorSales();
	}, [getVendorSalesCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
			<h1 className="text-yellow-200 text-4xl font-bold">Sales</h1>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{sales.map((sale) => {
					return (
						<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4 items-center">
							<h1 className="mx-auto text-2xl font-bold text-yellow-100">
								{sale.item_name}
							</h1>
							<h3 className="flex text-center text-xl space-x-2">
								<div>Quantity:</div>
								<div>{sale.quantity}</div>
							</h3>
							<h3 className="flex text-center text-xl space-x-2">
								<div>Price:</div>
								<div>{sale.item_price}</div>
							</h3>
							<h3 className="flex text-center text-xl space-x-2">
								<div>Revenue:</div>
								<div>{sale.revenue}</div>
							</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VendorSales;
