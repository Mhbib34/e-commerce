import React from "react";
import Button from "../common/Button";
import { imagesForm } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IsNotLoginMain = () => {
	const router = useRouter();
	return (
		<div className="text-center">
			<Image
				src={imagesForm.login}
				alt="Login"
				width={400}
				height={400}
			/>
			<div className="flex flex-col items-center">
				<p className="text-xl font-medium">You are not logged in</p>
				<p className="">Please log in to access our services.</p>
				<Button
					onClick={() => router.push("/login")}
					className="bg-black text-white font-bold py-2 px-4 rounded-md mt-5"
				>
					Login
				</Button>
			</div>
		</div>
	);
};

export default IsNotLoginMain;
