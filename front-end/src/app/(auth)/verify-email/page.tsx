"use client";

import { useRef, useState } from "react";
import { imagesForm } from "@/assets/assets";
import Form from "@/components/fragment/Form";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import LoadingSpinner from "@/components/fragment/Loading";
import { useAuth } from "@/hooks/useAuth";
import { showError, showSuccess } from "@/lib/tasterHelper";

const OTP_LENGTH = 6;

const EmailVerifyPage = () => {
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const router = useRouter();
	const { isLoading, refetchUser } = useAuth();

	const handleInput = (
		e: React.FormEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.currentTarget.value;
		if (!/^\d?$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace") {
			if (otp[index] === "") {
				if (index > 0) {
					inputRefs.current[index - 1]?.focus();
				}
			}
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("Text").trim();
		if (!/^\d+$/.test(pasteData)) return;

		const digits = pasteData.slice(0, OTP_LENGTH).split("");
		setOtp((prevOtp) => {
			const updatedOtp = [...prevOtp];
			digits.forEach((digit, i) => {
				updatedOtp[i] = digit;
			});
			return updatedOtp;
		});

		// Fokus ke input setelah digit terakhir
		const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
		inputRefs.current[nextIndex]?.focus();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post(`user/verify-email`, {
				otp: parseInt(otp.join(""), 10),
			});
			await refetchUser();
			showSuccess(`${response.data.message} 🎉`);
			router.push("/");
		} catch (error) {
			const err = error as AxiosError<{ errors: string }>;
			const errorMessage =
				err.response?.data?.errors ||
				"Verify email failed. Please try again.";
			showError(errorMessage);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex justify-center items-center h-screen bg-black px-5 sm:px-0">
			<Form
				onSubmit={handleSubmit}
				linkPage="/login"
				title="OTP"
				textLink="Enter the OTP sent to your email"
				buttonText="Verify"
				image={imagesForm.p5}
			>
				<div className="flex gap-2 justify-center">
					{Array.from({ length: OTP_LENGTH }).map((_, index) => (
						<input
							key={index}
							type="text"
							maxLength={1}
							required
							className="w-12 h-12 bg-white border-2 border-black text-black text-center text-xl rounded-md focus:outline-none focus:ring"
							ref={(el) => {
								inputRefs.current[index] = el;
							}}
							value={otp[index]}
							onInput={(e) => handleInput(e, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							onPaste={index === 0 ? handlePaste : undefined} // ⬅️ hanya input pertama
						/>
					))}
				</div>
			</Form>
		</div>
	);
};

export default EmailVerifyPage;
