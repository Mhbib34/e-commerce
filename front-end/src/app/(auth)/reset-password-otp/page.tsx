"use client";

import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordOtpPage = () => {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(
				`user/send-reset-password-otp`,
				{
					email,
				}
			);
			toast.success(`${response.data.message} 🎉`);
			router.push("/reset-password");
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
				onSubmit={handleSubmit}
				linkPage="/login"
				title="Reset Your Password"
				textLink="OTP will be sent to your email!"
				buttonText="Send OTP"
				image={imagesForm.p3}
			>
				<Input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="example@gmail.com"
					text="Email"
					value={email}
				/>
			</Form>
		</div>
	);
};

export default ResetPasswordOtpPage;
