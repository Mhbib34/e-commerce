"use client";

import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { imagesForm } from "@/assets/assets";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${baseUrl}/api/user/login`, {
				email,
				password,
			});
			toast.success(`${response.data.message} 🎉`);
			router.push("/");
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Login failed. Please try again.";
			toast.error(errorMessage);
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
					placeholder="example@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Input
					type={showPassword ? "text" : "password"}
					text="Password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
