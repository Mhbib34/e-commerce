"use client";

import { FC } from "react";
import {
	LayoutDashboard,
	Package,
	Users,
	Settings,
	LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type Props = {
	onClose?: () => void;
};

const AdminSidebar: FC<Props> = ({ onClose }) => {
	const router = useRouter();
	const { logout } = useAuth();

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		router.push("/login");
	};

	return (
		<aside className="bg-black text-white w-72 flex-col p-6 space-y-4 shadow-lg fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out md:relative md:flex">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold tracking-wide">
					Admin Panel
				</h1>
				{onClose && (
					<button className="md:hidden text-white" onClick={onClose}>
						✕
					</button>
				)}
			</div>
			<nav className="flex flex-col gap-4 text-base">
				<MenuItem
					icon={<LayoutDashboard size={20} />}
					label="Dashboard"
					onClick={() => router.push("/admin/dashboard")}
				/>
				<MenuItem
					icon={<Package size={20} />}
					label="Products"
					onClick={() => router.push("/admin/product")}
				/>
				<MenuItem
					icon={<Users size={20} />}
					label="Users"
					onClick={() => router.push("/admin/users")}
				/>
				<MenuItem
					icon={<Settings size={20} />}
					label="Settings"
					onClick={() => router.push("/admin/settings")}
				/>
				<div onClick={handleLogout}>
					<MenuItem icon={<LogOut size={20} />} label="Logout" />
				</div>
			</nav>
		</aside>
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

export default AdminSidebar;
