import Navbar from "@/components/Navbar";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function VendorSales() {
	const { id } = useParams();
	const { getVendorSalesCallback } = useVendor();
	useEffect(() => {
		async function getVendorSales() {
			await getVendorSalesCallback(id);
		}
		getVendorSales();
	}, [getVendorSalesCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12 pb-4">
			<Navbar />
		</div>
	);
}

export default VendorSales;
