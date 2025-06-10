"use client";

import { FC, useState } from "react";
import {
	LayoutDashboard,
	Package,
	Users,
	Settings,
	Menu,
	X,
	LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminDashboardPage: FC = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		router.push("/login");
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<aside
				className={`bg-black text-white w-72 flex-col p-6 space-y-4 shadow-lg fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex`}
			>
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold tracking-wide">
						Admin Panel
					</h1>
					{/* Close button on mobile */}
					<button
						className="md:hidden text-white"
						onClick={() => setSidebarOpen(false)}
					>
						<X size={24} />
					</button>
				</div>
				<nav className="flex flex-col gap-4 text-base">
					<MenuItem
						icon={<LayoutDashboard size={20} />}
						label="Dashboard"
					/>
					<MenuItem
						icon={<Package size={20} />}
						label="Products"
						onClick={() => router.push("/admin/product")}
					/>
					<MenuItem icon={<Users size={20} />} label="Users" />
					<MenuItem icon={<Settings size={20} />} label="Settings" />
					<div onClick={handleLogout} className="">
						<MenuItem icon={<LogOut size={20} />} label="Logout" />
					</div>
				</nav>
			</aside>

			{/* Overlay when sidebar is open (mobile) */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Main content */}
			<main className="flex-1 bg-zinc-100 md:p-6  w-full">
				{/* Topbar with menu button */}
				<div className="flex items-center justify-between mb-6 md:hidden bg-black w-full py-4 px-3">
					<button onClick={() => setSidebarOpen(true)}>
						<Menu size={28} className="text-white" />
					</button>
					<h2 className="text-lg font-semibold text-white">
						Admin Dashboard
					</h2>
				</div>

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

type MenuItemProps = {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, onClick }) => (
	<button
		onClick={onClick}
		className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors w-full cursor-pointer"
	>
		{icon}
		<span>{label}</span>
	</button>
);

export default AdminDashboardPage;
