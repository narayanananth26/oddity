import EventVenue from "@components/UI/EventVenue";
import Image from "next/image";

const TeamCard = ({ team }) => {
	return (
		team && (
			<div
				className={`bg-slate-400 rounded-lg overflow-hidden border border-slate-300 shadow-md p-2 flex flex-col gap-3`}
			>
				<div className="flex-center">
					<Image
						src={team.logo}
						alt={team.name}
						width={200}
						height={200}
						className="rounded-full bg-white p-4"
					/>
				</div>
				<h2 className="text uppercase text-3xl rounded text-white font-semibold mb-4 text-center h-28 flex-start flex-col">
					{team.name}
				</h2>
				<div className="text-white flex-start gap-3 w-full uppercase">
					<p className="text-black">Coach</p>
					<p> {team.coach}</p>
				</div>
			</div>
		)
	);
};

export default TeamCard;
