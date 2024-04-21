import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-center items-center space-y-8">
			<div className="text-7xl">FEST MANAGEMENT APP</div>
			<Link
				to="/user"
				className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-2xl text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
			>
				Get Started
				<ArrowRight />
			</Link>
		</div>
	);
}

export default Home;
