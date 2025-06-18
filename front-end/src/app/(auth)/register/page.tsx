"use client";

import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { showError, showSuccess } from "@/lib/tasterHelper";

const RegisterPage = () => {
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		password: "",
		username: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleNewUserChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setNewUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`user/register`, {
				name: newUser.name,
				username: newUser.username,
				email: newUser.email,
				password: newUser.password,
			});
			showSuccess(`${response.data.message} 🎉`);
			setNewUser({
				name: "",
				email: "",
				password: "",
				username: "",
			});
			router.push("/login");
		} catch (error) {
			console.error(error);
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Registration failed.";
			showError(errorMessage);
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
				image={imagesForm.p2}
			>
				<Input
					type="text"
					text="Full Name"
					name="name"
					placeholder="full name"
					onChange={handleNewUserChange}
					value={newUser.name}
				/>
				<Input
					type="text"
					text="Username"
					name="username"
					placeholder="username"
					onChange={handleNewUserChange}
					value={newUser.username}
				/>
				<Input
					type="email"
					text="Email"
					name="email"
					placeholder="example@gmail.com"
					onChange={handleNewUserChange}
					value={newUser.email}
				/>
				<Input
					type={showPassword ? "text" : "password"}
					text="Password"
					name="password"
					placeholder="*********"
					onChange={handleNewUserChange}
					value={newUser.password}
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

export default RegisterPage;
