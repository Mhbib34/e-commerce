import React from "react";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
	buttonVariants,
	dropdownVariants,
	itemVariants,
} from "@/utils/variants";
import { User } from "@/type/userType";
import {
	User as UserIcon,
	Package,
	Heart,
	ShoppingCart,
	Settings,
	CreditCard,
	MapPin,
	Bell,
	HelpCircle,
	LogOut,
	Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
	user: User;
	handleClickVerify: React.MouseEventHandler<HTMLButtonElement>;
	handleLogout: React.MouseEventHandler<HTMLButtonElement>;
};

const HeaderUserMenu = ({ user, handleClickVerify, handleLogout }: Props) => {
	const router = useRouter();
	const menuItems = [
		{
			icon: UserIcon,
			label: "My Profile",
			path: "/profile",
			description: "Manage your account",
		},
		{
			icon: Package,
			label: "My Orders",
			path: "/orders",
			description: "Track your purchases",
		},
		{
			icon: Heart,
			label: "Wishlist",
			path: "/wishlist",
			description: "Saved items",
		},
		{
			icon: ShoppingCart,
			label: "Cart",
			path: "/cart",
			description: "Items in cart",
		},
		{
			icon: CreditCard,
			label: "Payment Methods",
			path: "/payment-methods",
			description: "Manage cards & wallets",
		},
		{
			icon: MapPin,
			label: "Addresses",
			path: "/addresses",
			description: "Delivery addresses",
		},
		{
			icon: Bell,
			label: "Notifications",
			path: "/notifications",
			description: "Your updates",
		},
		{
			icon: Settings,
			label: "Settings",
			path: "/settings",
			description: "Account preferences",
		},
		{
			icon: HelpCircle,
			label: "Help & Support",
			path: "/help",
			description: "Get assistance",
		},
	];

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={dropdownVariants}
			className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-xl min-w-[280px] border border-gray-200 overflow-hidden"
			style={{ backdropFilter: "blur(10px)" }}
		>
			{/* User Info Header */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
				<motion.div
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.1 }}
					className="flex items-center space-x-3"
				>
					<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
						{user?.name?.charAt(0)?.toUpperCase() || "U"}
					</div>
					<div>
						<p className="font-medium text-gray-800">
							{user?.name || "User"}
						</p>
						<p className="text-sm text-gray-600">{user?.email}</p>
					</div>
				</motion.div>

				{/* Account Verification Alert */}
				<AnimatePresence>
					{user?.isAccountVerified === false && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{
								opacity: 1,
								height: "auto",
							}}
							exit={{ opacity: 0, height: 0 }}
							transition={{ delay: 0.2 }}
							className="mt-3"
						>
							<motion.div
								whileHover="hover"
								whileTap="tap"
								variants={buttonVariants}
							>
								<Button
									onClick={handleClickVerify}
									className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 ease-in cursor-pointer font-medium py-2 px-3 rounded-md w-full text-sm flex items-center justify-center space-x-2"
								>
									<Shield size={16} />
									<span>Verify Account</span>
								</Button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Menu Items */}
			<div className="py-2">
				{menuItems.map((item, index) => (
					<motion.div
						key={item.path}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: 0.1 * (index + 1) }}
						whileHover={{ backgroundColor: "#f8fafc" }}
						className="px-4 py-3 cursor-pointer transition-colors duration-150"
						onClick={() => router.push(item.path)}
					>
						<div className="flex items-center space-x-3">
							<item.icon size={18} className="text-gray-600" />
							<div className="flex-1">
								<p className="font-medium text-gray-800 text-sm">
									{item.label}
								</p>
								<p className="text-xs text-gray-500">
									{item.description}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Logout Button */}
			<div className="border-t border-gray-100 p-4">
				<motion.div
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.4 }}
					whileHover="hover"
					whileTap="tap"
				>
					<Button
						onClick={handleLogout}
						className="bg-black hover:scale-105 text-white transition-all duration-200 ease-in cursor-pointer font-medium py-2 px-3 rounded-md w-full text-sm flex items-center justify-center space-x-2"
					>
						<LogOut size={16} />
						<span>Logout</span>
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default HeaderUserMenu;
