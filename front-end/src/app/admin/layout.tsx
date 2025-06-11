"use client";

import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Button from "@/components/common/Button";

export default function AdminLayout({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-72 bg-black z-50 transform transition-transform duration-300 ease-in-out
				${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
				md:translate-x-0 md:relative`}
			>
				<AdminSidebar onClose={() => setSidebarOpen(false)} />
			</div>

			{/* Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<main className="flex-1 bg-white overflow-y-auto md:h-auto">
				{/* Topbar for mobile */}
				<div className="flex items-center justify-between mb-6 md:hidden bg-black w-full py-4 px-3">
					<Button onClick={() => setSidebarOpen(true)}>
						<Menu size={28} className="text-white" />
					</Button>
					<h2 className="text-lg font-semibold text-white">
						Admin Panel
					</h2>
				</div>
				{children}
			</main>
		</div>
	);
}
