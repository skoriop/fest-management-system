import { ArrowRight } from "lucide-react";

function StudentPortal() {
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-center items-center space-y-8">
			<div className="text-7xl">I LOVE BEING A STUDENT WOW</div>
			<a
				href={"/student/register"}
				className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				View Events
				<ArrowRight />
			</a>
			<a
				href={"/student/order"}
				className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				Order from shops
				<ArrowRight />
			</a>
		</div>
	);
}

export default StudentPortal;
