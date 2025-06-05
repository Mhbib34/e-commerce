"use client";

import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${baseUrl}/api/user/register`, {
				name,
				username,
				email,
				password,
			});
			toast.success("Registration successful! 🎉");
			console.log("Register success:", response.data);

			setName("");
			setUsername("");
			setEmail("");
			setPassword("");
		} catch (error) {
			console.error(error);
			toast.error("Registration failed. Please try again.");
		}
	};
	return (
		<div className="flex justify-center items-center h-screen bg-black px-5 sm:px-0">
			<Form
				onSubmit={handleRegister}
				textPage="Sign In"
				linkPage="/login"
				title="Register"
				textLink="Already have an account?"
				buttonText="Register"
			>
				<Input
					type="text"
					text="Full Name"
					placeholder="your name"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<Input
					type="text"
					text="Username"
					placeholder="username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
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

export default RegisterPage;
