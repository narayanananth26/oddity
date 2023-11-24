"use client";
import { useSession } from "next-auth/react";
import AdminEventsList from "./AdminEventsList";

const AdminContent = () => {
	const { data: session, status: sessionStatus } = useSession();
	// console.log(session);
	if (session?.user.role !== "admin")
		return (
			<div className="flex-center relative w-full-h-full">
				Not authorized
			</div>
		);
	return (
		<>
			<div className="flex-center relative mt-32 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Admin
				</span>
			</div>
			<AdminEventsList />
		</>
	);
};

export default AdminContent;
