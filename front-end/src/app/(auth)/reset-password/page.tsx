"use client";
import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ResetPasswordPage = () => {
	const [newPassword, setNewPassword] = useState("");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const router = useRouter();

	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${baseUrl}/api/user/reset-password`,
				{
					newPassword,
					email,
					otp: parseInt(otp, 10),
				}
			);
			toast.success(`${response.data.message} 🎉`);
			router.push("/login");
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
				onSubmit={handleResetPassword}
				linkPage="/login"
				title="Reset Password"
				textLink="Create a new password!"
				buttonText="Reset Password"
				image={imagesForm.p4}
			>
				<Input
					type="password"
					placeholder="New Password"
					text="New Password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Input
					type="email"
					placeholder="example@gmail.com"
					text="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="number"
					placeholder="123456"
					text="OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
			</Form>
		</div>
	);
};

export default ResetPasswordPage;
