import Navbar from "@/components/Navbar";
import { useMember } from "@/contexts/MemberContext";
import { useState } from "react";
import { useParams } from "react-router-dom";

function AddMember() {
	const { id } = useParams();
	const { addMemberCallback } = useMember();
	const [userEmail, setUserEmail] = useState("");
	// const [id, setID] = useState("");

	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start items-center space-y-12">
			<Navbar />
			<div className="flex flex-col border-slate-200 border-2 px-12 py-10 space-y-4">
				<h1 className="text-4xl text-center pb-2 font-bold">Add Member</h1>
				<div className="flex justify-between space-x-4">
					<div className="text-2xl">Email</div>
					<input
						type="text"
						className="text-black text-center p-1 border-2 border-slate-600"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
				</div>
				<button
					className="font-bold py-3 px-6 text-2xl flex gap-2 items-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
					onClick={() => {
						addMemberCallback(id, userEmail);
					}}
					type="submit"
				>
					Add
				</button>
			</div>
		</div>
	);
}

export default AddMember;
