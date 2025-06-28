"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRound, Menu, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { showError, showSuccess } from "@/lib/tasterHelper";
import Button from "../common/Button";
import { useCart } from "@/hooks/useCart";

type HeaderProps = {
	children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { isAuthenticated, user, logout } = useAuth();
	const { cart } = useCart();
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
	return (
		<>
			<header className="bg-black text-white md:py-3 py-2 md:px-6 px-3 sticky rounded-xl flex justify-between items-center z-50 mx-auto md:top-3 top-5">
				<div className="flex items-center gap-4 w-[50%]">
					<div>
						<Menu className="text-white" />
					</div>
					<div
						onClick={() => router.push("/")}
						className="cursor-pointer"
					>
						<span className="text-2xl font-bold font-mono">
							Velora
						</span>
					</div>
					{isAuthenticated && (
						<div className="bg-white rounded-full hidden md:flex px-4 py-2  items-center w-full justify-between">
							<input
								type="search"
								className=" placeholder:text-black w-full focus:outline-none text-black"
								placeholder="Search for products, brands and more..."
							/>
							<div className="cursor-pointer">
								<Search className="text-black w-6 h-6" />
							</div>
						</div>
					)}
				</div>
				<div className="relative">
					{isAuthenticated ? (
						<div className="flex gap-3 items-center">
							<div
								title="Cart"
								className=" relative w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer transition-transform hover:scale-105"
							>
								<ShoppingCart className="text-black" />
								<div
									className={`${
										!!cart?.length ? "block" : "hidden"
									} absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-xs`}
								>
									<span className=" text-white">
										{cart?.length}
									</span>
								</div>
							</div>
							<div
								onClick={() => setIsOpen(!isOpen)}
								className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer transition-transform hover:scale-105"
							>
								<UserRound className="text-black" />
							</div>
						</div>
					) : (
						<div className="flex justify-center items-center gap-2">
							<Button
								onClick={() => router.push("/login")}
								className="py-1 px-2 border-2 rounded-lg cursor-pointer font-medium"
							>
								Login
							</Button>
							<Button
								onClick={() => router.push("/register")}
								className="py-1 px-2 border-2 rounded-lg cursor-pointer font-medium bg-white text-black border-white hover:bg-black hover:text-white transition-all duration-200 ease-in"
							>
								Register
							</Button>
						</div>
					)}
					{isOpen && (
						<div className="absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-md min-w-[160px] space-y-2">
							<>
								<p className="text-sm">
									Hi, {user?.name || "User"}
								</p>
								{user?.isAccountVerified === false && (
									<Button
										onClick={handleClickVerify}
										className="bg-black text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md"
									>
										Verify Account
									</Button>
								)}
								<Button
									onClick={handleLogout}
									className="bg-black text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md"
								>
									Logout
								</Button>
							</>
						</div>
					)}
				</div>
			</header>
			<main>{children}</main>
		</>
	);
};

export default Header;
