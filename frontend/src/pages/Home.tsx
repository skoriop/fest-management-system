import { ArrowRight } from "lucide-react";

function Home() {
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-center items-center space-y-8">
			<div className="text-7xl">FEST MANAGEMENT APP</div>
			<a
				href={"/student"}
				className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				Student portal
				<ArrowRight />
			</a>
			<a
				href={"/vendor"}
				className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				Vendor portal
				<ArrowRight />
			</a>
			<a
				href={"/club"}
				className="font-bold py-3 px-6 flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				Club portal
				<ArrowRight />
			</a>
		</div>
	);
}

export default Home;
