"use client";

import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { imagesForm } from "@/assets/assets";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";
import { showError, showSuccess } from "@/lib/tasterHelper";
import { useCart } from "@/context/CartContext";

const LoginPage = () => {
	const [user, setUser] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const { refetchUser } = useAuth();
	const { fetchCartItems } = useCart();
	const router = useRouter();

	const handleLoginUserChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`/user/login`, {
				email: user.email,
				password: user.password,
			});

			const loggedInUser = response.data.user;
			console.log(loggedInUser);

			await refetchUser();

			showSuccess(`${response.data.message}`);

			if (loggedInUser.role === "ADMIN") {
				router.push("/admin/dashboard");
			} else {
				router.push("/");
				fetchCartItems();
			}
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Login failed. Please try again.";
			showError(errorMessage);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-black px-5 sm:px-0">
			<Form
				onSubmit={handleLogin}
				textPage="Sign Up"
				linkPage="/register"
				forgotPassword="Forgot Password?"
				title="Welcome Back"
				textLink="Don't have an account?"
				buttonText="Login"
				image={imagesForm.p1}
			>
				<Input
					type="email"
					text="Email"
					name="email"
					placeholder="example@gmail.com"
					value={user.email}
					onChange={handleLoginUserChange}
				/>

				<Input
					type={showPassword ? "text" : "password"}
					text="Password"
					name="password"
					placeholder="password"
					value={user.password}
					onChange={handleLoginUserChange}
				/>

				<div className="flex items-center gap-2 text-black text-sm">
					<input
						id="showPassword"
						type="checkbox"
						checked={showPassword}
						onChange={() => setShowPassword(!showPassword)}
						className="accent-black w-4 h-4 rounded cursor-pointer"
					/>
					<label htmlFor="showPassword" className="cursor-pointer">
						Show Password
					</label>
				</div>
			</Form>
		</div>
	);
};

export default LoginPage;
