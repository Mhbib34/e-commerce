"use client";

import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3000/api/user/login",
				{
					email,
					password,
				}
			);
			toast.success("Login successful! 🎉");
			console.log("Login success:", response.data);
		} catch (error) {
			console.error(error);
			toast.error("Login failed. Please try again.");
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
			>
				<Input
					type="email"
					text="Email"
					placeholder="example@gmail.com"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<Input
					type="password"
					text="Password"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</Form>
		</div>
	);
};

export default LoginPage;
