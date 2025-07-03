"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { showError, showSuccess } from "@/lib/tasterHelper";
import HeaderSearch from "../fragment/HeaderSearch";
import HeaderAuthMenu from "../fragment/HeaderAuthMenu";
import HeaderGuest from "../fragment/HeaderGuest";
import HeaderUserMenu from "../fragment/HeaderUserMenu";
import { User } from "@/type/userType";

type HeaderProps = {
	children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { isAuthenticated, user, logout } = useAuth();
	const router = useRouter();

	const handleClickVerify = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`user/send-verify-otp`);
			showSuccess(`${response.data.message} 🎉`);
			router.push("/verify-email");
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Verify email failed.";
			showError(errorMessage);
		}
	};

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		logout();
		setIsOpen(false);
		router.push("/login");
	};

	const headerVariants: Variants = {
		hidden: {
			y: -100,
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<>
			<motion.header
				initial="hidden"
				animate="visible"
				variants={headerVariants}
				className="bg-black text-white md:py-3 py-2 md:px-6 px-3 sticky rounded-xl flex justify-between items-center z-50 mx-auto md:top-3 top-5"
			>
				<div className="flex items-center gap-4 w-[50%]">
					<motion.div
						whileHover={{ rotate: 90 }}
						whileTap={{ scale: 0.9 }}
						transition={{ duration: 0.2 }}
					>
						<Menu className="text-white cursor-pointer" />
					</motion.div>
					<motion.div
						onClick={() => router.push("/")}
						className="cursor-pointer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="text-2xl font-bold font-mono">
							Velora
						</span>
					</motion.div>
					{isAuthenticated && <HeaderSearch />}
				</div>
				<div className="relative">
					{isAuthenticated ? (
						<HeaderAuthMenu isOpen={isOpen} setIsOpen={setIsOpen} />
					) : (
						<HeaderGuest />
					)}
					<AnimatePresence>
						{isOpen && (
							<HeaderUserMenu
								user={user as User}
								handleClickVerify={handleClickVerify}
								handleLogout={handleLogout}
							/>
						)}
					</AnimatePresence>
				</div>
			</motion.header>
			<motion.main
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{children}
			</motion.main>
		</>
	);
};

export default Header;
