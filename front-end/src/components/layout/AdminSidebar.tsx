"use client";

import { FC, useState } from "react";
import {
	LayoutDashboard,
	Package,
	Users,
	Settings,
	LogOut,
	X,
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
	Bell,
	User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { imagesForm } from "@/assets/assets";
import Image from "next/image";

// Mock hooks untuk demo

type Props = {
	onClose?: () => void;
};

const AdminSidebar: FC<Props> = ({ onClose }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { logout, user } = useAuth();
	const [collapsed, setCollapsed] = useState(false);

	const handleLogout = (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		router.push("/login");
	};

	const menuItems = [
		{
			icon: <LayoutDashboard size={20} />,
			label: "Dashboard",
			path: "/admin/dashboard",
			active: pathname === "/admin/dashboard",
		},
		{
			icon: <Package size={20} />,
			label: "Products",
			path: "/admin/product",
			active: pathname === "/admin/product",
		},
		{
			icon: <ShoppingBag size={20} />,
			label: "Orders",
			path: "/admin/orders",
			active: pathname === "/admin/orders",
		},
		{
			icon: <Users size={20} />,
			label: "Customers",
			path: "/admin/users",
			active: pathname === "/admin/users",
		},
		{
			icon: <Settings size={20} />,
			label: "Settings",
			path: "/admin/settings",
			active: pathname === "/admin/settings",
		},
	];

	return (
		<div
			className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full shadow-lg ${
				collapsed ? "w-20" : "w-72"
			}`}
		>
			{/* Header */}
			<div className="p-6 border-b border-gray-200">
				<div className="flex items-center justify-between">
					{!collapsed && (
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-white border-2 rounded-xl flex items-center justify-center">
								<Image
									src={imagesForm.eCommerceLogo}
									alt="logo"
									width={30}
								/>
							</div>
							<div>
								<h2 className="text-xl font-bold text-gray-900">
									Velora
								</h2>
								<p className="text-sm text-gray-500">
									Admin Panel
								</p>
							</div>
						</div>
					)}

					{/* Collapse/Expand Button */}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
					>
						{collapsed ? (
							<ChevronRight size={18} className="text-gray-600" />
						) : (
							<ChevronLeft size={18} className="text-gray-600" />
						)}
					</button>

					{/* Close button for mobile */}
					{onClose && (
						<button
							onClick={onClose}
							className="py-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
						>
							<X size={18} className="text-gray-600" />
						</button>
					)}
				</div>
			</div>

			{/* User Profile */}
			{!collapsed && user && (
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
							<User className="w-6 h-6 text-white" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-semibold text-gray-900 truncate">
								{user.name}
							</p>
							<p className="text-xs text-gray-500 truncate">
								{user.email}
							</p>
						</div>
						<div className="relative">
							<Bell size={16} className="text-gray-400" />
							<div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
						</div>
					</div>
				</div>
			)}

			{/* Navigation Menu */}
			<nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-none">
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						icon={item.icon}
						label={item.label}
						active={item.active}
						collapsed={collapsed}
						onClick={() => {
							router.push(item.path);
							if (onClose) onClose();
						}}
					/>
				))}
			</nav>

			{/* Logout Button */}
			<div
				className="p-4 border-t border-gray-200"
				onClick={handleLogout}
			>
				<MenuItem
					icon={<LogOut size={20} />}
					label="Logout"
					active={false}
					collapsed={collapsed}
					variant="danger"
				/>
			</div>

			{/* Footer */}
			{!collapsed && (
				<div className="p-4 border-t border-gray-200">
					<div className="text-center">
						<p className="text-xs text-gray-500">
							© 2025 Velora Admin
						</p>
						<p className="text-xs text-gray-400 mt-1">
							Version 1.0.0
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

type MenuItemProps = {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	active?: boolean;
	collapsed?: boolean;
	variant?: "default" | "danger";
};

const MenuItem: FC<MenuItemProps> = ({
	icon,
	label,
	onClick,
	active = false,
	collapsed = false,
	variant = "default",
}) => {
	const baseClasses =
		"flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative";

	const variantClasses = {
		default: active
			? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
			: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
		danger: "text-red-600 hover:bg-red-50 hover:text-red-700",
	};

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]} w-full ${
				collapsed ? "justify-center" : ""
			}`}
			title={collapsed ? label : undefined}
		>
			<div
				className={`flex-shrink-0 ${
					active && variant === "default" ? "text-white" : ""
				}`}
			>
				{icon}
			</div>

			{!collapsed && (
				<span className="font-medium text-sm truncate">{label}</span>
			)}

			{active && variant === "default" && (
				<div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
			)}

			{collapsed && (
				<div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 ">
					{label}
					<div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
				</div>
			)}
		</button>
	);
};

export default AdminSidebar;
