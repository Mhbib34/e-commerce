"use client";

import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/fragment/Loading";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { isLoading } = useAuth();
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`user/register`, {
				name,
				username,
				email,
				password,
			});
			toast.success(`${response.data.message} 🎉`);
			setName("");
			setUsername("");
			setEmail("");
			setPassword("");
			router.push("/login");
		} catch (error) {
			console.error(error);
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Registration failed.";
			toast.error(errorMessage);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

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
					placeholder="full name"
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
					type={showPassword ? "text" : "password"}
					text="Password"
					placeholder="*********"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
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
