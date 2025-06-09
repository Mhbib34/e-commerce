"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
			toast.success(`${response.data.message} 🎉`);
			router.push("/verify-email");
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage = err.response?.data?.errors;
			toast.error(errorMessage);
		}
	};
	return (
		<>
			<header className="bg-black text-white p-4 sticky top-0 flex justify-between items-center z-50">
				<div onClick={() => router.push("/")}>
					<span className="text-2xl font-bold font-mono">Velora</span>
				</div>
				<div className="relative">
					<div
						onClick={() => setIsOpen(!isOpen)}
						className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer transition-transform hover:scale-105"
					>
						<UserRound className="text-black" />
					</div>
					{isOpen && (
						<div className="absolute top-12 right-0 bg-white text-black p-4 rounded-md shadow-md min-w-[160px] space-y-2">
							{isAuthenticated ? (
								<>
									<p className="text-sm">
										Hi, {user?.name || "User"}
									</p>
									{user?.isAccountVerified === false && (
										<button
											onClick={handleClickVerify}
											className="text-red-600 hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer font-medium bg-gray-200 py-1 px-2 rounded-md"
										>
											Verify Account
										</button>
									)}
									<button
										onClick={logout}
										className="text-blue-600 hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer font-medium bg-gray-200 py-1 px-2 rounded-md"
									>
										Logout
									</button>
								</>
							) : (
								<div className="flex gap-2 flex-col items-start">
									<button
										onClick={() => router.push("/login")}
										className="text-blue-600 hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md bg-gray-200"
									>
										Login
									</button>
									<button
										onClick={() => router.push("/register")}
										className="text-blue-600 hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer font-medium py-1 px-2 rounded-md bg-gray-200"
									>
										Register
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</header>
			<main>{children}</main>
		</>
	);
};

export default Header;
