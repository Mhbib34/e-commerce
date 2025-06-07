"use client";
import { imagesForm } from "@/assets/assets";
import Input from "@/components/common/Input";
import Form from "@/components/fragment/Form";
import LoadingSpinner from "@/components/fragment/Loading";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
	const [newPassword, setNewPassword] = useState("");
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { isLoading } = useAuth();
	const router = useRouter();

	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`user/reset-password`, {
				newPassword,
				email,
				otp: parseInt(otp, 10),
			});
			toast.success(`${response.data.message} 🎉`);
			router.push("/login");
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors || "Login failed. Please try again.";
			toast.error(errorMessage);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}
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
					type="number"
					placeholder="123456"
					text="OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
				<Input
					type="email"
					placeholder="example@gmail.com"
					text="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type={showPassword ? "text" : "password"}
					placeholder="New Password"
					text="New Password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
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

export default ResetPasswordPage;
