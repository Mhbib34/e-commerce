"use client";

import { imagesForm } from "@/assets/assets";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	return (
		<div className="flex items-center justify-center mt-4">
			{isAuthenticated ? (
				<div className="bg-amber-300 w-full rounded-xl">
					<Image
						src={imagesForm.imageMain}
						alt="Login"
						className="w-full rounded-xl"
					/>
				</div>
			) : (
				<div className="text-center">
					<Image
						src={imagesForm.login}
						alt="Login"
						width={400}
						height={400}
					/>
					<div className="flex flex-col items-center">
						<p className="text-xl font-medium">
							You are not logged in
						</p>
						<p className="">
							Please log in to access our services.
						</p>
						<Button
							onClick={() => router.push("/login")}
							className="bg-black text-white font-bold py-2 px-4 rounded-md mt-5"
						>
							Login
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
