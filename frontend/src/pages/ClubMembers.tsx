import Navbar from "@/components/Navbar";
import { useMember } from "@/contexts/MemberContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ClubMembers() {
	const { id } = useParams();
	const { getAllMembersCallback, removeMemberCallback } = useMember();
	const [members, setMembers] = useState([]);
	useEffect(() => {
		async function getAllMembers() {
			const data = await getAllMembersCallback(id);
			console.log(data);
			setMembers(data);
		}
		getAllMembers();
	}, [getAllMembersCallback, id]);
	return (
		<div className="bg-slate-950 text-white min-h-screen h-full flex flex-col justify-start members-center space-y-12">
			<Navbar />
			<Link
				to={`/club/${id}/members/add`}
				className="font-bold py-3 px-6 text-2xl flex gap-2 members-centertext-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
			>
				Add Member
			</Link>
			<div className="grid grid-cols-3 gap-12 px-6 py-2">
				{members.map((member) => {
					return (
						<div className="flex flex-col members-center border-slate-200 border-2 px-12 py-10 space-y-1">
							<h1 className="mx-auto text-2xl font-bold text-yellow-100 pb-2">
								ID: {member.id}
							</h1>
							<div className="flex members-center space-x-4">
								<h3 className="font-bold text-xl">Name: </h3>
								<h3 className="text-center text-xl">{member.name}</h3>
							</div>
							<div className="flex members-center space-x-4">
								<h3 className="font-bold text-xl">Email: </h3>
								<h3 className="text-center text-xl">{member.email}</h3>
							</div>
							<div className="flex members-center space-x-4">
								<h3 className="font-bold text-xl">Phone: </h3>
								<h3 className="text-center text-xl">{member.phone_number}</h3>
							</div>

							<button
								className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit mx-auto"
								onClick={() => {
									removeMemberCallback(id, member.email);
								}}
								type="submit"
							>
								Remove
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ClubMembers;
