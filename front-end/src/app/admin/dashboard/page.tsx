"use client";

import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboardPage: FC = () => {
	const { user } = useAuth();

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Main content */}
			<main className="flex-1 bg-white md:p-6  w-full">
				<h2 className="text-xl font-semibold mb-4 hidden md:block">
					Welcome {user?.name}
				</h2>

				{/* Content goes here */}
				<p className="text-zinc-700 md:px-0 px-3">
					Dashboard content...
				</p>
			</main>
		</div>
	);
};

export default AdminDashboardPage;
