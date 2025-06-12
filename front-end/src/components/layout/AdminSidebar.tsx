"use client";

import { FC } from "react";
import {
	LayoutDashboard,
	Package,
	Users,
	Settings,
	LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";

type Props = {
	onClose?: () => void;
};

const AdminSidebar: FC<Props> = ({ onClose }) => {
	const router = useRouter();
	const pathname = usePathname();
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
					<Button className="md:hidden text-white" onClick={onClose}>
						✕
					</Button>
				)}
			</div>
			<nav className="flex flex-col gap-4 text-base">
				<MenuItem
					icon={<LayoutDashboard size={20} />}
					label="Dashboard"
					active={pathname === "/admin/dashboard"}
					onClick={() => router.push("/admin/dashboard")}
				/>
				<MenuItem
					icon={<Package size={20} />}
					label="Products"
					active={pathname === "/admin/product"}
					onClick={() => router.push("/admin/product")}
				/>
				<MenuItem
					icon={<Users size={20} />}
					label="Users"
					active={pathname === "/admin/users"}
					onClick={() => router.push("/admin/users")}
				/>
				<MenuItem
					icon={<Settings size={20} />}
					label="Settings"
					active={pathname === "/admin/settings"}
					onClick={() => router.push("/admin/settings")}
				/>
				<div onClick={handleLogout}>
					<MenuItem
						icon={<LogOut size={20} />}
						label="Logout"
						active={false}
					/>
				</div>
			</nav>
		</aside>
	);
};

type MenuItemProps = {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	active?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, onClick, active }) => (
	<Button
		onClick={onClick}
		className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full cursor-pointer
		${active ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
	>
		{icon}
		<span>{label}</span>
	</Button>
);

export default AdminSidebar;
